// tslint:disable:no-any react-this-binding-issue
import * as React from 'react';

import {
  addItem,
  cancelItem,
  deleteItem,
  focusItem,
  shiftItem,
  unshiftItem,
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
        onSubmit={(): void => {
          addItem(this.dispatch, { prevId: item.id });
        }}
        onShift={(): void => {
          shiftItem(this.dispatch, { id: item.id });
        }}
        onUnshift={(): void => {
          unshiftItem(this.dispatch, { id: item.id });
        }}
        onDelete={(): void => {
          deleteItem(this.dispatch, { id: item.id });
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
    let children: JSX.Element[] = [];

    const commandTextElement: JSX.Element = this.renderCommandText(item);

    switch (item.style) {
      case 'TEXT': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div key={item.id} className="Item TextItem">
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
          <div className="Item BulletedItem" key={item.id}>
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
          <div className="Item NumberedItem" key={item.id}>
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
          <div className="Item" key={item.id}>
            <div>
              <input type="checkbox" checked={item.completed} /> {item.text}
            </div>
            {children}
          </div>
        );
      }

      case 'TOGGLE': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <details className="Item" key={item.id} open={item.opened}>
            <summary>{item.text}</summary>
            {children}
          </details>
        );
      }

      case 'HEADER': {
        return (
          <div className="Item" key={item.id}>
            <h2>{item.text}</h2>
          </div>
        );
      }

      case 'QUOTE': {
        return (
          <blockquote className="Item" key={item.id}>
            {item.text}
          </blockquote>
        );
      }

      case 'DIVIDER': {
        return (
          <div className="Item" key={item.id}>
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
