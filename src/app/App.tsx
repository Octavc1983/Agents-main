/**
 * App Component
 * Main entry point for the application
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '../styles/globals.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
