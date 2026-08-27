import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' removed pre css
import App from './MyApp.jsx' // render new file MyApp to preserve App.jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)