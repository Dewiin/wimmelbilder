import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'

// components
import { Toaster } from "@/components/ui/sonner"

// contexts
import UIProvider from './contexts/UIContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UIProvider>
        <Toaster />
        <App />
      </UIProvider>
    </BrowserRouter>
  </StrictMode>,
)
