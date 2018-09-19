import * as React from 'react';

import { CommandText } from 'presentations/components/CommandText';
import { ITextItem } from 'state/state';

interface IProps {
  focus: boolean;
  key: string;
  item: ITextItem;
  children: JSX.Element[];
  // tslint:disable-next-line:no-any
  onChange(event: React.FormEvent<HTMLInputElement>, props: any): void;
}

export class TextItem extends React.Component<IProps> {
  public render(): JSX.Element {
    const item: ITextItem = this.props.item;

    return (
      <div className="Item TextItem" key={item.id}>
        <CommandText item={item} onChange={this.props.onChange} focus={this.props.focus} />
        {this.props.children}
      </div>
    );
  }
}
