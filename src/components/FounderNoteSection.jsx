import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderNoteSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, 
        { scale: 1.2, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.8, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      const lines = textRef.current.querySelectorAll('.animate-line');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      });

      tl.from(headingRef.current, {
        y: 40,
        opacity: 0,
        rotateX: -15,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(lines, {
        y: 25,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      /* FIX 1: Increased horizontal padding on md screens (px-12 to px-16) 
         to ensure text doesn't touch the viewport edges on iPad.
      */
      className="relative bg-[#FCF9F5] pt-4 pb-24 md:pt-6 md:pb-32 lg:pt-20 lg:pb-40 px-6 md:px-16 lg:px-12 overflow-hidden border-t border-stone-100"
    >
      <div className="container mx-auto max-w-7xl">
        {/* FIX 2: Changed from lg:grid-cols-12 to xl:grid-cols-12.
           On iPad Pro (1024px), the items will now stack vertically which prevents cropping.
           If you want to keep them side-by-side, we use lg:gap-12 instead of 24 to save space.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-12 xl:gap-24 items-center">
          
          {/* Visual Media (Left Side) - Moved to top for mobile/tablet stacking order */}
          <div className="lg:col-span-1 xl:col-span-6 order-2 lg:order-1">
            <div className="max-w-xl lg:max-w-full mx-auto lg:mx-0">
              <div className="relative group">
                <div 
                  ref={imageRef}
                  className="relative aspect-[4/5] md:aspect-video lg:aspect-[4/5] w-full overflow-hidden shadow-2xl shadow-[#8BA888]/10 rounded-[40px]"
                >
                  <img 
                    src="https://i.pinimg.com/originals/60/5b/9b/605b9b86a82dd0147ed8aa612381326f.jpg" 
                    alt="Cafe Founder Portrait" 
                    className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#8BA888]/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>

          {/* Narrative Content (Right Side) */}
          <div className="lg:col-span-1 xl:col-span-6 order-1 lg:order-2">
            <div className="max-w-xl lg:max-w-full mx-auto lg:mx-0">
              <span className="text-[#5d8026] font-bold uppercase tracking-[0.3em] text-[10px] md:text-[11px] mb-3 md:mb-5 block">
                A Note from the Founder
              </span>
              
              <h2 
                ref={headingRef}
                /* FIX 3: Reduced text size slightly on lg (tablet) to prevent overflow */
                className="text-stone-900 font-serif text-3xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6 md:mb-10"
              >
                A space <br /> <span className="italic">built with passion</span>
              </h2>

              <div ref={textRef} className="space-y-4 md:space-y-6">
                <p className="animate-line text-stone-700 text-lg md:text-xl xl:text-2xl leading-relaxed font-light">
                  This cafe is more than a business to us — it’s a space built with passion and care.
                </p>
                <p className="animate-line text-stone-500 text-sm md:text-base xl:text-lg leading-relaxed">
                  From the first cup to every conversation shared here, we’ve always wanted it to feel like a place <span className="text-[#5d8026] font-medium border-b border-[#8BA888]/50 pb-1">you belong.</span>
                </p>
                
                <div className="animate-line pt-6 md:pt-10 flex items-center gap-5">
                  <div className="h-[1px] w-12 bg-stone-300" />
                  <div>
                    <p className="text-stone-900 font-serif text-lg italic">Amit</p>
                    <p className="text-stone-400 text-xs uppercase tracking-wider mt-1">Flavoro Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-[#8BA888]/3 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
};

export default FounderNoteSection;