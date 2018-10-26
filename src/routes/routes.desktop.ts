import { EditorPage } from 'presentations/containers/Editor';
import { HomeDesktopPage } from 'presentations/containers/HomeDesktopPage';
import { WorkaroundPage } from 'presentations/containers/WorkaroundPage';
import { IRoute } from 'router/Router';

export const routes: IRoute[] = [
  {
    path: '/',
    title: 'Home',
    component: (): typeof HomeDesktopPage => {
      return HomeDesktopPage;
    },
  },
  {
    path: '/workaround',
    title: 'Workaround',
    component: (): typeof WorkaroundPage => {
      return WorkaroundPage;
    },
  },
  {
    path: '/editor',
    title: 'editor',
    component: (): typeof EditorPage => {
      return EditorPage;
    },
  },
];
