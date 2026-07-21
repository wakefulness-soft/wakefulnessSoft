import Navbar from './components/Navbar/Navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import { HomePage } from './pages/Home/HomePage'

function App() {
  return (
    <>
      <div className="page-container">
        <Navbar />
        <div className="main-content pt-20">
          <HomePage />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
