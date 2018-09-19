// tslint:disable:no-any
import { IAction } from 'action-creators/actionCreators';
import { actionTypes } from 'constants/actionTypes';
import { IItem, IState } from 'state/state';
import { traverse } from 'utils/traverse';

export function reducers(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  switch (action.actionType) {
    case actionTypes.UPDATE_ITEM: {
      const item: IItem | null = traverse.find(newState.pages[0].items, payload.id);
      Object.assign(item, payload);
    }
    default:
  }

  return newState;
}
