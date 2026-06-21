import Navbar from './components/Navbar/Navbar.tsx'
import BodyContent from './components/BodyContent/BodyContent.tsx'
import Footer from './components/Footer.tsx'

function App() {
  return (
    <>
      <div className="page-container">
        <Navbar />
        <div className="main-content pt-20">
          <BodyContent />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
