// tslint:disable:no-any
import * as React from 'react';

import { IQuery, queryString } from 'router/queryString';
import { IMatchedRoute, Router } from 'router/Router';

export const context: any = React.createContext(null);

interface INavigatorProps {
  props?: any;
  router: Router;
  path: string;
  onMount?(matchedRoute: IMatchedRoute): any;
  onTransition?(matchedRoute: IMatchedRoute): any;
}

interface INavigatorState {
  path: string;
}

export class Navigator extends React.Component<INavigatorProps, INavigatorState> {
  constructor(props: INavigatorProps) {
    super(props);

    this.state = {
      path: props.path,
    };
    if (typeof window === 'object' && window.history && window.history.pushState) {
      const depth: number = window.history.state ? window.history.state.depth || 0 : 0;
      window.history.replaceState({ depth }, window.document.title, window.location.href);

      window.addEventListener('popstate', (event: any) => {
        const { router } = this.props;
        const path: string = window.location.pathname;
        const matchedRoute: IMatchedRoute | null = router.matchRoute(path);
        if (matchedRoute !== null) {
          window.document.title = matchedRoute.title;
          this.setState({ path });
          window.history.replaceState(
            { depth: window.history.state.depth },
            window.document.title,
            window.location.href,
          );
          if (this.props.onTransition) {
            this.props.onTransition(matchedRoute);
          }
        }
      });
    }
  }

  public componentDidMount(): void {
    const { router } = this.props;
    const { path } = this.state;
    const matchedRoute: IMatchedRoute | null = router.matchRoute(path);
    if (matchedRoute !== null && this.props.onMount) {
      this.props.onMount(matchedRoute);
    }
  }

  public render(): JSX.Element | null {
    const { props, router } = this.props;
    const { path } = this.state;

    let pathname: string = path;
    let search: string = '';
    if (pathname.indexOf('?') !== -1) {
      const tmp: string[] = pathname.split('?');
      pathname = tmp[0];
      search = tmp[1];
    }

    const matchedRoute: IMatchedRoute | null = router.matchRoute(pathname);
    if (matchedRoute !== null) {
      const params: { [key: string]: string } = matchedRoute.params || {};
      const query: IQuery = queryString.parse(search);
      let component: string | React.ComponentClass | React.StatelessComponent;
      if (typeof matchedRoute.component === 'string') {
        component = matchedRoute.component;
      } else if (matchedRoute.component.toString().indexOf('class') === -1) {
        component = matchedRoute.component();
      } else {
        component = matchedRoute.component;
      }

      const ctx: {
        move(path: string): void;
      } = {
        move: this.move.bind(this),
      };

      return (
        <context.Provider value={ctx}>{React.createElement(component, { ...props, params, query })}</context.Provider>
      );
    }

    return null;
  }

  private move(path: string): void {
    const { router } = this.props;
    let pathname: string = path;
    let search: string = '';
    if (pathname.indexOf('?') !== -1) {
      const tmp: string[] = pathname.split('?');
      pathname = tmp[0];
      search = tmp[1];
    }
    if (window.location.pathname !== pathname || window.location.search.replace('?', '') !== search) {
      const matchedRoute: IMatchedRoute | null = router.matchRoute(pathname);
      if (matchedRoute !== null) {
        window.document.title = matchedRoute.title;
        window.history.pushState({ depth: window.history.state.depth + 1 }, matchedRoute.title, path);
        this.setState({ path });
        if (this.props.onTransition) {
          this.props.onTransition(matchedRoute);
        }
      }
    }
  }
}
