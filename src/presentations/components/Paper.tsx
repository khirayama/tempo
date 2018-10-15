import * as React from 'react';

import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';

import { traverse } from 'utils/traverse';

interface IProps {
  paper: IPaper;
}

// tslint:disable-next-line:function-name
function Item(props: { item: IItem }): JSX.Element | null {
  const item: IItem = props.item;

  let children: JSX.Element[] = [];
  if (traverse.hasChildren(item)) {
    children = item.children.map((childItem: IItem) => {
      return <Item key={childItem.id} item={childItem} />;
    });
  }

  if (item.style === 'TEXT') {
    return (
      <div className="Item">
        {item.text}
        {children}
      </div>
    );
  }

  return null;
}

export class Paper extends React.Component<IProps> {
  public render(): JSX.Element {
    const paper: IPaper = this.props.paper;

    return (
      <div className="Paper">
        {paper.items.map((item: IItem): JSX.Element => {
          return (
            <Item key={item.id} item={item} />
          );
        })}
      </div>
    );
  }
}
