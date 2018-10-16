// tslint:disable:no-any react-this-binding-issue
import * as classNames from 'classnames';
import * as React from 'react';

import { Pad } from 'presentations/components/Pad';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';

export class HomeDesktopPage extends Container<{}, IState> {
  constructor(props: IContainerProps) {
    super(props);

    this.state = { ...this.getState() };
  }

  public render(): JSX.Element {
    const ui: IUI = this.state.ui;
    const paper: IPaper = this.state.binders[0].papers[0];

    return <Pad ui={ui} paper={paper} store={this.props.store} />;
  }
}
