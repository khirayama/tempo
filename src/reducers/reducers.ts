// tslint:disable:no-any
import { IAction } from 'action-creators/actionCreators';
import { actionTypes } from 'constants/actionTypes';
import { IItem, IState } from 'state/state';

function findItem(id: string, items: IItem[]): IItem | null {
  for (const item of items) {
    if (item.id === id) {
      return item;
    } else {
      if (
        item.style === 'TEXT' ||
        item.style === 'BULLETED' ||
        item.style === 'NUMBERED' ||
        item.style === 'TASK' ||
        item.style === 'TOGGLE'
      ) {
        return findItem(id, item.children);
      }
    }
  }

  return null;
}

export function reducers(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  switch (action.actionType) {
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = findItem(payload.id, newState.pages[0].items);
      Object.assign(item, payload);
    }
    default:
  }

  return newState;
}
