import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StorySectionAbout = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line Drawing Animation
      gsap.fromTo(lineRef.current, 
        { strokeDashoffset: 1000, strokeDasharray: 1000 },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 1,
          }
        }
      );

      // Staggered Text Reveal
      const sections = gsap.utils.toArray('.story-content');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#FCF9F5] py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
      <div ref={triggerRef} className="container mx-auto max-w-6xl relative">
        
        {/* Central Animated Line (Desktop/Tablet Only) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px hidden md:block">
          <svg width="2" height="100%" className="h-full">
            <line 
              ref={lineRef}
              x1="1" y1="0" x2="1" y2="100%" 
              stroke="#8BA888" 
              strokeWidth="2" 
              strokeDasharray="1000" 
              strokeDashoffset="1000"
            />
          </svg>
        </div>

        {/* Story Chapter 1: How it started */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-24 md:mb-28 lg:mb-32 items-center">
          <div className="story-content md:text-right order-1 md:pr-8 lg:pr-0">
            <h3 className="text-[#5d8026] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">01. How it started</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              A Passion <br /> <span className="italic">for the Bean</span>
            </h2>
          </div>
          <div className="story-content order-2 md:pl-12">
            <p className="text-stone-600 text-lg md:text-lg lg:text-xl font-light leading-relaxed max-w-md">
              What began as a small passion for brewing the perfect cup in a tiny kitchen has grown into a cozy neighborhood sanctuary. We spent years sourcing the finest beans before ever opening our doors.
            </p>
          </div>
        </div>

        {/* Story Chapter 2: Why it started */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 mb-24 md:mb-28 lg:mb-32 items-center">
          <div className="story-content order-2 md:order-1 md:pr-12 md:text-right">
            <p className="text-stone-600 text-lg md:text-lg lg:text-xl font-light leading-relaxed max-w-md ml-auto">
              We realized that cities were getting faster, but people were getting lonelier. We started this cafe to slow time down—to create a space where great coffee meets great conversations.
            </p>
          </div>
          <div className="story-content order-1 md:order-2 md:pl-8 lg:pl-0">
            <h3 className="text-[#5d8026] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">02. Why it started</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              Creating <br /> <span className="italic">Connection</span>
            </h2>
          </div>
        </div>

        {/* Story Chapter 3: What makes us different */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div className="story-content md:text-right order-1 md:pr-8 lg:pr-0">
            <h3 className="text-[#5d8026] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">03. What makes it different</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-stone-900 leading-tight">
              Simple, Warm, <br /> <span className="italic">Made for You</span>
            </h2>
          </div>
          <div className="story-content order-2 md:pl-12">
            <p className="text-stone-600 text-lg md:text-lg lg:text-xl font-light leading-relaxed max-w-md">
              Every detail, from the ethically sourced beans to the handmade ceramic mugs and the soft acoustics of our space, is designed to give you a comforting, premium experience that feels like home.
            </p>
          </div>
        </div>

      </div>
      
      {/* Subtle Background Text Layer */}
      <div className="absolute left-0 w-full text-center opacity-[0.03] pointer-events-none select-none overflow-hidden hidden lg:block">
        <span className="text-[20vw] font-serif font-bold text-stone-900 whitespace-nowrap">
          CafeHub
        </span>
      </div>
    </section>
  );
};

export default StorySectionAbout;