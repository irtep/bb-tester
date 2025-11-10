import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { GameProvider } from "./context/GameContext";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameProvider>
  </StrictMode>,
)