/**
 * App Component
 * Main entry point for the application
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ModalProvider } from './services/modal';
import '../styles/globals.scss';

function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
