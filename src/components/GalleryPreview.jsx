import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const galleryImages = [
   {id: 1, url: 'https://preview.redd.it/cute-aesthetic-cafe-for-a-cozy-date-v0-s9yjbsfpbe1g1.jpg?width=640&crop=smart&auto=webp&s=c57d113576e606b95450f613173acac57530e4ce' },
   { id:2, url: 'https://i.pinimg.com/736x/0f/b3/ef/0fb3efd64520c1c222b62ce521d60f2e.jpg' },
  { id: 3, url: 'https://media.istockphoto.com/id/1369265275/photo/empty-coffee-shop-interior-with-coffee-maker-pastries-and-desserts-at-night-with-neon-lights.jpg?s=612x612&w=0&k=20&c=ZNJg7sBSnuisQDkHpdvkXVT_E3O-uDhrAvavUluBDtA=' },
  { id: 4, url: 'https://imgmediagumlet.lbb.in/media/2020/10/5f902b898c97b6651e531156_1603283849112.jpg' },
  { id: 5, url: 'https://preview.redd.it/cute-aesthetic-cafe-for-a-cozy-date-v0-eekuxmfpbe1g1.jpg?width=640&crop=smart&auto=webp&s=3d2b2cea00074311be06002836178a2bdfffb5ab' },
];

const GalleryPreview = () => {
  const [index, setIndex] = useState(2);

  const nextStep = () => setIndex((prev) => (prev + 1) % galleryImages.length);
  const prevStep = () => setIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section className="py-20 bg-[#fcfdfa] overflow-hidden">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 lg:mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#68a336] font-bold tracking-[0.2em] uppercase text-xs mb-3 block"
        >
          Visual Journey
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a2e05] leading-tight"
        >
          Capturing the <span className="text-[#68a336]">Essence</span>
        </motion.h2>
      </div>

      {/* Gallery Carousel Container */}
      <div className="relative flex items-center justify-center h-[350px] md:h-[450px] lg:h-[550px] w-full">
        <div className="flex items-center justify-center w-full h-full relative">
          <AnimatePresence mode="popLayout">
            {galleryImages.map((item, i) => {
              const distance = i - index;
              const isActive = i === index;

              if (Math.abs(distance) > 2) return null;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1 - Math.abs(distance) * 0.4,
                    scale: isActive ? 1 : 0.75,
                    // FIXED: Removed the complex ternary that caused the token error
                    // Using a standard pixel value that Tailwind handles via container queries
                    x: distance * 220, 
                    zIndex: 10 - Math.abs(distance),
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  // Add a custom style for mobile x-offset without breaking tokens
                  style={{ 
                    x: typeof window !== 'undefined' && window.innerWidth < 768 ? distance * 140 : distance * 240 
                  }}
                  className="absolute cursor-pointer"
                  onClick={() => setIndex(i)}
                >
                  <div className={`
                    relative rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-500
                    w-[200px] h-[280px] md:w-[320px] md:h-[420px] lg:w-[400px] lg:h-[520px]
                    ${isActive ? 'ring-8 ring-[#68a336]/10 shadow-[#68a336]/20' : 'grayscale-[60%] blur-[1px]'}
                  `}>
                    <motion.img
                      src={item.url}
                      alt={`Gallery item ${i}`}
                      className="w-full h-full object-cover"
                      whileHover={isActive ? { scale: 1.08 } : {}}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation & Controls Section */}
      <div className="relative z-50 flex flex-col items-center gap-6 md:gap-8 lg:gap-10 mt-10 md:mt-12 lg:mt-20">
        <div className="flex gap-4">
          <button 
            onClick={prevStep}
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full cursor-pointer border border-[#1a2e05]/10 flex items-center justify-center bg-white text-[#1a2e05] hover:bg-[#68a336] hover:text-white hover:border-[#68a336] transition-all duration-300 shadow-md active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button 
            onClick={nextStep}
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border border-[#1a2e05]/10 flex items-center justify-center cursor-pointer bg-white text-[#1a2e05] hover:bg-[#68a336] hover:text-white hover:border-[#68a336] transition-all duration-300 shadow-md active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>

        <Link to="/gallery">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#568a2d" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 text-base md:px-12 md:py-4 md:text-lg lg:px-14 lg:py-5 lg:text-xl bg-[#1a2e05] text-white rounded-full font-bold shadow-xl shadow-[#1a2e05]/20 flex items-center gap-3 transition-colors duration-300 cursor-pointer"
          >
            Explore Gallery
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default GalleryPreview;