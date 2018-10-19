import * as React from 'react';

import { logger } from 'logger';
import { IItem, IPaper, IPencil, IState, ITextItem, IUI } from 'state/state';

import {
  addAfterItem,
  concatItem,
  focusItem,
  focusNextItem,
  focusPrevItem,
  IAction,
  indentItem,
  removeItem,
  splitItem,
  turnInto,
  unindentItem,
  updateItem,
} from 'actionCreators/actionCreators';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { traverse } from 'utils/traverse';

interface IProps {
  item: IItem;
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

export class Pencil extends Container<IProps & IContainerProps, IState> {
  // tslint:disable-next-line:no-any
  private ref: React.RefObject<any>;

  constructor(props: IProps & IContainerProps) {
    super(props);

    this.ref = React.createRef();
    this.onInput = this.onInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  public componentDidMount(): void {
    const pencil: IPencil = this.state.pencil;
    const paper: IPaper = this.state.binders[0].papers[0];
    if (pencil.focusedId === this.props.item.id) {
      this.focus();
    }
  }

  public componentDidUpdate(prevProps: IProps & IContainerProps, prevState: IState): void {
    const pencil: IPencil = this.state.pencil;
    const prevPencil: IPencil = prevState.pencil;
    const paper: IPaper = this.state.binders[0].papers[0];
    if (pencil.focusedId === this.props.item.id && pencil.focusedId !== prevPencil.focusedId) {
      this.focus();
    }
  }

  public shouldComponentUpdate(prevProps: IProps & IContainerProps, prevState: IState): boolean {
    const pencil: IPencil = this.state.pencil;
    const prevPencil: IPencil = prevState.pencil;
    const paper: IPaper = this.state.binders[0].papers[0];
    if (pencil.focusedId === prevPencil.focusedId) {
      return false;
    }

    return true;
  }

  public render(): JSX.Element {
    // TODO: For now I consider only hasText item
    const item: IItem = this.props.item;
    const value: string | null = traverse.hasText(item) ? item.text : '';
    const focusedId: string | null = this.state.pencil.focusedId;

    return (
      <div
        className="Pencil"
        contentEditable
        suppressContentEditableWarning={true}
        ref={this.ref}
        onInput={this.onInput}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onFocus={this.onFocus}
      >
        {value}
      </div>
    );
  }

  private focus(): void {
    // FYI: https://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
    const el: HTMLElement = this.ref.current;
    el.focus();
    if (window.getSelection && window.document.createRange) {
      const range: Range = window.document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel: Selection = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  private onInput(event: React.FormEvent<HTMLElement>): void {
    const focusedId: string | null = this.state.pencil.focusedId;
    const value: string = event.currentTarget.innerText;

    if (focusedId) {
      focusItem(this.dispatch, { id: focusedId });
      updateItem(this.dispatch, { id: focusedId, text: value });
    }
  }

  // tslint:disable-next-line:cyclomatic-complexity max-func-body-length
  private onKeyDown(event: React.KeyboardEvent<HTMLElement>): void {
    const paper: IPaper = this.state.binders[0].papers[0];
    const item: IItem = this.props.item;
    const prevItem: IItem | null = traverse.findPrev(paper.items, item.id);
    const focusedId: string | null = this.state.pencil.focusedId;
    const el: HTMLElement = event.currentTarget;
    const value: string = event.currentTarget.innerText;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    const selection: Selection = window.getSelection();
    const start: number | null = selection.baseOffset;
    const end: number | null = selection.extentOffset;
    logger.info(event.type, keyCode, meta, shift, value, start, end, selection);
    // SHORTCUTS
    // [x] TAB                                                     : Indent (Mobile: Button)
    // [x] SHIFT + TAB                                             : Unindent (Mobile: Button)
    // [x] UP                                                      : Move to up(Mobile: Button)
    // [ ] CMD + UP                                                : Move to top(Mobile: Button)
    // [x] DOWN                                                    : Move to down(Mobile: Button)
    // [ ] CMD + DOWN                                              : Move to bottom(Mobile: Button)
    // [x] CMD + DELETE                                            : Remove line
    // [x] CARET POS 0 + !TEXT + DELETE                            : Turn into TEXT
    // [x] CARET POS 0 + INDENT !0 + DELETE                        : Unindent
    // [x] CARET POS 0 + INDENT 0 + DELETE + PREV ITEM HAS NO TEXT : Remove prev item
    // [x] CARET POS 0 + INDENT 0 + DELETE + PREV ITEM HAS TEXT    : Concat text to prev item
    // [x] CARET POS !0 + ENTER                                    : Split line
    if (keyCode === keyCodes.ENTER) {
      // FYI: Always prevent to enter ENTER
      event.preventDefault();
    }

    if (focusedId) {
      switch (true) {
        case keyCode === keyCodes.TAB && !meta && !shift: {
          event.preventDefault();
          indentItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.TAB && !meta && shift: {
          event.preventDefault();
          unindentItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.UP && !meta && !shift: {
          event.preventDefault();
          focusPrevItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.DOWN && !meta && !shift: {
          event.preventDefault();
          focusNextItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.DELETE && meta && !shift: {
          event.preventDefault();
          removeItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.DELETE && !meta && !shift && start === 0 && end === 0 && item.style !== 'TEXT': {
          event.preventDefault();
          turnInto(this.dispatch, { id: item.id, style: 'TEXT' });
          break;
        }
        case keyCode === keyCodes.DELETE &&
          !meta &&
          !shift &&
          start === 0 &&
          end === 0 &&
          traverse.hasIndent(item) &&
          item.indent !== 0: {
          event.preventDefault();
          unindentItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.DELETE &&
          !meta &&
          !shift &&
          start === 0 &&
          end === 0 &&
          traverse.hasIndent(item) &&
          item.indent === 0 &&
          !traverse.hasText(prevItem): {
          event.preventDefault();
          if (prevItem) {
            removeItem(this.dispatch, { id: prevItem.id });
          }
          break;
        }
        case keyCode === keyCodes.DELETE &&
          !meta &&
          !shift &&
          start === 0 &&
          end === 0 &&
          traverse.hasIndent(item) &&
          item.indent === 0 &&
          traverse.hasText(prevItem): {
          event.preventDefault();
          concatItem(this.dispatch, { id: focusedId });
          break;
        }
        case keyCode === keyCodes.ENTER &&
          !meta &&
          !shift &&
          start === end &&
          start !== 0 &&
          traverse.hasText(item) &&
          start <= item.text.length: {
          event.preventDefault();
          splitItem(this.dispatch, { id: focusedId }, start);
          break;
        }
        default:
      }
    }
  }

  // tslint:disable-next-line:cyclomatic-complexity max-func-body-length
  private onKeyUp(event: React.KeyboardEvent<HTMLElement>): void {
    // value, start, endの値を使う場合はこちら
    const paper: IPaper = this.state.binders[0].papers[0];
    const item: IItem = this.props.item;
    const prevItem: IItem | null = traverse.findPrev(paper.items, item.id);
    const focusedId: string | null = this.state.pencil.focusedId;
    const el: HTMLElement = event.currentTarget;
    const value: string = event.currentTarget.innerText;
    const keyCode: number = event.keyCode;
    const meta: boolean = event.metaKey;
    const shift: boolean = event.shiftKey;
    const selection: Selection = window.getSelection();
    const start: number | null = selection.baseOffset;
    const end: number | null = selection.extentOffset;
    logger.info(event.type, keyCode, meta, shift, value, start, end);
  }

  private onFocus(event: React.FocusEvent<HTMLElement>): void {
    const item: IItem = this.props.item;

    focusItem(this.dispatch, { id: item.id });
  }
}
