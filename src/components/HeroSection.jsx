import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {useNavigate,Link} from "react-router-dom"

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const floatingRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Load: "Cinematic In-Motion" Entrance
      gsap.fromTo(bgRef.current, 
        { 
          scale: 1.15, 
          y: -20,
          opacity: 0 
        }, 
        { 
          scale: 1, 
          y: 0,
          opacity: 1,
          duration: 2, 
          ease: "expo.out" 
        }
      );

      // 2. Text Reveal (Staggered)
      gsap.from(".animate-text", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.8 
      });

      // 3. Floating Motion for Coffee Elements
      gsap.to(".floating-bean", {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen min-h-[600px] md:min-h-[700px] lg:min-h-[650px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgRef}
          src={'./image1.png'}
          alt="Premium Cafehub Background" 
          className="w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* FLOATING ELEMENTS */}
      <div ref={floatingRef} className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        <div className="floating-bean absolute top-[25%] left-[10%] w-12 h-12 bg-[#3d2b1f]/20 rounded-full blur-[4px]" />
        <div className="floating-bean absolute bottom-[20%] right-[15%] w-16 h-16 bg-[#2a1d15]/20 rounded-full blur-[4px]" />
      </div>

      {/* CONTENT - Optimized for MD screens */}
      <div className="container relative z-20 mx-auto px-6 text-center flex flex-col items-center">
        <div className="animate-text mb-4 md:mb-6">
          <span className="inline-block px-4 py-1 border border-[#79A206] rounded-full text-[#79A206] font-bold uppercase tracking-[0.4em] text-[10px] md:text-[11px] lg:text-xs bg-black/20 backdrop-blur-sm">
            The Organic Experience
          </span>
        </div>

        {/* Headline: Scaled specifically for tablet (7xl) vs desktop (8xl+) */}
        <h1 className="animate-text text-white font-black leading-[1] tracking-tighter 
                       text-5xl sm:text-6xl md:text-7xl lg:text-[120px] xl:text-[140px] mb-4 md:mb-6 drop-shadow-2xl">
          GET IN <span className="text-[#79A206]">TOUCH</span>
        </h1>

        {/* Paragraph: Adjusted max-width and size for medium screens */}
        <p className="animate-text text-white font-medium leading-relaxed max-w-lg md:max-w-xl lg:max-w-2xl mx-auto
                      text-base md:text-lg lg:text-xl drop-shadow-md mb-8 md:mb-10">
          We’d love to hear from you or welcome you in person. <br className="hidden lg:block"/>
          Reach out or drop by for a great coffee experience.
        </p>
        
        {/* Buttons: Carefully scaled sizing across breakpoints */}
        {/* Buttons: Fixed for mobile full-width, preserved for MD+ */}
<div className="animate-text flex flex-col sm:flex-row gap-4 md:gap-5 lg:gap-6 w-full sm:w-auto px-4 sm:px-0">
  
  {/* Button 1: Order Online */}
  <button
    onClick={() => navigate("/", { state: { scrollTo: "order-online" } })}
    className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 md:px-11 md:py-4 lg:px-14 lg:py-5 bg-[#79A206] text-white rounded-full font-black text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest hover:bg-[#6a8d05] transition-all transform hover:scale-105 shadow-[0_15px_40px_rgba(121,162,6,0.4)] cursor-pointer"
  >
    Order Online
  </button>

  {/* Button 2: View Menu (Note the w-full on the Link tag too) */}
  <Link to='/menus' className="w-full sm:w-auto">
    <button className="w-full sm:w-auto px-8 py-3.5 sm:px-10 sm:py-4 md:px-11 md:py-4 lg:px-14 lg:py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-black text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105 cursor-pointer">
      View Menu
    </button>
  </Link>
</div>
      </div>

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 md:gap-10 items-center hidden lg:flex">
         <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#79A206] to-transparent"></div>
         <p className="rotate-90 text-[#79A206] font-bold tracking-[0.5em] uppercase text-[10px] whitespace-nowrap">Premium Quality</p>
         <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#79A206] to-transparent"></div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 w-full px-6 md:px-12 flex justify-between items-end">
        <div className="animate-text hidden md:block">
          <p className="text-[#79A206] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Visit Us</p>
          <p className="text-white text-xs md:text-sm">New Delhi, India</p>
        </div>
        
        <div className="flex flex-col items-center gap-2">
           <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Scroll</span>
           <div className="w-[2px] h-8 md:h-12 bg-gradient-to-b from-[#79A206] to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;