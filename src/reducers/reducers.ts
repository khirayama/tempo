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
      const upperItem: IItem | null = traverse.findUpperItem(page.items, payload.id);
      if (upperItem !== null) {
        newState.ui.focusedId = upperItem.id;
      }
      break;
    }
    case actionTypes.FOCUS_DOWNER_ITEM: {
      const downerItem: IItem | null = traverse.findDownerItem(page.items, payload.id);
      if (downerItem !== null) {
        newState.ui.focusedId = downerItem.id;
      }
      break;
    }
    case actionTypes.ADD_ITEM: {
      const item: IItem | null = traverse.addItem(page.items, payload.prevId);
      if (item !== null) {
        newState.ui.focusedId = item.id;
      }
      break;
    }
    case actionTypes.SHIFT_ITEM: {
      traverse.shiftItem(page.items, payload.id);
      break;
    }
    case actionTypes.UNSHIFT_ITEM: {
      traverse.unshiftItem(page.items, payload.id);
      break;
    }
    case actionTypes.DELETE_ITEM: {
      // TODO: Update focusedId
      traverse.deleteItem(page.items, payload.id);
      break;
    }
    case actionTypes.CANCEL_ITEM: {
      // TODO: Update focusedId not to find newState.ui.focusedId
      traverse.cancelItem(page.items, payload.id);
      break;
    }
    case actionTypes.PREPEND_ITEM: {
      traverse.prependItem(page.items, payload.id, payload.toId);
      break;
    }
    case actionTypes.APPEND_ITEM: {
      traverse.appendItem(page.items, payload.id, payload.toId);
      break;
    }
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = traverse.findItem(page.items, payload.id);
      Object.assign(item, payload);
      break;
    }
    default:
  }

  return newState;
}
