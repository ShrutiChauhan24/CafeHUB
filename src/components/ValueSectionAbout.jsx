import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ValueSectionAbout = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        }
      });

      // Cards staggered reveal
      gsap.fromTo(cardsRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const values = [
    {
      title: "Quality Ingredients",
      desc: "Gorgeously good for you, sourced from ethical local farms.",
      icon: "☕",
      color: "bg-orange-50"
    },
    {
      title: "Cozy Atmosphere",
      desc: "Designed to be your third home—warm, quiet, and inviting.",
      icon: "🏡",
      color: "bg-blue-50"
    },
    {
      title: "Community First",
      desc: "A space where conversations spark and friendships grow.",
      icon: "🤝",
      color: "bg-stone-100"
    },
    {
      title: "Fresh & Thoughtful",
      desc: "Prepared daily with intention, from our kitchen to your table.",
      icon: "🌱",
      color: "bg-green-50"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      // Fixed: py-24 for mobile (less cramped), md:py-20 for tablet (more compact), lg:pt-12 for desktop
      className="relative bg-[#FCF9F5] py-24 md:py-20 lg:pt-12 lg:pb-32 px-6 overflow-hidden border-t border-stone-100"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start mb-12 md:mb-16">
          
          {/* Section Header */}
          <div className="lg:col-span-4" ref={headingRef}>
            {/* Adjusted typography: md:text-4xl keeps it balanced on tablets */}
            <h2 className="text-stone-900 font-serif text-3xl md:text-4xl lg:text-6xl leading-tight">
              What We <br /> <span className="italic text-[#5d8026]">Stand For</span>
            </h2>
            <p className="mt-4 text-stone-500 text-base md:text-base lg:text-lg font-light max-w-xs">
              Rooted in purity and tradition, no compromise.
            </p>
          </div>

          {/* Values Grid */}
          <div className="lg:col-span-8">
            {/* Fixed: md:gap-x-12 and md:gap-y-12 for a cleaner tablet look */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-16 md:gap-x-12 md:gap-y-12">
              {values.map((value, idx) => (
                <div 
                  key={idx}
                  ref={el => cardsRef.current[idx] = el}
                  className="group flex flex-col items-start"
                >
                  {/* Icon size: md:w-14 is the "sweet spot" for tablets */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full ${value.color} flex items-center justify-center text-2xl md:text-2xl lg:text-3xl mb-4 md:mb-5 lg:mb-6 
                                  transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#8BA888]/10`}>
                    <span className="group-hover:animate-pulse">{value.icon}</span>
                  </div>

                  <h3 className="text-stone-900 font-bold text-lg md:text-lg lg:text-xl mb-1 md:mb-2 tracking-tight">
                    {value.title}
                  </h3>
                  
                  <p className="text-stone-500 leading-relaxed font-light text-sm md:text-sm lg:text-lg max-w-xs">
                    {value.desc}
                  </p>

                  <div className="mt-3 md:mt-4 h-[2px] w-0 bg-[#8BA888] transition-all duration-500 group-hover:w-10" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ValueSectionAbout;