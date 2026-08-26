import Navbar from './components/Navbar/Navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import LanguageSwitcher from "./components/ui/LanguageSwitcher/LanguageSwitcher";
import { HomePage } from './pages/Home/HomePage'
import { ThemeSwitcher } from './components/ui/ThemeSwitcher/ThemeSwitcher.tsx'
import { ThemeContextProvider } from './context/ThemeContext.tsx'


function App() {
  return (
    <ThemeContextProvider>
      <div className="page-container">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Navbar />
        <HomePage />
        <Footer />
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </ThemeContextProvider>
  )
}

export default App
