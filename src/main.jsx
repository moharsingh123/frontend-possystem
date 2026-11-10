import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import globalState from './Redux Toolkit/globalState'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={globalState}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
