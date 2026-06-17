import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="page-container">
      <Navbar />
      <div className="main-content pt-20">
        <App />
      </div>
      <Footer />
    </div>
  </StrictMode>,
)