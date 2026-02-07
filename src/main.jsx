import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext'; // <--- IMPORTAR

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>  {/* <--- ENVOLVER APP CON ESTO */}
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)