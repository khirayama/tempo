import * as React from 'react';

import { Store } from 'Store';

import { IAction, IDispatch } from 'action-creators/actionCreators';
import { Paper } from 'presentations/components/Paper';
import { Pencil } from 'presentations/components/Pencil';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';

interface IProps {
  paper: IPaper;
  store: Store<IState, IAction>;
}

export class Pad extends React.Component<IProps> {
  public render(): JSX.Element {
    const paper: IPaper = this.props.paper;

    return (
      <>
        <Pencil store={this.props.store} paper={paper} />
        <Paper paper={paper} />
      </>
    );
  }
}
