import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRefs.current, 
        { y: 60, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
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

  const contactData = [
    {
      label: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      label: "Email",
      value: "hello@cafename.com",
      link: "mailto:hello@cafename.com",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: "Address",
      value: "Connaught Place, New Delhi, India",
      link: "https://maps.google.com",
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="bg-[#FCF9F5] pt-12 pb-20 md:py-20 lg:py-32 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {contactData.map((item, idx) => (
            <div
              key={idx}
              ref={el => cardRefs.current[idx] = el}
              // Fixed horizontal padding (px-6 md:px-4) to prevent text clipping
              className={`group relative bg-white border border-stone-100 p-8 px-6 md:p-10 md:px-4 lg:p-12 xl:p-14 rounded-[2rem] flex flex-col items-center justify-center text-center h-full transition-all duration-500 hover:shadow-2xl hover:shadow-[#8BA888]/10 hover:-translate-y-2 overflow-hidden ${
                idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="absolute inset-0 bg-[#8BA888] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
              
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl bg-stone-50 text-[#5d8026] flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>

              <span className="text-[#5d8026] font-bold uppercase tracking-[0.2em] text-[9px] md:text-[10px] lg:text-xs mb-3">
                {item.label}
              </span>
              
              <a 
                href={item.link} 
                /* NO-WRAP FIX: Added 'whitespace-nowrap' for Phone/Email (idx 0 & 1).
                   TEXT SCALING: Adjusted md:text sizes so it fits perfectly on tablets.
                */
                className={`text-stone-900 font-serif leading-snug hover:text-[#8BA888] transition-colors duration-300 px-1
                  ${idx !== 2 ? "whitespace-nowrap" : ""} 
                  text-lg md:text-[1.15rem] lg:text-xl xl:text-3xl`}
                target={idx === 2 ? "_blank" : undefined}
                rel="noreferrer"
              >
                {item.value}
              </a>

              <div className="mt-6 lg:mt-8 h-[1px] w-8 bg-stone-200 transition-all duration-500 group-hover:w-16 group-hover:bg-[#8BA888]/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;