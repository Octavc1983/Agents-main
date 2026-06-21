/**
 * App Component
 * Main entry point for the application
 */

import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ThemeProvider } from '../providers/ThemeProvider';
import { ModalProvider } from './services/modal';
import { PageTitleProvider } from '../providers/PageTitleContext';
import { AnnotationProvider } from '../features/review-annotations/AnnotationContext';
import { featureFlags } from '../config/featureFlags';
import '../styles/globals.scss';

function App() {
  return (
    <ThemeProvider>
      <PageTitleProvider>
        <ModalProvider>
          {featureFlags.reviewAnnotations ? (
            <AnnotationProvider>
              <RouterProvider router={router} />
            </AnnotationProvider>
          ) : (
            <RouterProvider router={router} />
          )}
        </ModalProvider>
      </PageTitleProvider>
    </ThemeProvider>
  );
}

export default App;
