import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../components/layout/main-layout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/dashboard')));
const SongsCatalog = Loadable(lazy(() => import('../pages/catalogs/song-catalogs')));
const MySongsCatalog = Loadable(lazy(() => import('../pages/my-songs/my-songs')));
const Playlists = Loadable(lazy(() => import('../pages/Playlists/playlists')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />,
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        },
        {
          path: '*',
          element: <DashboardDefault />
        }
      ]
    },
    {
        path: '',
        element: <DashboardDefault />
    },
    {
        path: 'home',
        element: <DashboardDefault />
    },
    {
        path: 'sign-in',
        element: <DashboardDefault />
    },
    {
        path: 'Songs',
        element: <SongsCatalog />
    },
    {
      path: 'my-songs',
      element: <MySongsCatalog />
    },
    {
        path: 'playlists',
        element: <Playlists />
    },
  ]
};

export default MainRoutes;
