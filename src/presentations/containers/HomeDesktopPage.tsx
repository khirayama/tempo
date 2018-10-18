// tslint:disable:no-any react-this-binding-issue
import * as classNames from 'classnames';
import * as React from 'react';

import { Paper } from 'presentations/components/Paper';
import { Container, IContainerProps } from 'presentations/containers/Container';
import { Link } from 'router/Link';
import { IItem, IPaper, IState, ITextItem, IUI } from 'state/state';

export class HomeDesktopPage extends Container<{}, IState> {
  public render(): JSX.Element {
    return <Paper />;
  }
}
