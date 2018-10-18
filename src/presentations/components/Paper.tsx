import * as classNames from 'classnames';
import * as React from 'react';

import {
  addAfterItem,
  destroyItem,
  focusDownerItem,
  focusItem,
  focusUpperItem,
  IAction,
  IDispatch,
  indentItem,
  unindentItem,
  updateItem,
} from 'actionCreators/actionCreators';
import { Pencil } from 'presentations/components/Pencil';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';
import { traverse } from 'utils/traverse';

// tslint:disable-next-line:function-name no-any
function Item(props: { item: IItem }): JSX.Element | null {
  const item: IItem = props.item;

  const className: string = traverse.hasIndent(item) ? `Item Item__Indent${item.indent}` : 'Item';
  if (item.style === 'TEXT') {
    return (
      <div className={className}>
        <Pencil item={item} />
      </div>
    );
  }

  return null;
}

export class Paper extends Container<IContainerProps, IState> {
  public render(): JSX.Element {
    const paper: IPaper = this.state.binders[0].papers[0];

    return (
      <div className="Paper">
        {paper.items.map(
          (item: IItem): JSX.Element => {
            return <Item key={item.id} item={item} />;
          },
        )}
      </div>
    );
  }
}
