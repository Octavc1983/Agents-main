import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@idira/design-system/styles'
import 'primereact/resources/primereact.min.css'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
