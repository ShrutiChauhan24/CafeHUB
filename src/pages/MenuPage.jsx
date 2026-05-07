import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';

const MenuPage = () => {
const [menuData, setMenuData] = useState({});
const [activeTab, setActiveTab] = useState("");
const [loading, setLoading] = useState(true);
const {setIsCartOpen,addToCart,cartItems} = useCart();


useEffect(() => {
  const fetchData = async () => {
    try {

      const menuSnap = await getDocs(
        query(
          collection(db, "menus"),
          where("status", "==", true),
          where("categoryStatus", "==", true)
        )
      );

      const groupedMenus = {};

      menuSnap.forEach((doc) => {
        const menu = doc.data();

        const categoryName = menu.categoryName;

        if (!groupedMenus[categoryName]) {
          groupedMenus[categoryName] = [];
        }

        groupedMenus[categoryName].push({
          id: doc.id,
          ...menu,
        });
      });

      setMenuData(groupedMenus);

      const firstCategory = Object.keys(groupedMenus)[0];

      if (firstCategory) {
        setActiveTab(firstCategory);
      }

      setLoading(false);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  fetchData();
}, []);

const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
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
            {menuData[activeTab]?.map((item,index) => (
              <motion.div
                key={item?.id}
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
                    src={item?.image} 
                    alt={item?.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                {/* Typography: Scaled for mobile, tablet (md), and desktop (lg) */}
                <h3 className="text-[10px] md:text-lg lg:text-2xl font-black text-[#1a2e05] mb-1 md:mb-1.5 lg:mb-2 px-1 leading-tight line-clamp-2">
                  {item?.name}
                </h3>
                <p className="text-[#f18e1d] font-black text-[10px] md:text-base lg:text-xl">
                  ₹{item?.price}
                </p>

                {/* Button: Visible from tablet (md) upwards with adjusted sizing */}
                <div className="mt-auto pt-4 w-full flex justify-center">
                 <motion.button
                   whileHover={{ 
                     scale: 1.05,
                     boxShadow: "0 10px 20px rgba(137,180,73,0.15)" 
                   }}
                   whileTap={{ scale: 0.95 }}
                   className="
                     group/btn
                     flex items-center justify-center gap-2
                     w-full md:w-[85%]
                     px-3 py-2 md:py-2.5
                     /* Base Style: Clean & Minimal */
                     bg-white border-[1.5px] border-[#89b449]/30 
                     text-[#89b449] text-[10px] md:text-xs font-black tracking-widest
                     rounded-xl md:rounded-2xl
                     transition-all duration-300 ease-out
                     /* Hover Style: Solid & Premium */
                     hover:bg-[#89b449] hover:border-[#89b449] hover:text-white cursor-pointer
                   "
                    onClick={() =>{
                          addToCart(item)
                          toast.success("Added to cart");
                         }}
                 >
                   <span className="relative z-10">Add</span>
                   
                   {/* Icon rotates slightly on hover for a modern touch */}
                   <svg 
                     className="w-3 h-3 md:w-4 md:h-4 stroke-[3px] transition-transform duration-300 group-hover/btn:rotate-90" 
                     fill="none" 
                     viewBox="0 0 24 24" 
                     stroke="currentColor"
                   >
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                   </svg>
                 </motion.button>
               </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>


      
      {/* FLOATING CART - Positioned at Bottom Right */}
<div
  className="
  fixed 
  bottom-6 
  right-4 
  md:bottom-8 
  md:right-8 
  lg:right-12 
  z-[999]
  "
>
  <button
    onClick={() => setIsCartOpen(true)}
    className="
      group
      relative 
      flex flex-col items-center
      cursor-pointer
    "
  >
    
    {/* Soft Glow */}
    <span
      className="
        absolute inset-0 rounded-full
        bg-[#79A206]/20 blur-xl
        scale-110
        opacity-70
        transition-all duration-500
        group-hover:scale-125
        group-hover:opacity-100
      "
    />

    {/* Main Button */}
    <div
      className="
        relative
        flex items-center justify-center 
        w-15 h-15 md:w-16 md:h-16
        bg-[#79A206]
        border border-white/20
        rounded-full 
        shadow-[0_10px_30px_rgba(121,162,6,0.45)]
        transition-all duration-300
        group-hover:scale-110
        group-hover:-translate-y-1
        active:scale-95
      "
      style={{
        animation: "floatCart 2.8s ease-in-out infinite"
      }}
    >
      <svg
        className="
          h-7 w-7 text-white
          transition-transform duration-300
          group-hover:scale-110
        "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Badge */}
      <span
        className="
          absolute -top-1 -right-1
          h-6 w-6
          flex items-center justify-center
          rounded-full
          bg-white
          text-[#2a1d15]
          text-[11px]
          font-black
          shadow-md
        "
      >
        {totalItems}
      </span>
    </div>

    {/* Label */}
    <span
      className="
        mt-2
        text-[#79A206]
        text-[10px]
        font-bold
        uppercase
        tracking-[0.2em]
        transition-all duration-300
        group-hover:text-[#69881b]
      "
    >
      Cart
    </span>
  </button>
</div>
    </section>
  );
};

export default MenuPage;