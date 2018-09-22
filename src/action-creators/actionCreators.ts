// tslint:disable:no-any
import { actionTypes } from 'constants/actionTypes';

export interface IAction {
  actionType: string;
  payload?: any;
  meta?: any;
  error?: any;
}

export type IDispatch = (action: IAction) => void;

export async function focusItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.FOCUS_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function addItem(dispatch: IDispatch, item: { prevId: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.ADD_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function shiftItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.SHIFT_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function unshiftItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.UNSHIFT_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function deleteItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.DELETE_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function cancelItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.CANCEL_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function updateItem(dispatch: IDispatch, item: { id: string; text?: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.UPDATE_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}
