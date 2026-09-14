import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar/Navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import { HomePage } from './pages/Home/HomePage'
import { ThemeContextProvider } from './context/ThemeContext.tsx'


function App() {
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const language = i18n.resolvedLanguage?.startsWith('es') ? 'es' : 'en'
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')

    document.documentElement.lang = language
    document.title = t('meta.title')
    description?.setAttribute('content', t('meta.description'))
    openGraphTitle?.setAttribute('content', t('meta.title'))
    openGraphDescription?.setAttribute('content', t('meta.description'))
  }, [i18n.resolvedLanguage, t])

  return (
    <ThemeContextProvider>
      <div className="page-container">
        <a className="skip-link" href="#main-content">{t('accessibility.skipToContent')}</a>
        <Navbar />
        <HomePage />
        <Footer />
      </div>
    </ThemeContextProvider>
  )
}

export default App
