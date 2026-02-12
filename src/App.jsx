import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CategoryPage from './pages/CategoryPage'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import SplashScreen from './components/SplashScreen'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      <ScrollToTop />
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:categorySlug" element={<CategoryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
