import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import TrustStrip from '../components/TrustStrip'
import MenuSectionHome from '../components/MenuSectionHome'
import OrderOnline from '../components/OnlineOrder'
import AboutPreview from '../components/AboutPreview'
import Testimonials from '../components/Testimonials'
import GalleryPreview from '../components/GalleryPreview'
import LocationSection from '../components/LocationSection'
import FinalCTAHome from '../components/FinalCTAHome'
import Footer from '../components/Footer'
import { useLocation, useNavigate } from 'react-router-dom'


const HomePage = () => {
   const location = useLocation();
   const navigate = useNavigate();

useEffect(() => {
  if (location.state?.scrollTo === "menu-section") {
    const el = document.getElementById("menu-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // 🔥 IMPORTANT: clear state after scroll
    navigate(location.pathname, { replace: true });
  }
}, [location, navigate]);

  return (
    <div>
      <HeroSection/>
      <TrustStrip/>
      <MenuSectionHome/>

      <div id="order-online">
       <OrderOnline/>
      </div>
     
      <AboutPreview/>
      <Testimonials/>
      <GalleryPreview/>
      <LocationSection/>
      <FinalCTAHome/>
    </div>
  )
}

export default HomePage
