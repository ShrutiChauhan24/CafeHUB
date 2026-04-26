import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuData = {
  Pizza: [
    { id: "pizza-1", name: "Peppy Paneer", price: "₹350", img: "https://blog.eatfit.in/wp-content/uploads/2022/10/original-1200x900.jpg" },
    { id: "pizza-2", name: "Mexican Green Wave", price: "₹599", img: "https://www.kolkatagiftsonline.com/pic/GG09107.jpg" },
    { id: "pizza-3", name: "Paneer Makhani", price: "₹299", img: "https://www.dominos.co.in/files/items/Paneer_Makhni.jpg" },
    { id: "pizza-4", name: "Indi Tandoori Paneer", price: "₹399", img: "https://www.dominos.co.in/files/items/IndianTandooriPaneer.jpg" },
    { id: "pizza-5", name: "Veg Exotica Pizza", price: "₹699", img: "https://5.imimg.com/data5/NV/GU/GLADMIN-61941595/veg-exotica-pizza.png" },
  ],

  Drinks: [
    { id: "drink-1", name: "Orange Fresh", price: "₹199", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLkxvdJ0WcNqfHJNePJymBwshSI6hoy14poQ&s" },
    { id: "drink-2", name: "Lemonade", price: "₹299", img: "https://i.imgur.com/VblgBXf.jpeg" },
    { id: "drink-3", name: "Milk Shake", price: "₹450", img: "https://cdn.uengage.io/uploads/7057/image-669725-1685542615.png" },
    { id: "drink-4", name: "Mojito", price: "₹250", img: "https://agratefulmeal.com/wp-content/uploads/2023/02/blue-mojito-curacao-cocktail-featured.jpg" },
    { id: "drink-5", name: "Lemon-Lime Soda", price: "₹199", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCfHovD4n__vbW67QGaWpft8ZkjF8wli_L-A&s" },
  ],

  Coffee: [
    { id: "coffee-1", name: "Espresso", price: "₹359", img: "https://www.wyseguide.com/wp-content/uploads/2025/07/Shaken-Espresso-011.jpg" },
    { id: "coffee-2", name: "Latte", price: "₹560", img: "https://www.brighteyedbaker.com/wp-content/uploads/2024/07/Dulce-de-Leche-Latte-Recipe.jpg" },
    { id: "coffee-3", name: "Cappuccino", price: "₹199", img: "https://www.shutterstock.com/image-photo/heart-shaped-latte-art-white-600nw-2506388167.jpg" },
    { id: "coffee-4", name: "Raf Coffee", price: "₹299", img: "https://images.slurrp.com/webstories/wp-content/uploads/2023/03/Raf-Coffee1.jpg" },
  ]
};

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState("Pizza");

  return (
    <section className="min-h-screen bg-[#fcfdfa] py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-6 mt-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          <span className="text-[#68a336] font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 block mt-4">
            Crafted with Love
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#1a2e05] tracking-tight">
            Our <span className="text-[#68a336]">Menus.</span>
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 md:mb-16 lg:mb-20 overflow-x-auto pb-4 no-scrollbar">
          <div className="inline-flex bg-white/50 backdrop-blur-sm p-1.5 md:p-2 rounded-full border border-[#1a2e05]/5 shadow-sm">
            {Object.keys(menuData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 md:px-8 lg:px-12 md:py-3 lg:py-4 rounded-full text-[10px] md:text-xs lg:text-sm font-bold tracking-widest uppercase transition-all duration-500 whitespace-nowrap cursor-pointer ${
                  activeTab === tab ? 'text-[#1a2e05]' : 'text-[#1a2e05]/40 hover:text-[#1a2e05]/70'
                }`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#fdeecf] rounded-full shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid: Fixed to 2 cols on mobile, 3 on md (tablets), and 4 on lg (desktop) */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {menuData[activeTab].map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[1rem] md:rounded-[1.5rem] lg:rounded-[2rem] p-2.5 md:p-4 lg:p-5 shadow-sm hover:shadow-2xl hover:shadow-[#68a336]/10 border border-[#1a2e05]/5 transition-all duration-500 flex flex-col items-center text-center"
              >
                {/* Image Layout */}
                <div className="w-full aspect-square rounded-[0.8rem] md:rounded-[1.2rem] lg:rounded-[1.5rem] overflow-hidden mb-3 md:mb-4 lg:mb-6 shadow-md md:shadow-lg group-hover:shadow-[#68a336]/20 transition-all duration-500">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                {/* Typography: Scaled for mobile, tablet (md), and desktop (lg) */}
                <h3 className="text-[10px] md:text-lg lg:text-2xl font-black text-[#1a2e05] mb-1 md:mb-1.5 lg:mb-2 px-1 leading-tight line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-[#f18e1d] font-black text-[10px] md:text-base lg:text-xl">
                  {item.price}
                </p>

                {/* Button: Visible from tablet (md) upwards with adjusted sizing */}
                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="hidden md:block mt-4 lg:mt-6 px-4 py-2 lg:px-6 lg:py-2 bg-[#1a2e05] text-[#fcfdfa] text-[8px] lg:text-[10px] font-bold uppercase tracking-widest rounded-full group-hover:translate-y-0 translate-y-2 transition-all duration-300"
                >
                  Add to Order
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuPage;