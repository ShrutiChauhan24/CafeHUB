import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import LayoutWrapper from './layout/LayoutWrapper'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import CafeHubLoader from './components/CafeHubLoader'
import { ToastContainer } from "react-toastify";
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  if (!isLoading) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }
}, [isLoading]);

  return (
    <>
    {isLoading ? (
      <CafeHubLoader onLoaded={() => setIsLoading(false)} />
    ) : (
      <>
        <ScrollToTop />
    <Routes>
      <Route path='/' element={
        <LayoutWrapper>
        <HomePage/>
        </LayoutWrapper>
      }/>

      <Route path='/menus' element={
        <LayoutWrapper>
        <MenuPage/>
        </LayoutWrapper>
      }/>

      <Route path='/gallery' element={
        <LayoutWrapper>
        <GalleryPage/>
        </LayoutWrapper>
      }/>

      <Route path='/about' element={
        <LayoutWrapper>
        <AboutPage/>
        </LayoutWrapper>
      }/>

      <Route path='/contact' element={
        <LayoutWrapper>
        <ContactPage/>
        </LayoutWrapper>
      }/>
    </Routes>
     </>)}

    <ToastContainer/> 
    </>
  
  )
}

export default App
