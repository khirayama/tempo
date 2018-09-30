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

export async function focusUpperItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.FOCUS_UPPER_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function focusDownerItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.FOCUS_DOWNER_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function addBeforeItem(dispatch: IDispatch, item: { prevId: string; text?: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.ADD_BEFORE_ITEM,
    payload: item,
  };
  dispatch(action);

  return action;
}

export async function addItem(dispatch: IDispatch, item: { prevId: string; text?: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.ADD_ITEM,
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

export async function destroyItem(dispatch: IDispatch, item: { id: string }): Promise<IAction> {
  const action: IAction = {
    actionType: actionTypes.DESTROY_ITEM,
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
