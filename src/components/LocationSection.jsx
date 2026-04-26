import React from 'react';
import { motion } from 'framer-motion';

const LocationSection = () => {
  // Animation variants for the "GSAP-style" reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-[#fcfdfa] overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Header - Premium Typography Hierarchy */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <motion.span 
            variants={itemVariants}
            className="text-[#68a336] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block"
          >
            Visit Our Space
          </motion.span>
          <motion.h2 
            variants={itemVariants}
         
            className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1a2e05] leading-[0.9] tracking-tight"
          >
            Find Us <span className="text-[#68a336]">Here.</span>
          </motion.h2>
        </div>

        {/* Main Content Grid */}
        {/* FIX: Uses 2 columns on tablet (md:grid-cols-2) and 12 columns on desktop (lg:grid-cols-12) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-8 items-stretch">
          
          {/* Left Side: Information Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#1a2e05]/5 p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] shadow-sm hover:shadow-xl hover:shadow-[#68a336]/5 transition-all duration-500"
          >
            <div>
              {/* FIX: Scaled heading for tablet (md:text-2xl) */}
              <h3 className="text-2xl md:text-2xl lg:text-3xl font-bold text-[#1a2e05] mb-6">Address</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#68a336]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#68a336]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  {/* FIX: Scaled address text (md:text-base) */}
                  <p className="text-[#1a2e05]/70 text-base lg:text-lg leading-relaxed">
                    Connaught Place,<br />
                    New Delhi, India
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#68a336]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#68a336]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  {/* FIX: Scaled time text (md:text-base) */}
                  <div className="text-[#1a2e05]/70 text-base lg:text-lg">
                    <p>Mon – Fri: 08:00 AM – 09:00 PM</p>
                    <p>Sat – Sun: 09:00 AM – 11:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href="https://www.google.com/maps?q=Connaught+Place+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
             
              className="mt-10 lg:mt-12 w-full md:w-max px-8 py-4 md:px-7 md:py-4 lg:px-10 lg:py-5 bg-[#1a2e05] text-white rounded-full font-bold text-center text-base lg:text-lg shadow-lg shadow-[#1a2e05]/20 flex items-center justify-center gap-3 hover:bg-[#68a336] transition-colors"
            >
              Get Directions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
            </motion.a>
          </motion.div>

          {/* Right Side: Map Section */}
          <motion.div 
            variants={itemVariants}
       
            className="lg:col-span-7 relative h-[400px] md:h-[450px] lg:h-auto min-h-[400px] rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[3.5rem] overflow-hidden border border-[#1a2e05]/5 group shadow-2xl"
          >
            <iframe
              title="Cafe Location"
              src="https://maps.google.com/maps?q=Connaught+Place+Delhi&z=15&output=embed"
              className="w-full h-full grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            
            <div className="absolute top-6 right-6 px-4 py-2 backdrop-blur-md bg-white/70 border border-white/20 rounded-full shadow-sm pointer-events-none">
              <span className="text-[10px] font-bold text-[#1a2e05] uppercase tracking-widest">Live View</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#68a336]/5 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

export default LocationSection;