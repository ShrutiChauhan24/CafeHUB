import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const socials = [
  { name: "instagram", url: "https://instagram.com" },
  { name: "facebook", url: "https://facebook.com" },
  { name: "x", url: "https://x.com" },
];

  return (
    <footer className="bg-[#1a2e05] text-[#fcfdfa] pt-16 md:pt-20 lg:pt-24 pb-8 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        {/* Main Grid: 1 col on mobile, 2 on tablet, 12 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-y-16 lg:gap-8 mb-16 md:mb-16 lg:mb-20">
          
          {/* Brand Column - Optimized for md:col-span-2 to let links sit better on tablets */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-4 flex flex-col items-center md:items-start space-y-6 md:space-y-6 lg:space-y-8 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-11 lg:w-12 bg-[#68a336] rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg shadow-[#68a336]/20">
                <span className="text-xl lg:text-2xl font-black rotate-6">C</span>
              </div>
              <span className="text-2xl md:text-2xl lg:text-3xl font-black tracking-tighter">CafeHUB<span className="text-[#68a336]">.</span></span>
            </div>
            <p className="text-[#fcfdfa]/60 text-sm md:text-base lg:text-lg leading-relaxed max-w-xs md:max-w-md lg:max-w-sm">
              Crafting premium coffee experiences in a minimalist sanctuary. Your daily dose of calm.
            </p>
            <div className="flex gap-4">
  {socials.map((social) => (
    <motion.a
      key={social.name}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5, color: '#68a336' }}
      className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 flex items-center justify-center transition-colors hover:border-[#68a336]/40"
    >
      {social.name === 'instagram' && (
        <svg className="w-4 h-4 md:w-5 md:h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9z"/>
          <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
          <circle cx="17.5" cy="6.5" r="1.2"/>
        </svg>
      )}

      {social.name === 'facebook' && (
        <svg className="w-4 h-4 md:w-5 md:h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
        </svg>
      )}

      {social.name === 'x' && (
  <svg
    className="w-4 h-4 md:w-5 md:h-5 text-white/80"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M18.244 2H21l-6.49 7.41L22 22h-6.828l-5.35-7.07L3.5 22H1l6.95-7.94L2 2h6.828l4.86 6.43L18.244 2zm-2.39 18h1.885L8.09 4H6.06l9.793 16z"/>
  </svg>
)}
    </motion.a>
  ))}
</div>
          </motion.div>

          {/* Quick Links - md span 1 for balance */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-2 text-center md:text-left">
            <h4 className="text-[#68a336] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-4 lg:mb-6">Explore</h4>
            <ul className="space-y-3 lg:space-y-4">
  {['Home', 'Menus', 'About', 'Contact'].map((link) => (
    <li key={link}>
      <motion.div whileHover={{ x: 5 }}>
        <Link 
          to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
          className="text-[#fcfdfa]/70 hover:text-white transition-colors text-sm lg:text-base inline-block"
        >
          {link}
        </Link>
      </motion.div>
    </li>
  ))}
</ul>
          </motion.div>

          {/* Opening Hours */}
          <motion.div variants={itemVariants} className="md:col-span-1 lg:col-span-3 text-center md:text-left">
            <h4 className="text-[#68a336] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-4 lg:mb-6">Opening Hours</h4>
            <div className="space-y-3 text-[#fcfdfa]/70 text-sm lg:text-base max-w-[240px] mx-auto md:mx-0">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon — Fri</span>
                <span className="text-white font-medium">08am — 09pm</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Sat — Sun</span>
                <span className="text-white font-medium">09am — 11pm</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-3 text-center md:text-left">
            <h4 className="text-[#68a336] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-4 lg:mb-6">Contact</h4>
            <div className="space-y-4">
              <a href="mailto:cafehub@example.com" className="block group">
                <span className="text-base md:text-lg lg:text-xl font-bold group-hover:text-[#68a336] transition-colors">cafehub@example.com</span>
              </a>
              <a href="tel:+1234567890" className="block group">
                <span className="text-base md:text-lg lg:text-xl font-bold group-hover:text-[#68a336] transition-colors">+1 (234) 567-890</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Optimized spacing for md screens */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-[#fcfdfa]/30 text-[10px] md:text-xs lg:text-sm text-center">
            © {currentYear} Cafe Organic. All rights reserved.
          </p>
          
          <div className="flex gap-6 lg:gap-8">
            <a href="#privacy" className="text-[#fcfdfa]/40 hover:text-[#68a336] text-[10px] md:text-xs lg:text-sm transition-colors">Privacy</a>
            <a href="#terms" className="text-[#fcfdfa]/40 hover:text-[#68a336] text-[10px] md:text-xs lg:text-sm transition-colors">Terms</a>
          </div>

          <motion.button 
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#68a336] cursor-pointer"
          >
            Top
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4.5 15.75l7.5-7.5 7.5 7.5"/></svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;