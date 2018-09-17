import * as deepEqual from 'deep-equal';
import * as React from 'react';

import { IAction, IDispatch } from 'action-creators/actionCreators';
import { IState } from 'state/state';
import { Store } from 'Store';

export interface IContainerProps {
  store: Store<IState, IAction>;
  params: { [key: string]: string };
  query: { [key: string]: null | string | number | boolean };
}

export class Container<P, S> extends React.Component<P & IContainerProps, S & IState> {
  protected handleStateUpdate: () => void;

  protected dispatch: IDispatch;

  // tslint:disable-next-line:no-any
  protected actions: any = {};

  constructor(props: P & IContainerProps) {
    super(props);

    this.handleStateUpdate = (): void => {
      this.setState(props.store.getState());
    };
    this.dispatch = props.store.dispatch.bind(props.store);

    const { store }: { store: Store<IState, IAction> } = this.props;
    store.addChangeListener(this.handleStateUpdate);
  }

  public shouldComponentUpdate(prevProps: IContainerProps, prevState: IState): boolean {
    return !deepEqual(this.props, prevProps) || !deepEqual(this.state, prevState);
  }

  public componentWillUnmount(): void {
    const { store }: { store: Store<IState, IAction> } = this.props;

    store.removeChangeListener(this.handleStateUpdate);
  }

  protected getState(): IState {
    const { store }: { store: Store<IState, IAction> } = this.props;

    return store.getState();
  }
}
