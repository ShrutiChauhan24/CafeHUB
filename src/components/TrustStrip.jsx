import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Coffee } from 'lucide-react';

const TrustStrip = () => {
  const containerVars = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.15,
      },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const trustItems = [
    {
      icon: <MapPin className="text-[#89b449]" size={24} />,
      title: "Visit Us",
      desc: "New Delhi, India",
    },
    {
      icon: <Clock className="text-[#89b449]" size={24} />,
      title: "Opening Hours",
      desc: "08:00 AM - 10:00 PM",
    },
    {
      icon: <Coffee className="text-[#89b449]" size={24} />,
      title: "Our Specialty",
      desc: "Cold Coffee",
    },
  ];

  return (
    <section className="relative w-full py-12 px-4 md:px-10">
      <motion.div
        variants={containerVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto"
      >
        {/* Floating Glass Container - Restored original styling */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2.5rem] p-8 md:p-10 lg:p-12 items-center overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#89b449]/5 rounded-full blur-3xl -mr-16 -mt-16" />

          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVars}
              /* Restored 'group' class for hover animations */
              className={`relative flex flex-col items-center text-center px-4 group ${
                index !== trustItems.length - 1 ? "md:border-r border-gray-100" : ""
              }`}
            >
              {/* Icon Wrapper - Restored original group-hover transition */}
              <div className="mb-4 p-4 rounded-2xl bg-[#f8faf4] group-hover:bg-[#89b449]/10 transition-colors duration-500">
                {item.icon}
              </div>

              {/* Typography Hierarchy - Added tablet-specific scaling (md:text-...) */}
              <h3 className="text-xs md:text-[10px] lg:text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
                {item.title}
              </h3>
              <p className="text-xl md:text-lg lg:text-2xl font-bold text-[#2d2d2d] leading-tight tracking-tight">
                {item.desc}
              </p>

              {/* Subtle Hover Detail - Restored original animation logic */}
              <div className="mt-4 w-0 bg-[#89b449]/30 transition-all duration-500 group-hover:w-12" 
                style={{height:"2px"}}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TrustStrip;