/**
 * App Component
 * Main entry point for the application
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../providers/ThemeProvider';
import '../styles/globals.scss';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
