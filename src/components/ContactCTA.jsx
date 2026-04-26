import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactCTA = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.fromTo(decorRef.current, 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "expo.out", scrollTrigger: sectionRef.current }
      );

      gsap.from(".cta-content", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: sectionRef.current
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Magnetic Effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.12;
    const y = (clientY - (top + height / 2)) * 0.12;
    gsap.to(buttonRef.current, { x, y, duration: 0.4, ease: "power2.out" });
  };

  const resetPosition = () => {
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 px-6 bg-[#FCF9F5] overflow-hidden">
      {/* DECORATION RESPONSIVENESS: Adjusted rounded corners and max-width for medium screens */}
      <div ref={decorRef} className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 h-full max-w-6xl mx-auto bg-stone-100/50 rounded-[3rem] md:rounded-[60px] lg:rounded-[100px] -z-0" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* TYPOGRAPHY RESPONSIVENESS: Added md:text-5xl and md:mb-8 to prevent font from being too huge on tablets */}
        <h2 className="cta-content text-stone-900 font-serif text-4xl md:text-5xl lg:text-7xl leading-tight mb-8 md:mb-10 tracking-tight">
          Ready to <span className="italic text-[#5d8026]">connect?</span>
        </h2>

        <div className="cta-content flex flex-col items-center">
          <a 
            href="https://wa.me/917004106519"
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPosition}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-3 md:gap-4 px-6 py-4 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-[#1A2E1A] rounded-full shadow-xl transition-shadow duration-300 hover:shadow-2xl active:scale-95"
          >
            {/* TEXT SIZE RESPONSIVENESS: md:text-lg for tablets to maintain visual hierarchy */}
            <span className="text-white font-sans text-base md:text-lg lg:text-xl font-semibold">
              Chat on WhatsApp
            </span>
            
            {/* ICON CONTAINER RESPONSIVENESS: Scaled size for medium screens */}
            <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-white/10 rounded-full">
              <svg className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.139c1.52.907 3.21 1.385 4.931 1.385h.005c5.354 0 9.712-4.358 9.715-9.715.002-2.595-1.01-5.035-2.851-6.876-1.841-1.841-4.282-2.851-6.877-2.851-5.355 0-9.713 4.358-9.715 9.715-.001 1.897.55 3.743 1.593 5.339l-1.018 3.715 3.814-1.002z" />
              </svg>
            </div>
          </a>

          {/* SPACING RESPONSIVENESS: mt-6 md:mt-8 */}
          <p className="mt-6 md:mt-8 text-stone-500 font-sans text-xs md:text-sm tracking-wide italic">
            Quick responses for reservations and queries
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;