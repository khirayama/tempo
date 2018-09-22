import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { logger } from 'logger';
import { EditableText } from 'presentations/components/EditableText';
import { ITextableItem } from 'state/state';

interface IProps {
  item: ITextableItem;
  focus?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>, props: IProps): void;
  onChange?(event: React.FormEvent<HTMLInputElement>, props: IProps): void;
  onSubmit?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onShift?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onUnshift?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onDelete?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onCancel?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onSelect?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
  onQuickfind?(event: React.KeyboardEvent<HTMLInputElement>, props: IProps): void;
}

const keyCodes: { [key: string]: number } = {
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  P: 80,
};

export class CommandText extends React.Component<IProps> {
  private ref: React.RefObject<EditableText>;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();

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
      <div className="CommandText" onClick={this.onClick}>
        <EditableText ref={this.ref} value={item.text} onChange={this.onChange} onKeyDown={this.onKeyDown} />
        {!item.text ? <div className="CommandText--Placeholder">Type '/' for commands</div> : null}
      </div>
    );
  }

  private focus(): void {
    setTimeout(() => {
      const el: HTMLInputElement = ReactDOM.findDOMNode(this) as HTMLInputElement;
      (el.querySelector('.EditableText') as HTMLInputElement).focus();
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
    const value: string = event.currentTarget.value || event.currentTarget.innerHTML;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    // Value
    // "- " -> Bulleted
    // "1. " -> Numbered
    // "[ ] " -> Task
    logger.info(keyCode, meta, shift, value);
    this.handleKey(value, keyCode, meta, shift, event);
  }

  // tslint:disable:cyclomatic-complexity
  private handleKey(
    value: string,
    keyCode: number,
    meta: boolean,
    shift: boolean,
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void {
    switch (true) {
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
        logger.info('onShift');
        if (this.props.onShift) {
          this.props.onShift(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.TAB && !meta && shift: {
        event.preventDefault();
        logger.info('onUnshift');
        if (this.props.onUnshift) {
          this.props.onUnshift(event, this.props);
        }
        break;
      }
      case keyCode === keyCodes.DELETE && meta && !shift: {
        event.preventDefault();
        logger.info('onDelete');
        if (this.props.onDelete) {
          this.props.onDelete(event, this.props);
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
  }
}
