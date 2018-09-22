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
    case actionTypes.ADD_ITEM: {
      const id: string = new Date().toString();
      traverse.addItem(page.items, payload.prevId, id);
      newState.ui.focusedId = id;
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
      traverse.deleteItem(page.items, payload.id);
      break;
    }
    case actionTypes.CANCEL_ITEM: {
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
      const item: IItem | null = traverse.find(page.items, payload.id);
      Object.assign(item, payload);
      break;
    }
    default:
  }

  return newState;
}
