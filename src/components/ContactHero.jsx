import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// const ContactHero = () => {
//   const containerRef = useRef(null);
//   const headingRef = useRef(null);
//   const subtextRef = useRef(null);
//   const bgImageRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline();

//       // Clearer entrance: less initial blur, faster zoom
//       tl.fromTo(bgImageRef.current,
//         { scale: 1.1, filter: 'blur(8px) brightness(0.6)' },
//         { scale: 1, filter: 'blur(2px) brightness(0.85)', duration: 2, ease: "power2.out" }
//       );

//       tl.fromTo(headingRef.current,
//         { y: 80, opacity: 0, skewY: 4 },
//         { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: "expo.out" },
//         "-=1.5"
//       );

//       tl.fromTo(subtextRef.current,
//         { y: 20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
//         "-=1"
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section 
//       ref={containerRef} 
//       /* RESPONSIVE HEIGHT: 
//          Kept min-h-[75vh] for mobile and min-h-[90vh] for large desktop.
//          Added md:min-h-[80vh] to keep tablet proportions balanced.
//       */
//       className="relative w-full min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-12 overflow-hidden bg-stone-900"
//     >
//       {/* Background Image Layer */}
//       <div className="absolute inset-0 z-0">
//         <img 
//           ref={bgImageRef}
//           src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
//           alt="Cafe Interior"
//           className="w-full h-full object-cover opacity-90" 
//         />
        
//         <div className="absolute inset-0 z-1 bg-black/30" /> 
//         <div className="absolute inset-0 z-2 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/80" />
//       </div>

//       {/* Subtle Grain for Premium Feel */}
//       <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-3 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

//       <div className="container mx-auto max-w-7xl relative z-10 text-center">
//         {/* Top Detail */}
//         <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
//           <div className="h-[1px] w-12 bg-white/40" />
//           <span className="text-white/80 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
//             Connect With Us
//           </span>
//           <div className="h-[1px] w-12 bg-white/40" />
//         </div>

//         {/* Heading Fix:
//             - Mobile: text-6xl
//             - Tablet (md): text-7xl to 8xl
//             - Laptop (lg): text-9xl
//             - Big Desktop (xl): text-[11rem]
//             This prevents the 'Visit Us' from hitting the edges on iPad Pro.
//         */}
//         <div className="overflow-hidden mb-6 md:mb-8">
//           <h1 
//             ref={headingRef}
//             className="text-white font-serif text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] leading-[0.9] md:leading-[0.85] tracking-tighter drop-shadow-2xl"
//           >
//             Visit <span className="italic text-[#5d8026]">Us</span>
//           </h1>
//         </div>

//         {/* Subtext Fix:
//             Constrained width on medium screens to keep lines readable and centered.
//         */}
//         <div className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4">
//           <p 
//             ref={subtextRef}
//             className="text-white/90 text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed drop-shadow-lg"
//           >
//             We’d love to hear from you or welcome you in person. <br className="hidden md:block" />
//             Reach out or drop by for a great coffee experience.
//           </p>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
//         <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
//       </div>
//     </section>
//   );
// };

// export default ContactHero;









// ... keep imports same

const ContactHero = () => {
    const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const bgImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Clearer entrance: less initial blur, faster zoom
      tl.fromTo(bgImageRef.current,
        { scale: 1.1, filter: 'blur(8px) brightness(0.6)' },
        { scale: 1, filter: 'blur(2px) brightness(0.85)', duration: 2, ease: "power2.out" }
      );

      tl.fromTo(headingRef.current,
        { y: 80, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.5, ease: "expo.out" },
        "-=1.5"
      );

      tl.fromTo(subtextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      /* FIX: Changed min-height to 100vh (h-screen) across all devices.
         This ensures the background always fills the entire screen, 
         preventing the "half-screen" look where the white section below peeks in.
      */
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-12 overflow-hidden bg-stone-900"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
          alt="Cafe Interior"
          className="w-full h-full object-cover opacity-90" 
        />
        
        <div className="absolute inset-0 z-1 bg-black/40" /> {/* Slightly darker for mobile readability */}
        <div className="absolute inset-0 z-2 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/90" />
      </div>

      {/* Subtle Grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-3 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="container mx-auto max-w-7xl relative z-10 text-center">
        {/* Top Detail */}
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
          <div className="h-[1px] w-8 md:w-12 bg-white/40" />
          <span className="text-white/80 font-bold uppercase tracking-[0.4em] text-[9px] md:text-xs">
            Connect With Us
          </span>
          <div className="h-[1px] w-8 md:w-12 bg-white/40" />
        </div>

        {/* Heading */}
        <div className="overflow-hidden mb-6 md:mb-8">
          <h1 
            ref={headingRef}
            /* MOBILE TWEAK: Using text-5xl for very narrow 360px phones (like S8+) 
               to ensure "Visit Us" doesn't wrap awkwardly.
            */
            className="text-white font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] leading-[1.1] md:leading-[0.85] tracking-tighter drop-shadow-2xl"
          >
            Visit <span className="italic text-[#5d8026]">Us</span>
          </h1>
        </div>

        {/* Subtext */}
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-2 md:px-4">
          <p 
            ref={subtextRef}
            className="text-white/90 text-sm md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed drop-shadow-lg"
          >
            We’d love to hear from you or welcome you in person. <br className="hidden md:block" />
            Reach out or drop by for a great coffee experience.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
      </div>
    </section>
  );
};

export default ContactHero;