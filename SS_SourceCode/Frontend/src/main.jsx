import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from "./Context/AuthContext.jsx"; // Correct import path


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    
      <App />
    </AuthContextProvider>
  </StrictMode>,
)
