// tslint:disable:no-any
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
    //   case actionTypes.DESTROY_ITEM: {
    //     const upperItem: IItem | null = traverse.findUpperSkipNoText(paper.items, payload.id);
    //     if (upperItem) {
    //       newState.ui.focusedId = upperItem.id;
    //     }
    //     traverse.destroy(paper.items, payload.id);
    //     break;
    //   }
    //   case actionTypes.CANCEL_ITEM: {
    //     const upperItem: IItem | null = traverse.findUpper(paper.items, payload.id);
    //     traverse.cancel(paper.items, payload.id);
    //     const item: IItem | null = traverse.find(paper.items, payload.id);
    //     if (item === null && upperItem !== null) {
    //       newState.ui.focusedId = upperItem.id;
    //     }
    //     break;
    //   }
    // case actionTypes.UPDATE_ITEM: {
    //   const item: IItem | null = traverse.find(paper.items, payload.id);
    //   traverse.merge(<IItem>item, payload);
    //   break;
    // }
    default:
  }

  return newState;
}
