import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { logger } from 'logger';
import { EditableText } from 'presentations/components/EditableText';
import { ITextableItem } from 'state/state';

interface IProps {
  item: ITextableItem;
  focus?: boolean;
  onChange?(event: React.FormEvent<HTMLInputElement>, props: IProps): void;
}

const keyCodes: { [key: string]: number } = {
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
};

export class CommandText extends React.Component<IProps> {
  private ref: React.RefObject<EditableText>;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public componentDidMount(): void {
    if (this.props.focus) {
      setTimeout(() => {
        const el: HTMLInputElement = ReactDOM.findDOMNode(this) as HTMLInputElement;
        el.focus();
      }, 0);
    }
  }

  public componentDidUpdate(): void {
    if (this.props.focus) {
      setTimeout(() => {
        const el: HTMLInputElement = ReactDOM.findDOMNode(this) as HTMLInputElement;
        el.focus();
      }, 0);
    }
  }

  public render(): JSX.Element {
    const item: ITextableItem = this.props.item;

    return <EditableText ref={this.ref} value={item.text} onChange={this.onChange} onKeyDown={this.onKeyDown} />;
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    if (this.props.onChange) {
      this.props.onChange(event, this.props);
    }
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    const value: string = event.currentTarget.value;
    // Value
    // "- " -> Bulleted
    // "1. " -> Numbered
    // "[ ] " -> Task
    logger.info(keyCode, meta, shift, value);
    this.handleKey(keyCode, meta, shift);
  }

  private handleKey(keyCode: number, meta: boolean, shift: boolean): void {
    switch (true) {
      case keyCode === keyCodes.ENTER && !meta && !shift: {
        logger.info('onSubmit');
        break;
      }
      case keyCode === keyCodes.TAB && !meta && !shift: {
        logger.info('onChildren');
        break;
      }
      case keyCode === keyCodes.TAB && !meta && shift: {
        logger.info('onParent');
        break;
      }
      case keyCode === keyCodes.DELETE && meta && !shift: {
        logger.info('onDelete');
        break;
      }
      default:
    }
  }
}
