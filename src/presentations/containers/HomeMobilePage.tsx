// tslint:disable:no-any react-this-binding-issue
import * as classNames from 'classnames';
import * as React from 'react';

import { Container, IContainerProps } from 'presentations/containers/Container';

export class HomeMobilePage extends Container<{}, {}> {
  constructor(props: IContainerProps) {
    super(props);

    this.state = { ...this.getState() };
  }

  public render(): JSX.Element {
    return <div>Hello</div>;
  }
}
