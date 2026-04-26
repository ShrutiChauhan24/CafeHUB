import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisualSectionAbout = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header
      gsap.from(".visual-header", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".visual-header",
          start: "top 85%",
        }
      });

      // Staggered reveal for cards
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const visuals = [
    {
      title: "The Craft",
      desc: "Every bean is roasted to perfection by our master baristas.",
      img: "https://www.savoryonline.com/app/uploads/recipes/166476/homemade-pizza-dough-640x640-c-center.jpg",
      offset: "md:mt-0 lg:mt-0" // Explicitly keeping lg:mt-0 for desktop
    },
    {
      title: "The Sanctuary",
      desc: "A minimalist space designed for clarity and conversation.",
      img: "https://images.unsplash.com/photo-1550949875-0a43721df876?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM1fHx8ZW58MHx8fHx8",
      offset: "md:mt-12 lg:mt-24" // Reduced offset for tablet height
    },
    {
      title: "The Details",
      desc: "From ceramic mugs to soft acoustics, quality is in the quiet.",
      img: "https://www.nobroker.in/blog/wp-content/uploads/2022/07/Casual-Vibes-Interior-Design-Of-A-cafe.jpg",
      offset: "md:mt-0 lg:mt-12" // Flat on md, staggered on lg
    },
    {
      title: "The Ritual",
      desc: "Slow pour-overs that respect the journey from farm to cup.",
      img: "https://i.pinimg.com/736x/1b/73/99/1b73990bac6ec03b64130b1a03951c6a.jpg",
      offset: "md:mt-12 lg:mt-32" // Reduced offset for tablet height
    }
  ];

  return (
    <section ref={containerRef} className="bg-[#FCF9F5] py-24 md:py-32 lg:py-40 px-6 overflow-hidden">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <div className="visual-header mb-16 md:mb-24 lg:mb-32 max-w-3xl">
          <p className="text-[#5d8026] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4">Aesthetic & Craft</p>
          <h2 className="text-stone-900 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8">
            A glimpse into <span className="italic">our space</span> and the art of the pour.
          </h2>
        </div>

        {/* Visual Grid */}
        {/* Changed: grid-cols-2 for md to avoid cards becoming too skinny on tablets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-start">
          {visuals.map((item, idx) => (
            <div 
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className={`group relative flex flex-col ${item.offset}`}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-2xl group-hover:shadow-[#8BA888]/20 group-hover:-translate-y-2">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="h-full w-full object-cover grayscale-[20%] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="absolute bottom-6 left-6 right-6 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                   <p className="text-white font-serif text-xl md:text-2xl italic">{item.title}</p>
                </div>
              </div>

              {/* Caption */}
              <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
                <h4 className="text-stone-900 font-serif text-xl md:text-2xl group-hover:text-[#8BA888] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed max-w-[240px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#8BA888]/3 rounded-full blur-[150px] -z-10" />
    </section>
  );
};

export default VisualSectionAbout;