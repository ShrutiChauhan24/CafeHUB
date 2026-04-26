import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSectionAbout = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(bgRef.current,
        { scale: 1.15, filter: 'blur(12px) brightness(0.7)' },
        { scale: 1, filter: 'blur(6px) brightness(0.9)', duration: 2.5, ease: "power2.out" }
      );

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      contentTl.fromTo(headingRef.current, 
        { y: 60, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
        "-=1.5"
      )
      .fromTo(lineRef.current,
        { width: 0 },
        { width: "100%", duration: 1.2, ease: "expo.inOut" },
        "-=0.8"
      )
      .fromTo([contentRef.current, quoteRef.current], 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      // Fixed Padding: py-24 for mobile (less cramped), py-12 for md (compact for tablets), lg:py-24 for desktop
      className="relative min-h-screen flex items-center bg-[#FCF9F5] px-6 py-24 md:py-12 lg:py-24 overflow-hidden"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgRef}
          src="https://img.freepik.com/free-photo/3d-rendering-cartoon-welcome-door_23-2151645384.jpg?semt=ais_hybrid&w=740&q=80" 
          alt="Coffee Aesthetic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/70 md:to-transparent" />
      </div>

      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-[#8BA888]/10 rounded-full blur-[120px] z-1" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-16 items-center lg:items-start">
          
          {/* Main Title Area */}
          <div className="lg:col-span-8">
            <p className="text-[#5d8026] font-bold tracking-[0.3em] uppercase text-[10px] md:text-[10px] lg:text-xs mb-3 md:mb-4 block mt-2">
              Our Story
            </p>
            <h1 
              ref={headingRef}
              className="text-white font-serif leading-[1.05] tracking-tight 
                         text-5xl sm:text-7xl md:text-6xl lg:text-9xl italic"
            >
              More Than Just <br /> 
              <span className="not-italic text-[#5d8026]">Coffee.</span>
            </h1>
            
            <div ref={lineRef} className="h-[1px] bg-white/30 mt-6 md:mt-8 lg:mt-12 mb-6 md:mb-8 lg:mb-12" />
          </div>

          {/* Contextual Sidebar */}
          <div className="lg:col-span-4 lg:pt-32">
            {/* Added md:max-w-md to stop text from stretching too far on tablets */}
            <div ref={contentRef} className="space-y-4 md:space-y-5 lg:space-y-8 md:max-w-md lg:max-w-none">
              <div className="space-y-3 md:space-y-4">
                <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
                  We started with a simple idea — to create a space where great coffee meets great conversations.
                </p>
                <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed">
                  Today, we’re a place where people come to relax, connect, and feel at home.
                </p>
              </div>

              <div ref={quoteRef} className="pt-4 md:pt-6 border-t border-white/20">
                <p className="text-white/70 text-[10px] md:text-sm lg:text-base italic leading-relaxed">
                  "A glimpse of our coffee, our space, and the moments we create. Simple, warm, and made for you to enjoy."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden lg:block z-10">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#8BA888] group-hover:text-white group-hover:border-[#8BA888] transition-all duration-500">
            <span className="text-xl text-white">↓</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Scroll to Explore</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionAbout;