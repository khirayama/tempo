// tslint:disable:no-any react-this-binding-issue
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
  indentItem,
  unindentItem,
  updateItem,
} from 'action-creators/actionCreators';
import { CommandText } from 'presentations/components/CommandText';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { IItem, IPage, IState, ITextItem, IUI } from 'state/state';

export class HomeMobilePage extends Container<{}, IState> {
  constructor(props: IContainerProps) {
    super(props);

    this.state = { ...this.getState() };

    this.onChange = this.onChange.bind(this);
  }

  public renderCommandText(item: any): JSX.Element {
    const ui: IUI = this.state.ui;

    return (
      <CommandText
        key={item.id}
        item={item}
        focus={ui.focusedId === item.id}
        onClick={(): void => {
          focusItem(this.dispatch, { id: item.id });
        }}
        onChange={this.onChange}
        onAddBefore={(): void => {
          addBeforeItem(this.dispatch, { prevId: item.id });
        }}
        onSubmit={(): void => {
          addItem(this.dispatch, { prevId: item.id });
        }}
        onSplit={(event: React.KeyboardEvent<HTMLInputElement>, props: any): void => {
          const selection: Selection = window.getSelection();
          const selectionStart: number = selection.baseOffset;
          const value: string = props.item.text;
          const currentItemText: string = value.slice(0, selectionStart);
          const newItemText: string = value.slice(selectionStart);

          updateItem(this.dispatch, { id: props.item.id, text: currentItemText });
          addItem(this.dispatch, { prevId: props.item.id, text: newItemText });
        }}
        onIndent={(): void => {
          indentItem(this.dispatch, { id: item.id });
        }}
        onUnindent={(): void => {
          unindentItem(this.dispatch, { id: item.id });
        }}
        onUp={(): void => {
          focusUpperItem(this.dispatch, { id: item.id });
        }}
        onDown={(): void => {
          focusDownerItem(this.dispatch, { id: item.id });
        }}
        onDestroy={(): void => {
          destroyItem(this.dispatch, { id: item.id });
        }}
        onCancel={(): void => {
          cancelItem(this.dispatch, { id: item.id });
        }}
        onSelect={(): void => {
          // Nothing
        }}
        onQuickfind={(): void => {
          // Nothing
        }}
      />
    );
  }

  // tslint:disable-next-line:max-func-body-length
  public renderItem(item: IItem): JSX.Element {
    const ui: IUI = this.state.ui;
    let children: JSX.Element[] = [];

    const commandTextElement: JSX.Element = this.renderCommandText(item);

    switch (item.style) {
      case 'TEXT': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div
            key={item.id}
            className={classNames('Item', 'TextItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            {commandTextElement}
            {children}
          </div>
        );
      }

      case 'BULLETED': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div
            key={item.id}
            className={classNames('Item', 'BulletedItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            {commandTextElement}
            {children}
          </div>
        );
      }

      case 'NUMBERED': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div
            key={item.id}
            className={classNames('Item', 'NumberedItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            {commandTextElement}
            {children}
          </div>
        );
      }

      case 'TASK': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div
            key={item.id}
            className={classNames('Item', 'TaskItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            <input type="checkbox" checked={item.completed} />
            {commandTextElement}
            {children}
          </div>
        );
      }

      case 'TOGGLE': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <details
            key={item.id}
            className={classNames('Item', 'ToggleItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
            open={item.opened}
          >
            <summary>{commandTextElement}</summary>
            {children}
          </details>
        );
      }

      case 'HEADER': {
        return (
          <div
            key={item.id}
            className={classNames('Item', 'HeaderItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            <h2>{commandTextElement}</h2>
          </div>
        );
      }

      case 'QUOTE': {
        return (
          <blockquote
            key={item.id}
            className={classNames('Item', 'QuoteItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            {commandTextElement}
          </blockquote>
        );
      }

      case 'DIVIDER': {
        return (
          <div
            key={item.id}
            className={classNames('Item', 'DividerItem', { Item__Selected: ui.selectedIds.indexOf(item.id) !== -1 })}
          >
            <hr />
          </div>
        );
      }

      default:
    }

    return <span />;
  }

  public render(): JSX.Element {
    const page: IPage = this.state.pages[0];

    return (
      <section className="Page HomeMobilePage">
        <h1>{page.title}</h1>
        {page.items.map(this.renderItem.bind(this))}
      </section>
    );
  }

  private onChange(event: React.FormEvent<HTMLInputElement>, props: any): void {
    const value: string = event.currentTarget.value;

    updateItem(this.dispatch, { id: props.item.id, text: value });
  }
}
