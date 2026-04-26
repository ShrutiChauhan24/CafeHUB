import React from "react";
import { motion } from "framer-motion";

const OrderOnline = () => {
  const deliveryPartners = [
    {
      name: "Zomato",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
      color: "hover:bg-red-50/50",
      delay: 0.1,
    },
    {
      name: "Swiggy",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png",
      color: "hover:bg-orange-50/50",
      delay: 0.2,
    },
    {
      name: "EazyDiner",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmamcOl0V1YhZmEVFMS3ZkXjOqW5Ml2VsWgg&s",
      color: "hover:bg-blue-50/50",
      delay: 0.3,
    },
  ];

  return (
    <section className="pt-4 pb-20 md:pt-8 md:pb-24 lg:pt-20 lg:pb-32 px-6 bg-[#fcfdfa] overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-10 md:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[#68a336] font-semibold tracking-[0.2em] uppercase text-[10px] md:text-sm"
        >
          Fast Delivery
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-3xl md:text-4xl lg:text-6xl font-extrabold text-[#1a2e05] leading-[1.1]"
        >
          Craving Something? <br className="hidden md:block" />
          Order Now
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 lg:gap-10 max-w-6xl mx-auto justify-items-center">
        {deliveryPartners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: partner.delay,
              type: "spring",
              bounce: 0.4,
            }}
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 },
            }}
            onClick={() => {
              const link =
                partner.name === "Zomato"
                  ? "https://www.zomato.com"
                  : partner.name === "Swiggy"
                    ? "https://www.swiggy.com"
                    : "https://www.eazydiner.com";

              window.open(link, "_blank");
            }}
            /* THE FIX FOR RECTANGULAR STRETCH:
               - Added w-full and max-w-[160px] (mobile) / max-w-[240px] (tablet) 
               - Added aspect-square to force a perfect square shape regardless of screen width.
               - justify-items-center on the parent grid ensures these stay centered.
            */
           className={`group relative bg-white border border-gray-100 rounded-[1.5rem] md:rounded-[2.5rem] 
  p-3 md:p-5 lg:p-6 
  flex flex-col items-center justify-center 
  w-full max-w-[140px] md:max-w-[200px] lg:max-w-[240px] aspect-square
  shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-10px_rgba(104,163,54,0.12)]
  transition-all duration-500 cursor-pointer ${partner.color}`}
          >
            <div className="absolute top-0 right-0 -mr-2 -mt-2 w-16 h-16 md:w-32 bg-[#68a336]/5 rounded-full blur-2xl group-hover:bg-[#68a336]/10 transition-colors" />

            <motion.div
              className="relative w-full h-12 md:h-20 lg:h-32 flex items-center justify-center mb-3 md:mb-6 lg:mb-8"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5,
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:rotate-3"
              />
            </motion.div>

            <h3 className="text-xs md:text-lg lg:text-3xl font-bold text-[#1a2e05] tracking-tight group-hover:text-[#68a336] transition-colors text-center">
              {partner.name}
            </h3>

            <div className="mt-2 md:mt-5 w-6 md:w-12 h-1 bg-[#68a336] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OrderOnline;