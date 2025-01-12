import { StrictMode } from 'react'
import './styles/index.css'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AppRoutes />
  </StrictMode>,
)
