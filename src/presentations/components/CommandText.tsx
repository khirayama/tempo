import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { logger } from 'logger';
import { EditableText } from 'presentations/components/EditableText';
import {
  IBulletedItem,
  IHeaderItem,
  IItem,
  INumberedItem,
  IQuateItem,
  ITaskItem,
  ITextItem,
  IToggleItem,
} from 'state/state';

// TODO: focusedIdがnullになるときを考える
// TODO: select状態のUIを追加
// TODO: turnIntoするためのUIを追加
// TODO: caretが0の位置の場合、cancel相当
  // TODO: cancelに「兄にtextがあるitemがcancelされると前のItemとtextが結合」を追加

type ITextableItem =
  | ITextItem
  | IBulletedItem
  | INumberedItem
  | ITaskItem
  | ITaskItem
  | IToggleItem
  | IHeaderItem
  | IQuateItem;

interface IProps {
  item: ITextableItem;
  focus?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>, props: IProps): void;
  onChange?(event: React.FormEvent<HTMLInputElement>, props: IProps): void;
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onAddBefore?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onSplit?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onSubmit?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onIndent?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onUnindent?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onUp?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onDown?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onDestroy?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onCancel?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onSelect?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onQuickfind?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
}

const keyCodes: { [key: string]: number } = {
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40,
  P: 80,
};

export class CommandText extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public componentDidMount(): void {
    if (this.props.focus) {
      this.focus();
    }
  }

  public componentDidUpdate(): void {
    if (this.props.focus) {
      this.focus();
    }
  }

  public render(): JSX.Element {
    const item: ITextableItem = this.props.item;

    return (
      <div key={item.id} className="CommandText" onClick={this.onClick}>
        <EditableText value={item.text} onChange={this.onChange} onKeyDown={this.onKeyDown} />
        {this.props.focus && !item.text ? <div className="CommandText--Placeholder">Type '/' for commands</div> : null}
      </div>
    );
  }

  private focus(): void {
    setTimeout(() => {
      const el: HTMLInputElement = ReactDOM.findDOMNode(this) as HTMLInputElement;
      const targetElement: HTMLInputElement = el.querySelector('.EditableText') as HTMLInputElement;

      // TODO: Tab移動時にblur - focusしていて、選択位置がずれるので直す
      targetElement.focus();
      // const range: Range = document.createRange();
      // range.setStart(targetElement.firstChild as Node, targetElement.innerText.length);
      // range.setEnd(targetElement.firstChild as Node, targetElement.innerText.length);
      // const selection: Selection = window.getSelection();
      // selection.removeAllRanges();
      // selection.addRange(range);
    }, 0);
  }

  private onClick(event: React.MouseEvent<HTMLElement>): void {
    if (this.props.onClick) {
      this.props.onClick(event, this.props);
    }
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    if (this.props.onChange) {
      this.props.onChange(event, this.props);
    }
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    const value: string = event.currentTarget.value;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    // FYI: selectionの位置はkeyUpが正しい
    const selection: Selection = window.getSelection();
    const selectionStart: number = selection.baseOffset;
    const selectionEnd: number = selection.focusOffset;
    // TODO: "- " -> Bulleted
    // TODO: "1. " -> Numbered
    // TODO: "[ ] " -> Task
    logger.info(keyCode, meta, shift, value);
    this.handleKey(value, keyCode, meta, shift, selectionStart, selectionEnd, event);
  }

  // tslint:disable-next-line:cyclomatic-complexity max-func-body-length
  private handleKey(
    value: string,
    keyCode: number,
    meta: boolean,
    shift: boolean,
    selectionStart: number,
    selectionEnd: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void {
    switch (true) {
      case keyCode === keyCodes.ENTER && !meta && !shift && selectionStart === 0 && selectionEnd === 0: {
        event.preventDefault();
        logger.info('onCancel');
        if (this.props.onCancel) {
          this.props.onCancel(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.ENTER && !meta && !shift && value && selectionStart === 0 && selectionEnd === 0: {
        event.preventDefault();
        logger.info('onAddBefore');
        if (this.props.onAddBefore) {
          this.props.onAddBefore(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.ENTER &&
        !meta &&
        !shift &&
        value &&
        selectionStart !== 0 &&
        selectionStart === selectionEnd &&
        selectionStart < value.length: {
        event.preventDefault();
        logger.info('onSplit');
        if (this.props.onSplit) {
          this.props.onSplit(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.ENTER && !meta && !shift: {
        event.preventDefault();
        logger.info('onSubmit');
        if (this.props.onSubmit) {
          this.props.onSubmit(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.TAB && !meta && !shift: {
        event.preventDefault();
        logger.info('onIndent');
        if (this.props.onIndent) {
          this.props.onIndent(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.TAB && !meta && shift: {
        event.preventDefault();
        logger.info('onUnindent');
        if (this.props.onUnindent) {
          this.props.onUnindent(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.DELETE && meta && !shift: {
        event.preventDefault();
        logger.info('onDestroy');
        if (this.props.onDestroy) {
          this.props.onDestroy(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.UP && !meta && !shift: {
        event.preventDefault();
        logger.info('onUp');
        if (this.props.onUp) {
          this.props.onUp(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.DOWN && !meta && !shift: {
        event.preventDefault();
        logger.info('onDown');
        if (this.props.onDown) {
          this.props.onDown(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.DELETE && !meta && !shift && !value: {
        event.preventDefault();
        logger.info('onCancel');
        if (this.props.onCancel) {
          this.props.onCancel(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.ESCAPE && !meta && !shift: {
        event.preventDefault();
        logger.info('onSelect');
        if (this.props.onSelect) {
          this.props.onSelect(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.P && meta && !shift: {
        event.preventDefault();
        logger.info('onQuickfind');
        if (this.props.onQuickfind) {
          this.props.onQuickfind(event, this.props);
        }
        break;
      }
      default:
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(event, this.props);
    }
  }
}
