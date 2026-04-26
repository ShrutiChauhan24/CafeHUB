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
import { useLocation } from 'react-router-dom'



const HomePage = () => {
   const location = useLocation();

   useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [location]);

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
