/**
 * App Component
 * Main entry point for the application
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ModalProvider } from './services/modal';
import { PageTitleProvider } from '../providers/PageTitleContext';
import '../styles/globals.scss';

function App() {
  return (
    <ThemeProvider>
      <PageTitleProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </PageTitleProvider>
    </ThemeProvider>
  );
}

export default App;
