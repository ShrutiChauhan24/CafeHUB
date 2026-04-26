import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutCTA = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Bloom Animation
      gsap.fromTo(
        bgRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // Text Staggered Unmasking
      gsap.from(".cta-animate", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-4 pb-12 md:pt-6 md:pb-20 lg:pt-20 lg:pb-24 px-6 md:px-12 lg:px-12 overflow-hidden bg-[#FCF9F5]"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] lg:rounded-[60px] bg-stone-900 min-h-[450px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center p-8 md:p-12 lg:p-16">
          
          {/* Animated Background Mesh */}
          <div
            ref={bgRef}
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(circle at 20% 30%, #8BA888 0%, transparent 40%), 
                           radial-gradient(circle at 80% 70%, #5F7A5C 0%, transparent 40%)`,
            }}
          />

          {/* Decorative Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* Content Area */}
          <div
            ref={contentRef}
            className="relative z-10 text-center w-full max-w-xs md:max-w-2xl lg:max-w-4xl mx-auto"
          >
            <span className="cta-animate block text-[#8BA888] font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 md:mb-6">
              Visit Our Sanctuary
            </span>

            <h2 className="cta-animate text-white font-sans text-4xl md:text-6xl lg:text-8xl leading-[1.1] mb-8 md:mb-10 tracking-tight">
              Come{" "}
              <span className="font-serif italic text-[#FCF9F5]">अनुभव</span>{" "}
              <br className="hidden md:block" /> it yourself
            </h2>

            <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Premium "View Menu" Button - Responsive Sizing
                  Mobile: px-8 py-4 text-sm
                  Tablet (md): px-9 py-4.5 text-base
                  Desktop (lg): px-10 py-5 text-lg
              */}
              <Link 
                to="/menus" 
                className="group relative w-full sm:w-auto px-8 py-4 md:px-9 md:py-4 lg:px-10 lg:py-5 bg-[#FCF9F5] text-stone-900 rounded-full font-medium text-sm md:text-base lg:text-lg overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-black/20 cursor-pointer text-center"
              >
                <span className="relative z-10">View Menu</span>
                <div className="absolute inset-0 bg-[#8BA888] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              </Link>

              {/* Glassmorphism "Get Directions" Button - Responsive Sizing */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Connaught+Place+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-8 py-4 md:px-9 md:py-4 lg:px-10 lg:py-5 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white rounded-full font-medium text-sm md:text-base lg:text-lg transition-all duration-500 hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Directions</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Abstract Detail */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#8BA888]/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default AboutCTA;