import { useRoutes } from 'react-router-dom';

import MainRoutes from './main-routes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes]);
}
