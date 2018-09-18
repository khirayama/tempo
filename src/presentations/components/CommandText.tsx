import * as React from 'react';

import { logger } from 'logger';
import { EditableText } from 'presentations/components/EditableText';
import { ITextableItem } from 'state/state';

interface IProps {
  item: ITextableItem;
  onChange?(event: React.FormEvent<HTMLInputElement>, props: IProps): void;
}

export class CommandText extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  public render(): JSX.Element {
    const item: ITextableItem = this.props.item;

    return <EditableText value={item.text} onChange={this.onChange} onKeyUp={this.onKeyUp} />;
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    if (this.props.onChange) {
      this.props.onChange(event, this.props);
    }
  }

  private onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    const key: string = event.key;
    const value: string = event.currentTarget.value;
    // Key
    // Enter -> Submit
    // Tab -> to Child
    // Shift + Tab -> to Parent

    // Value
    // "- " -> Bulleted
    // "1. " -> Numbered
    // "[ ] " -> Task
    logger.info(key, value);
  }
}
