import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell/AppShell';
import { HomePage } from '../pages/HomePage/HomePage';
import { ComingSoonPage } from '../pages/ComingSoonPage/ComingSoonPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <ComingSoonPage />,
      },
    ],
  },
]);
