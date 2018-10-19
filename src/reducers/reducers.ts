// tslint:disable:no-any
import { IAction } from 'actionCreators/actionCreators';
import { actionTypes } from 'constants/actionTypes';
import { IItem, IPaper, IState } from 'state/state';
import { traverse } from 'utils/traverse';

// tslint:disable-next-line:cyclomatic-complexity
export function reducers(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  const paper: IPaper = newState.binders[0].papers[0];
  switch (action.actionType) {
    case actionTypes.FOCUS_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.id);
      if (item && traverse.hasText(item)) {
        newState.pencil.focusedId = payload.id;
        newState.pencil.value = item.text;
      }
      break;
    }
    case actionTypes.FOCUS_PREV_ITEM: {
      const prevItem: IItem | null = traverse.findPrevSkipNoText(paper.items, payload.id);
      if (prevItem !== null) {
        newState.pencil.focusedId = prevItem.id;
      }
      if (traverse.hasText(prevItem)) {
        newState.pencil.value = prevItem.text;
      }
      break;
    }
    case actionTypes.FOCUS_NEXT_ITEM: {
      const nextItem: IItem | null = traverse.findNextSkipNoText(paper.items, payload.id);
      if (nextItem !== null) {
        newState.pencil.focusedId = nextItem.id;
      }
      if (traverse.hasText(nextItem)) {
        newState.pencil.value = nextItem.text;
      }
      break;
    }
    case actionTypes.ADD_AFTER_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.id);
      const newItem: IItem | null = traverse.addAfter(paper.items, payload.id);
      if (item !== null && newItem !== null) {
        traverse.turnInto(item, item.style);
        newState.pencil.value = '';
        newState.pencil.focusedId = newItem.id;
      }
      break;
    }
    case actionTypes.INDENT_ITEM: {
      traverse.indent(paper.items, payload.id);
      break;
    }
    case actionTypes.UNINDENT_ITEM: {
      traverse.unindent(paper.items, payload.id);
      break;
    }
    case actionTypes.REMOVE_ITEM: {
      const prevItem: IItem | null = traverse.findPrevSkipNoText(paper.items, payload.id);
      if (prevItem) {
        newState.pencil.focusedId = prevItem.id;
      }
      traverse.remove(paper.items, payload.id);
      break;
    }
    case actionTypes.TURN_INTO: {
      const item: IItem | null = traverse.find(paper.items, payload.id);
      if (item) {
        traverse.turnInto(item, payload.style);
      }
      break;
    }
    case actionTypes.CONCAT_ITEM: {
      const prevItem: IItem | null = traverse.findPrev(paper.items, payload.id);
      const item: IItem | null = traverse.find(paper.items, payload.id);
      if (item && traverse.hasText(item) && traverse.hasText(prevItem)) {
        traverse.merge(prevItem, {
          ...prevItem,
          text: prevItem.text + item.text,
        });
        if (prevItem) {
          newState.pencil.focusedId = prevItem.id;
        }
        traverse.remove(paper.items, item.id);
      }
      break;
    }
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.id);
      traverse.merge(<IItem>item, payload);
      break;
    }
    default:
  }

  return newState;
}
