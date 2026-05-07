import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menus" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-2 py-4 md:px-6 md:py-6 lg:px-10">
      {/* Main Floating Container */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto"
      >
        {/* Adjusted inner padding for smaller screens (px-2 to px-8) */}
        <div className="relative flex items-center justify-between bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] rounded-2xl px-2 py-2 md:px-6 lg:px-8">
          
          {/* Logo Section - Added mr-auto to push actions to the right if needed */}
          <div className="shrink-0">
            <Link to="/" className="flex items-center gap-1.5 md:gap-2 group">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#89b449] rounded-lg flex items-center justify-center text-white font-bold italic rotate-6 group-hover:rotate-0 transition-transform">
                C
              </div>
              <span className="text-base md:text-xl lg:text-2xl font-bold tracking-tighter text-[#2d2d2d]">
                CafeHUB<span className="text-[#89b449]">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="relative text-[14px] xl:text-[15px] font-medium text-gray-600 hover:text-[#2d2d2d] transition-colors duration-300 group"
              >
                {link.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 bg-[#89b449] transition-all duration-300 group-hover:w-full"
                  style={{ height: "2px" }}
                />
              </Link>
            ))}
          </div>

          {/* Action Area - Reduced gap for mobile (gap-1.5) */}
          <div className="flex items-center gap-1.5 md:gap-3 lg:gap-4">
            
            {/* Book a Table - Optimized for all screens */}
            <button
              onClick={() => {
                window.open(
                  "https://wa.me/917004106519?text=Hi%2C%20I%E2%80%99d%20like%20to%20reserve%20a%20table.%0A%0AName%3A%0APhone%3A%0ADate%3A%0ATime%3A%0ANumber%20of%20Guests%3A%0ASpecial%20Request%20(if%20any)%3A",
                  "_blank",
                );
              }}
              className="flex items-center gap-1.5 px-3 py-2.5 md:px-6 md:py-3 bg-[#89b449] text-white rounded-xl font-bold text-[10px] sm:text-xs md:text-sm shadow-lg shadow-[#89b449]/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <MessageCircle size={14} className="md:w-[18px] md:h-[18px]" />
              <span>Book a Table</span>
            </button>

            {/* WhatsApp - Only visible on LG+ to keep mobile bar clean */}
            <motion.a
              href="https://wa.me/917004106519?text=Hi%20I%20want%20to%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-3 bg-[#25D366]/10 text-[#075E54] rounded-xl font-bold text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300 whitespace-nowrap"
            >
              <span>WhatsApp</span>
            </motion.a>

            {/* Hamburger - Sized to prevent overflow */}
            <button
              className="lg:hidden p-2 text-gray-800 bg-gray-50 rounded-lg flex-shrink-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 mx-auto max-w-sm bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-3xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col p-6 gap-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold text-[#2d2d2d] hover:text-[#89b449] transition-colors pb-2 border-b border-gray-50 block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400 ml-1">
                  Actions
                </p>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/", { state: { scrollTo: "order-online" } });
                  }}
                  className="w-full py-4 bg-[#89b449] text-white rounded-2xl font-bold shadow-lg text-center"
                >
                  Order Online
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-[#2d2d2d] text-white rounded-2xl font-bold shadow-lg"
                >
                  Check Instagram Feed
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;