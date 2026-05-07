import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LayoutWrapper from './layout/LayoutWrapper';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import CafeHubLoader from './components/CafeHubLoader';
import { ToastContainer } from "react-toastify";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminMenuItems from './pages/admin/AdminMenuItems';
import AdminAllCategory from './pages/admin/AdminAllCategory';
import AdminLayout from './layout/AdminLayout';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

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
    <CartProvider>
    {isLoading ? (
      <CafeHubLoader onLoaded={() => setIsLoading(false)} />
    ) : (
      <>
        <ScrollToTop />
        <CartDrawer />
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

      <Route path='/admin/login' element={
        <AdminLogin/>
      }/>

      <Route path="/admin" element={<AdminLayout />}>
          
          <Route path='menu-items' element={
        <ProtectedRoute>
          <AdminMenuItems/>
        </ProtectedRoute>
        
      }/>

      <Route path='all-categories' element={
        <ProtectedRoute>
          <AdminAllCategory/>
        </ProtectedRoute>
        
      }/>

        </Route>

    </Routes>
     </>)}

    <ToastContainer/> 
    </CartProvider>
    </>
  
  )
}

export default App;
