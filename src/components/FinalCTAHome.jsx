import React from "react";
import { motion } from "framer-motion";

const FinalCTAHome = () => {
  // Animation variants for a premium GSAP-style reveal
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="relative py-20 md:py-24 lg:py-40 bg-[#fcfdfa] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#68a336]/5 rounded-l-[100px] -z-10" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#68a336]/10 rounded-full blur-[100px] -z-10"
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-24 items-center"
        >
          {/* Left Side: Visual Illustration Area */}
          <motion.div variants={fadeIn} className="relative group">
            <div className="relative z-10 rounded-[2.5rem] md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-2xl shadow-[#1a2e05]/10">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200"
                alt="Cafe ambiance"
                className="w-full h-[350px] md:h-[400px] lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              {/* Glassmorphism Floating Badge */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 p-5 md:p-6 backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl md:rounded-3xl shadow-lg max-w-[180px] md:max-w-[200px]">
                <p className="text-[#1a2e05] font-bold text-xs md:text-sm leading-tight">
                  Your perfect daily escape starts here.
                </p>
              </div>
            </div>
            {/* Outline Decorative Frame */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full border-2 border-[#68a336]/20 rounded-[2.5rem] md:rounded-[3rem] -z-10" />
          </motion.div>

          {/* Right Side: Content & Actions */}
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
            <motion.div variants={fadeIn} className="space-y-4 md:space-y-6">
              <span className="text-[#68a336] font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs lg:text-sm">
                Ready to Sip?
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1a2e05] leading-[1.1] tracking-tight">
                Visit us today for your{" "}
                <span className="text-[#68a336]">perfect</span> coffee break.
              </h2>
            </motion.div>

            {/* Action Buttons - FIX: Use xl:flex-row instead of sm:flex-row to prevent iPad crowding */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col xl:flex-row gap-4 md:gap-5"
            >
              {/* Button: Whatsapp */}
              <motion.a
                href="https://wa.me/917004106519?text=Hi%20I%20want%20to%20book%20a%20table"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 md:px-8 md:py-4 lg:px-10 lg:py-5 bg-[#1a2e05] text-white rounded-full font-bold text-base lg:text-lg overflow-hidden group shadow-xl shadow-[#1a2e05]/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 cursor-pointer">
                  Whatsapp
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {" "}
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />{" "}
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.a>

              {/* Button: Call Now */}
              <motion.a
                href="tel:+918235440001"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#68a336",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 md:px-8 md:py-4 border-2 border-[#1a2e05]/10 text-[#1a2e05] rounded-full font-bold text-base lg:text-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                Call Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />{" "}
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTAHome;