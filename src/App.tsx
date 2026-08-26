import Navbar from './components/Navbar/Navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import LanguageSwitcher from "./components/ui/LanguageSwitcher/LanguageSwitcher";
import { HomePage } from './pages/Home/HomePage'
import { ThemeSwitcher } from './components/ui/ThemeSwitcher/ThemeSwitcher.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'


function App() {
  return (
    <>
      <ThemeContextProvider>
        <div className="page-container">
          <Navbar />
          <div className="main-content pt-20">
            <HomePage />
          </div>
          <Footer />
          <ThemeSwitcher/>
          <LanguageSwitcher/>
        </div>
      </ThemeContextProvider>
    </>
  )
}

export default App