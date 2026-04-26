import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OperatingHoursContact = () => {
  const containerRef = useRef(null);
  const ticketRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      gsap.from(ticketRef.current, {
        y: 120,
        opacity: 0,
        rotateX: -20,
        scale: 0.85,
        transformOrigin: "top center",
        duration: 1.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(".hour-line", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      // Added md:pt-12 md:pb-24 for balanced vertical spacing on medium screens
      className="relative w-full pt-6 pb-20 md:pt-12 md:pb-24 lg:py-32 bg-[#FCF9F5] px-4 md:px-8 lg:px-6 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="max-w-3xl mx-auto">
        <div 
          ref={ticketRef}
          className="relative bg-white border border-stone-100 shadow-2xl shadow-stone-200/40 rounded-3xl overflow-hidden"
        >
          {/* Perforated Edge - Adjusted justify to ensure it looks good on medium widths */}
          <div className="absolute top-0 left-0 w-full h-1.5 flex justify-around px-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-4 h-4 -mt-2 rounded-full bg-[#FCF9F5]" />
            ))}
          </div>

          {/* Adjusted Padding: p-8 (mobile) -> p-12 (tablet/laptop) -> p-16 (large desktop) */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center text-center">
            <span className="hour-line inline-block text-[#5d8026] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-6">
              Brewing Daily
            </span>

            {/* Typography Scaling: text-3xl (mobile) -> text-5xl (medium) -> text-6xl (desktop) */}
            <h2 className="hour-line text-stone-900 font-serif text-3xl md:text-5xl lg:text-6xl mb-8 md:mb-10 leading-tight">
              When we're <span className="italic text-[#5d8026]">open</span>
            </h2>

            <div className="w-full max-w-md space-y-4 md:space-y-6">
              <div className="hour-line flex flex-col md:flex-row justify-between items-center border-b border-stone-50 pb-5">
                <span className="text-stone-400 uppercase tracking-widest text-[9px] md:text-[10px] mb-1 md:mb-0">Monday – Friday</span>
                {/* Time Scaling: text-xl (mobile) -> text-2xl (medium) -> text-3xl (desktop) */}
                <span className="text-stone-900 font-sans text-xl md:text-2xl lg:text-3xl font-light">8:00 AM – 10:00 PM</span>
              </div>

              <div className="hour-line flex flex-col md:flex-row justify-between items-center border-b border-stone-50 pb-5">
                <span className="text-stone-400 uppercase tracking-widest text-[9px] md:text-[10px] mb-1 md:mb-0">Saturday – Sunday</span>
                <span className="text-stone-900 font-sans text-xl md:text-2xl lg:text-3xl font-light">9:00 AM – 11:00 PM</span>
              </div>
            </div>

            <p className="hour-line mt-8 md:mt-10 text-stone-400 text-[10px] md:text-xs italic flex items-center gap-2">
              <span className="text-[#8BA888]">👉</span> Hours may vary on holidays
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperatingHoursContact;