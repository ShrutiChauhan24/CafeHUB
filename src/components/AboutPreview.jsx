import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutPreview = () => {
  return (
    /* py-16 for mobile, py-24 for tablet/md, py-32 for desktop/lg */
    <section className="relative py-16 md:py-24 lg:py-32 px-6 bg-[#fcfdfa] overflow-hidden">
      {/* FIX: grid-cols-1 for mobile. 
         md:grid-cols-2 for tablet (side-by-side) 
         lg:grid-cols-12 for desktop (original layout)
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#68a336] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 block">
              Our Philosophy
            </span>

            {/* Typography: text-3xl (Mobile), text-4xl (Tablet), text-6xl (Desktop) */}
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#1a2e05] leading-[1.1] mb-6 md:mb-8">
              A cozy corner where <br className="hidden lg:block" /> 
              every cup <span className="text-[#68a336]">tells a story.</span>
            </h2>
            
            {/* Description: base (Mobile), base (Tablet), xl (Desktop) */}
            <div className="space-y-4 text-gray-600 text-base lg:text-xl max-w-xl leading-relaxed">
              <p>We blend rich flavors with a warm, welcoming vibe.</p>
              <p>Whether it’s a quick coffee or a long catch-up,</p>
              <p className="font-medium text-[#1a2e05]">this is your space to relax and feel at home.</p>
            </div>

            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 md:mt-10 px-8 py-3.5 md:px-7 md:py-3 lg:px-10 lg:py-4 bg-[#1a2e05] text-[#fcfdfa] rounded-full font-bold text-base lg:text-lg shadow-xl hover:shadow-[#68a336]/20 transition-all duration-300 cursor-pointer"
              >
                Know Our Story
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Visual Composition */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image: Height is controlled per screen size */}
            <motion.div 
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
              className="relative z-10 rounded-[2.5rem] md:rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
                alt="Cafe Interior"
                className="w-full h-72 md:h-80 lg:h-96 object-cover"
              />
            </motion.div>

            {/* Floating Elements: Responsive positions and visibility */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 md:-top-3 md:-right-3 lg:-top-6 lg:-right-6 z-20 bg-[#68a336] text-white p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-xl hidden sm:block"
            >
              <p className="text-[10px] uppercase tracking-tighter opacity-80">Established</p>
              <p className="text-xl lg:text-2xl font-black italic">2026</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-4 md:-bottom-4 md:-left-4 lg:-bottom-10 lg:-left-6 z-20 bg-white p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-2xl flex items-center gap-3 lg:gap-4 border border-gray-100"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                 <span className="text-xl">☕</span>
              </div>
              <div>
                <p className="text-[#1a2e05] font-bold text-xs lg:text-sm">Perfect Brew</p>
                <div className="flex gap-0.5 lg:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-orange-400 text-[10px] lg:text-xs">★</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Background Blur Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#68a336]/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AboutPreview;