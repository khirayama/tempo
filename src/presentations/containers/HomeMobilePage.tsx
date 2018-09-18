// tslint:disable:no-any react-this-binding-issue
import * as React from 'react';

import { updateItem } from 'action-creators/actionCreators';
import { CommandText } from 'presentations/components/CommandText';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { IItem, IPage, IState, ITextItem } from 'state/state';

export class HomeMobilePage extends Container<{}, IState> {
  constructor(props: IContainerProps) {
    super(props);

    this.state = { ...this.getState() };

    this.actions = {
      updateItem: (item: { id: string; text?: string }): Promise<{}> => {
        return updateItem(this.dispatch, item);
      },
    };

    this.onChange = this.onChange.bind(this);
  }

  // tslint:disable-next-line:max-func-body-length
  public renderItem(item: IItem): JSX.Element {
    let children: JSX.Element[] = [];

    switch (item.style) {
      case 'TEXT': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div className="Item" key={item.id}>
            <CommandText item={item} onChange={this.onChange} />
            {children}
          </div>
        );
      }

      case 'BULLETED': {
        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div className="Item" key={item.id}>
            <div>・ {item.text}</div>
            {children}
          </div>
        );
      }

      case 'NUMBERED': {
        // FYI: Consider index increment
        const index: number = 1;

        if (item.children.length) {
          children = item.children.map(this.renderItem.bind(this));
        }

        return (
          <div className="Item" key={item.id}>
            <div>
              {index} {item.text}
            </div>
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

    this.actions.updateItem({ id: props.item.id, text: value });
  }
}
