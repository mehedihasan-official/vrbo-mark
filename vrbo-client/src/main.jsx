import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/Router.jsx'
import AuthProvider from './providers/AuthProvider/AuthProvider.jsx'
import { ThemeProvider } from './providers/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ThemeProvider>
    <AuthProvider>
     <RouterProvider router={router} />
   </AuthProvider>
   </ThemeProvider>
  </StrictMode>,
)
