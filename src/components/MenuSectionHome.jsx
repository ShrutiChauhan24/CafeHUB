import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const MenuSectionHome = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const { addToCart } = useCart();

  // Restored the staggered entrance logic
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVars = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

 useEffect(() => {
  let isMounted = true;

  const fetchMenu = async () => {
    try {
      const menuQuery = query(
        collection(db, "menus"),
        where("status", "==", true),
        where("categoryStatus", "==", true)
      );

      const menuSnap = await getDocs(menuQuery);

      let menus = menuSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      menus.sort(() => Math.random() - 0.5);

      const finalMenus = menus.slice(0, 8);

      if (isMounted) {
        setMenuItems(finalMenus);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchMenu();

  return () => {
    isMounted = false;
  };
}, []);


  return (
    <section id="menu-section" className="py-20 px-4 md:px-8 lg:px-12 bg-[#fcfbf7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] text-[#89b449] block"
          >
            Handcrafted Flavors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#2d2d2d] tracking-tight leading-tight"
          >
            Our <span className="text-[#89b449] italic">Curated</span> Menu
          </motion.h2>
          <div className="w-10 bg-[#e67e22]/20 mx-auto rounded-full h-[3px]" />
        </div>

        {/* Grid: 3 (Mobile), 4 (Tablet), 5 (Large) */}

        {menuItems.length === 0 ? (
  <div className="flex justify-center items-center py-20">
    <div className="w-10 h-10 border-4 border-[#89b449] border-t-transparent rounded-full animate-spin"></div>
  </div>
)   : (
   <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 lg:gap-10"
        >
          {menuItems.map((item) => {
            return (
              <motion.div
                key={item?.id}
                variants={cardVars} // Restored entrance animation link
                whileHover={{ y: -8 }}
                className="group relative flex flex-col bg-white rounded-3xl p-3 shadow-lg shadow-black/5 border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-[#89b449]/10 hover:border-[#89b449]/20"
              >
                <div className="relative aspect-square h-auto w-full rounded-2xl overflow-hidden mb-4 shadow-[0_8px_16px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col items-center text-center px-1 pb-2 flex-1">
                  {/* Responsive text sizes for Tablet vs Desktop */}
                  <h3 className="text-[11px] md:text-base lg:text-xl font-bold text-[#2d2d2d] leading-tight mb-2 group-hover:text-[#89b449] transition-colors truncate w-full">
                    {item.name}
                  </h3>
                  <p className="text-[10px] md:text-base lg:text-lg font-black text-[#e67e22] tracking-tight">
                    ₹{item.price}
                  </p>

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
                </div>
              </motion.div>
            );
          })}
        </motion.div>
)

}

       

        {/* View All Menu CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Link to="/menus">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(137, 180, 73, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 md:px-12 md:py-4 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] bg-[#89b449] text-white rounded-2xl md:rounded-3xl shadow-xl shadow-[#89b449]/10 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Explore Full Menu</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSectionHome;