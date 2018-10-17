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
  indentItem,
  moveSelection,
  unindentItem,
  updateItem,
} from 'actionCreators/actionCreators';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';
import { traverse } from 'utils/traverse';

export interface IProps {
  ui: IUI;
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
  private inputRef: React.RefObject<HTMLInputElement>;

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

    this.inputRef = React.createRef();
    this.focus = this.focus.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public componentDidUpdate(): void {
    const state: IState = this.getState();
    const focusedId: string | null = state.ui.focusedId;
    if (focusedId) {
      this.focus();
    }
  }

  public render(): JSX.Element {
    const value: string | null = this.state.ui.inputValue;
    const focusedId: string | null = this.state.ui.focusedId;

    return (
      <form className="Pencil" onSubmit={this.onSubmit}>
        <input
          autoFocus
          ref={this.inputRef}
          value={value}
          placeholder="Input something"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onInput={this.onKeyPress}
          onKeyUp={this.onKeyUp}
        />
        <span>{focusedId}</span>
      </form>
    );
  }

  private focus(): void {
    const inputEl: HTMLInputElement | null = this.inputRef.current;
    if (inputEl) {
      inputEl.focus();
    }
  }

  private onChange(event: React.FormEvent<HTMLInputElement>): void {
    const focusedId: string | null = this.state.ui.focusedId;
    const value: string = event.currentTarget.value;

    if (focusedId) {
      focusItem(this.dispatch, { id: focusedId, text: value });
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
    // UP / DOWN                      : Move to UP / DOWN(Mobile: Button)
    switch (true) {
      case keyCode === keyCodes.TAB && !meta && !shift: {
        if (focusedId) {
          event.preventDefault();
          indentItem(this.dispatch, { id: focusedId });
        }
        break;
      }
      case keyCode === keyCodes.TAB && !meta && shift: {
        if (focusedId) {
          event.preventDefault();
          unindentItem(this.dispatch, { id: focusedId });
        }
        break;
      }
      case keyCode === keyCodes.UP && !meta && !shift: {
        if (focusedId) {
          event.preventDefault();
          focusUpperItem(this.dispatch, { id: focusedId });
        }
        break;
      }
      case keyCode === keyCodes.DOWN && !meta && !shift: {
        if (focusedId) {
          event.preventDefault();
          focusDownerItem(this.dispatch, { id: focusedId });
        }
        break;
      }
      default:
    }
  }

  private onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    // value, start, endの値を使う場合はこちら
    const el: HTMLInputElement = event.currentTarget;
    const value: string = el.value;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    const start: number | null = el.selectionStart;
    const end: number | null = el.selectionEnd;
    console.log('KeyPress', keyCode, meta, shift, value, start, end);
    moveSelection(this.dispatch, { start, end });
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
    moveSelection(this.dispatch, { start, end });
  }
}
