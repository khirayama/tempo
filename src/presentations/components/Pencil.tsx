import * as React from 'react';

import { Container, IContainerProps } from 'presentations/containers/Container';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';
import { traverse } from 'utils/traverse';

import {
  addBeforeItem,
  addItem,
  cancelItem,
  destroyItem,
  focusDownerItem,
  focusItem,
  focusUpperItem,
  IAction,
  indentItem,
  unindentItem,
  updateItem,
} from 'action-creators/actionCreators';

export interface IProps {
  paper: IPaper;
}

export interface ILocalState {
  value: string;
  item: IItem | null;
}

const keyCodes: { [key: string]: number } = {
  DELETE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40,
  P: 80,
};

export class Pencil extends Container<IProps & IContainerProps, ILocalState & IState> {
  constructor(props: IProps & IContainerProps) {
    super(props);
    const state: IState = this.getState();
    const paper: IPaper = this.props.paper;
    const focusedId: string | null = state.ui.focusedId;
    const item: IItem | null = focusedId ? traverse.find(paper.items, focusedId) : null;

    this.state = {
      ...state,
      item,
      value: traverse.hasText(item) ? item.text : '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public render(): JSX.Element {
    const focusedId: string | null = this.state.ui.focusedId;

    return (
      <form className="Pencil" onSubmit={this.onSubmit}>
        <input value={this.state.value} placeholder="Input something" onChange={this.onChange} onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp}/>
        <span>{focusedId}</span>
      </form>
    );
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    const focusedId: string | null = this.state.ui.focusedId;
    const value: string = event.currentTarget.value;

    this.setState({ value });
    if (focusedId) {
      updateItem(this.dispatch, { id: focusedId, text: value });
    }
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const focusedId: string | null = this.state.ui.focusedId;

    this.setState({ value: '' });
    if (focusedId) {
      addItem(this.dispatch, { prevId: focusedId });
    }
  }

  private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    const focusedId: string | null = this.state.ui.focusedId;
    const el: HTMLInputElement = event.currentTarget;
    const value: string = el.value;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    const start: number | null = el.selectionStart;
    const end: number | null = el.selectionEnd;
    console.log('KeyDown', keyCode, meta, shift, value, start, end);

    // TAB                          : Indent (Mobile: Button)
    // SHIFT + TAB                  : Unindent (Mobile: Button)
    switch (true) {
      case (
        keyCode === keyCodes.TAB &&
        !meta &&
        !shift
      ): {
        if (focusedId) {
          event.preventDefault();
          indentItem(this.dispatch, { id: focusedId });
        }
        break;
      }
      case (
        keyCode === keyCodes.TAB &&
        !meta &&
        shift
      ): {
        if (focusedId) {
          event.preventDefault();
          unindentItem(this.dispatch, { id: focusedId });
        }
        break;
      }
      default:
    }
  }

  private onKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    // value, start, endの値を使う場合はこちら
    const el: HTMLInputElement = event.currentTarget;
    const value: string = el.value;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    const start: number | null = el.selectionStart;
    const end: number | null = el.selectionEnd;
    console.log('KeyUp', keyCode, meta, shift, value, start, end);
  }
}
