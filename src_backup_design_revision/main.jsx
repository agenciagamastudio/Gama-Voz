import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProposalProvider } from './context/ProposalContext.jsx'; // Import ProposalProvider
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <ProposalProvider>
        <App />
      </ProposalProvider>
    </BrowserRouter>
  </StrictMode>,
)
