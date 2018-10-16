import * as classNames from 'classnames';
import * as React from 'react';

import {
  addBeforeItem,
  addItem,
  cancelItem,
  destroyItem,
  focusDownerItem,
  focusItem,
  focusUpperItem,
  IAction,
  IDispatch,
  indentItem,
  unindentItem,
  updateItem,
} from 'action-creators/actionCreators';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';
import { traverse } from 'utils/traverse';

interface IProps {
  ui: IUI;
  paper: IPaper;
}

// tslint:disable-next-line:no-empty-interface
interface ILocalState {}

// tslint:disable-next-line:function-name no-any
function Item(props: { ui: IUI; item: IItem; dispatch: IDispatch }): JSX.Element | null {
  const item: IItem = props.item;

  let children: JSX.Element[] = [];
  if (traverse.hasChildren(item)) {
    children = item.children.map((childItem: IItem) => {
      return <Item key={childItem.id} ui={props.ui} dispatch={props.dispatch} item={childItem} />;
    });
  }

  if (item.style === 'TEXT') {
    return (
      <div
        className={classNames('Item', { Item__Focused: props.ui.focusedId === item.id })}
        onClick={(event: React.MouseEvent<HTMLElement>): void => {
          event.stopPropagation();
          focusItem(props.dispatch, { id: item.id, text: item.text });
        }}
      >
        {item.text}
        {children}
        {!item.text ? <span className="Item--Placeholder">/ command</span> : null}
      </div>
    );
  }

  return null;
}

export class Paper extends Container<IProps & IContainerProps, ILocalState> {
  public render(): JSX.Element {
    const ui: IUI = this.props.ui;
    const paper: IPaper = this.props.paper;

    return (
      <div className="Paper">
        {paper.items.map(
          (item: IItem): JSX.Element => {
            return <Item key={item.id} item={item} ui={ui} dispatch={this.dispatch} />;
          },
        )}
      </div>
    );
  }
}
