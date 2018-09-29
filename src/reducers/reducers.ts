// tslint:disable:no-any
import { IAction } from 'action-creators/actionCreators';
import { actionTypes } from 'constants/actionTypes';
import { IItem, IPage, IState } from 'state/state';
import { traverse } from 'utils/traverse';

export function reducers(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  const page: IPage = newState.pages[0];
  switch (action.actionType) {
    case actionTypes.FOCUS_ITEM: {
      newState.ui.focusedId = payload.id;
      break;
    }
    case actionTypes.FOCUS_UPPER_ITEM: {
      const upperItem: IItem | null = traverse.findUpperSkipNoText(page.items, payload.id);
      if (upperItem !== null) {
        newState.ui.focusedId = upperItem.id;
      }
      break;
    }
    case actionTypes.FOCUS_DOWNER_ITEM: {
      const downerItem: IItem | null = traverse.findDownerSkipNoText(page.items, payload.id);
      if (downerItem !== null) {
        newState.ui.focusedId = downerItem.id;
      }
      break;
    }
    case actionTypes.ADD_BEFORE_ITEM: {
      const item: IItem | null = traverse.addBefore(page.items, payload.prevId);
      break;
    }
    case actionTypes.ADD_ITEM: {
      const item: IItem | null = traverse.addAfter(page.items, payload.prevId);
      if (item !== null) {
        newState.ui.focusedId = item.id;
      }
      break;
    }
    case actionTypes.INDENT_ITEM: {
      traverse.indent(page.items, payload.id);
      break;
    }
    case actionTypes.UNINDENT_ITEM: {
      traverse.unindent(page.items, payload.id);
      break;
    }
    case actionTypes.DESTROY_ITEM: {
      const upperItem: IItem | null = traverse.findUpperSkipNoText(page.items, payload.id);
      if (upperItem) {
        newState.ui.focusedId = upperItem.id;
      }
      traverse.destroy(page.items, payload.id);
      break;
    }
    case actionTypes.CANCEL_ITEM: {
      const upperItem: IItem | null = traverse.findUpper(page.items, payload.id);
      traverse.cancel(page.items, payload.id);
      const item: IItem | null = traverse.find(page.items, payload.id);
      if (item === null && upperItem !== null) {
        newState.ui.focusedId = upperItem.id;
      }
      break;
    }
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = traverse.find(page.items, payload.id);
      traverse.merge(<IItem>item, payload);
      break;
    }
    default:
  }

  return newState;
}
