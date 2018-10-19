// tslint:disable:no-any cyclomatic-complexity max-func-body-length
import { IAction } from 'actionCreators/actionCreators';
import { actionTypes } from 'constants/actionTypes';
import { IItem, IPaper, IState } from 'state/state';
import { traverse } from 'utils/traverse';

export function reducers(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  const paper: IPaper = newState.binders[0].papers[0];
  switch (action.actionType) {
    case actionTypes.FOCUS_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.item.id);
      if (item && traverse.hasText(item)) {
        newState.pencil.focusedId = payload.item.id;
        newState.pencil.value = item.text;
      }
      break;
    }
    case actionTypes.FOCUS_PREV_ITEM: {
      const prevItem: IItem | null = traverse.findPrevSkipNoText(paper.items, payload.item.id);
      if (prevItem !== null) {
        newState.pencil.focusedId = prevItem.id;
      }
      if (traverse.hasText(prevItem)) {
        newState.pencil.value = prevItem.text;
      }
      break;
    }
    case actionTypes.FOCUS_NEXT_ITEM: {
      const nextItem: IItem | null = traverse.findNextSkipNoText(paper.items, payload.item.id);
      if (nextItem !== null) {
        newState.pencil.focusedId = nextItem.id;
      }
      if (traverse.hasText(nextItem)) {
        newState.pencil.value = nextItem.text;
      }
      break;
    }
    case actionTypes.ADD_AFTER_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.item.id);
      const newItem: IItem | null = traverse.addAfter(paper.items, payload.item.id);
      if (item !== null && newItem !== null) {
        traverse.turnInto(newItem, item.style);
        newState.pencil.value = '';
        newState.pencil.focusedId = newItem.id;
      }
      break;
    }
    case actionTypes.INDENT_ITEM: {
      traverse.indent(paper.items, payload.item.id);
      break;
    }
    case actionTypes.UNINDENT_ITEM: {
      traverse.unindent(paper.items, payload.item.id);
      break;
    }
    case actionTypes.REMOVE_ITEM: {
      const prevItem: IItem | null = traverse.findPrevSkipNoText(paper.items, payload.item.id);
      if (prevItem) {
        newState.pencil.focusedId = prevItem.id;
      }
      traverse.remove(paper.items, payload.item.id);
      break;
    }
    case actionTypes.TURN_INTO: {
      const item: IItem | null = traverse.find(paper.items, payload.item.id);
      if (item) {
        traverse.turnInto(item, payload.item.style);
      }
      break;
    }
    case actionTypes.CONCAT_ITEM: {
      const prevItem: IItem | null = traverse.findPrev(paper.items, payload.item.id);
      const item: IItem | null = traverse.find(paper.items, payload.item.id);
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
    case actionTypes.SPLIT_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.item.id);
      const newItem: IItem | null = traverse.addAfter(paper.items, payload.item.id);
      const point: number = payload.point;
      if (item && traverse.hasText(item) && newItem && traverse.hasText(newItem)) {
        const currentText: string = item.text.substr(0, point);
        const newText: string = item.text.substr(point);
        traverse.merge(<IItem>item, {
          ...item,
          text: currentText,
        });
        traverse.turnInto(newItem, item.style);
        traverse.merge(<IItem>newItem, {
          ...newItem,
          text: newText,
        });
        newState.pencil.value = newItem.text;
        newState.pencil.focusedId = newItem.id;
      }

      break;
    }
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = traverse.find(paper.items, payload.item.id);
      if (item) {
        traverse.merge(<IItem>item, payload.item);
      }
      break;
    }
    default:
  }

  return newState;
}
