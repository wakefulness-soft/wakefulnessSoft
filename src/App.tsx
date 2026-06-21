import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'

function App() {
  return (
    <>
      <div className="page-container">
        <Navbar />
        <div className="main-content pt-20">
          <h1>Wakefulnes Software</h1>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
