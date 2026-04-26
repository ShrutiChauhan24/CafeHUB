import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSectionAbout = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current, 
        { clipPath: 'inset(10% 10% 10% 10% round 40px)', scale: 1.2, opacity: 0 },
        { 
          clipPath: 'inset(0% 0% 0% 0% round 40px)', 
          scale: 1, 
          opacity: 1, 
          duration: 1.8, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          }
        }
      );

      const lines = textRef.current.querySelectorAll('p');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      tl.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(lines, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      /* REDUCED BOTTOM PADDING:
         - Mobile: pb-12 (was 24)
         - Tablet: md:pb-16 (was 32)
         - Desktop: lg:pb-40 (kept the same for desktop)
      */
      className="relative bg-[#FCF9F5] pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-16 lg:pb-40 px-6 md:px-16 lg:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* REDUCED GAP:
            - Changed gap-12 to gap-8 for mobile/tablet to pull the image and text closer.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
          
          <div className="w-full order-2 lg:order-1">
            <div className="relative group">
              <div 
                ref={imageRef}
                className="relative aspect-[4/3] md:aspect-video lg:aspect-[4/3] w-full overflow-hidden shadow-lg shadow-[#8BA888]/5 rounded-[30px] md:rounded-[40px]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200" 
                  alt="Cafe Experience" 
                  className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="w-full order-1 lg:order-2">
            <div className="max-w-xl md:max-w-2xl lg:max-w-xl mx-auto lg:mx-0">
              <span className="text-[#5d8026] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-2 md:mb-3 block">
                The Atmosphere
              </span>
              
              <h2 
                ref={headingRef}
                className="text-stone-900 font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6"
              >
                The <span className="italic">Experience</span>
              </h2>

              <div ref={textRef} className="space-y-4 md:space-y-5">
                <p className="text-stone-700 text-lg md:text-xl leading-relaxed font-light">
                  Whether you're dropping by for a quick coffee or spending time with friends, our space is designed to feel comfortable and welcoming.
                </p>
                <p className="text-stone-500 text-sm md:text-base lg:text-lg leading-relaxed">
                  From the aroma of freshly brewed coffee to the calm ambiance, every detail is meant to make your visit enjoyable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSectionAbout;