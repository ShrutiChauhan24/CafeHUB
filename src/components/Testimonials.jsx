import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from "react-icons/fc";

const testimonials = [
  { name: "Ananya Sharma", rating: 5, text: "The cold brew here is life-changing, Perfectly balanced and the vibe is so calm" },
  { name: "Shima Chaudhary", rating: 4, text: "Best workspace in the city. The sourdough toast and lattes are my daily fuel" },
  { name: "Mayank Mehta", rating: 4, text: "A hidden gem. The aesthetic is beautiful and the staff makes you feel like family" },
  { name: "Sachin Kumar", rating: 4, text: "Incredible attention to detail in every cup, you can taste the quality of the beans" },
  { name: "Priya Patel", rating: 5, text: "The weekend brunch is a must. Love the organic, fresh ingredients they use" },
  { name: "Mohit Kumawat", rating: 5, text: "Minimalist, clean, and great coffee exactly what I was looking for" },
  { name: "Shashikant Roy", rating: 5, text: "Warm atmosphere and even warmer service. The croissants are heavenly" },
  { name: "Rohit Yadav", rating: 3, text: "Modern vibes and consistent quality and my favorite spot for a quick meeting" },
  { name: "Sidesh Kumar", rating: 4, text: "Love the food and staff is so friendly" }
];

const ReviewCard = ({ review, index, isActive, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    animate={{ 
      scale: isMobile ? (isActive ? 1.4 : 0.85) : 1,
      zIndex: isActive ? 20 : 1 
    }}
    whileHover={!isMobile ? { 
      scale: 1.05, // Slightly reduced for tablet safety
      zIndex: 10,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    } : {}}
    className={`bg-white border border-[#68a336]/10 p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] 
                transition-all duration-700 flex flex-col gap-3 md:gap-4 ${isActive ? 'shadow-[0_40px_80px_-20px_rgba(104,163,54,0.3)]' : ''}`}
  >
    <div className="flex justify-between items-start">
      <div className="flex gap-0.5 md:gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="text-[#68a336] text-[10px] md:text-sm">★</span>
        ))}
      </div>
      
         <FcGoogle className="w-4 h-4 md:w-5 md:h-5 opacity-50"/>

    </div>
    
    <p className="text-[#1a2e05]/80 italic leading-relaxed text-[11px] md:text-base lg:text-lg flex-1">
      "{review.text}"
    </p>
    
    <div className="mt-2 pt-4 border-t border-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#68a336]/10 flex items-center justify-center font-bold text-[#68a336] text-[10px] md:text-base">
          {review.name[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#1a2e05] tracking-tight text-[10px] md:text-sm lg:text-base">{review.name}</span>
          <span className="text-[8px] md:text-[10px] text-gray-400 font-medium">Verified Local Guide</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#fcfdfa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-7xl font-black text-[#1a2e05] leading-tight mb-6"
        >
          What Our <span className="text-[#68a336]">Customers</span> Say
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-500 font-medium tracking-wide text-xs md:text-lg max-w-2xl mx-auto"
        >
          Rated <span className="text-[#1a2e05] font-bold">4.5/5</span> on <span className='text-[#1a2e05] font-extrabold underline decoration-[#68a336]'>Google Maps</span>
        </motion.p>
      </div>

      {/* Grid: Unchanged on Desktop (lg:cols-3), Fixed for Tablet (md:cols-2) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-6">
        {testimonials.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} isMobile={false} />
        ))}
      </div>

      {/* Mobile Layout - Strictly Unchanged as per constraints */}
      <div className="md:hidden relative flex items-center justify-center" style={{height:"400px"}}>
        <div className="flex items-center justify-center w-full">
          {testimonials.map((review, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  x: `${(index - activeIndex) * 125}%`,
                  opacity: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute"
                style={{width : "200px"}} 
              >
                <ReviewCard review={review} index={index} isActive={isActive} isMobile={true} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;