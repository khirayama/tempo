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

export async function focusPrevItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.FOCUS_PREV_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function focusNextItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.FOCUS_NEXT_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function addAfterItem(dispatch: IDispatch, item: { id: string; text?: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.ADD_AFTER_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function indentItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.INDENT_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function unindentItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.UNINDENT_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function removeItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.REMOVE_ITEM,
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
