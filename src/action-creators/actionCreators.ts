// tslint:disable:no-any
import { actionTypes } from 'constants/actionTypes';

export interface IAction {
  actionType: string;
  payload?: any;
  meta?: any;
  error?: any;
}

export type IDispatch = (action: IAction) => void;

export async function updateItem(dispatch: IDispatch, item: { id: string; text?: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.UPDATE_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}
