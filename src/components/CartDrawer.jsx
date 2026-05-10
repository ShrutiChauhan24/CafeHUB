import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, setCartItems} = useCart();

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const generateWhatsAppMessage = () => {
  if (!cartItems.length) return "No items in cart";

  let message = "🛒 *New Order*\n\n";

  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `Qty: ${item.qty}\n`;
    message += `Price: ₹${item.price}\n`;
    message += `Total: ₹${item.price * item.qty}\n\n`;
  });

  message += `*Grand Total:* ₹${subtotal.toFixed(2)}\n`;
  message += "\nThank you!";

  return encodeURIComponent(message);
};

const sendToWhatsApp = () => {
  const phoneNumber = "917004106519";
  const message = generateWhatsAppMessage();

  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
};

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* BACKGROUND DIMMING & OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={()=>setIsCartOpen(false)}
            className="fixed inset-0 bg-[#1a2e05]/40 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* CART DRAWER */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] md:w-[500px] bg-[#fcfdfa] z-[101] shadow-[-20px_0_50px_rgba(26,46,5,0.1)] flex flex-col"
          >
            {/* HEADER */}
            <div className="p-6 md:p-8 flex justify-between items-center border-b border-[#1a2e05]/5">
              <div>
                <span className="text-[#68a336] font-bold tracking-[0.2em] uppercase text-[10px] block mb-1">Review Your Items</span>
                <h2 className="text-2xl md:text-3xl font-black text-[#1a2e05] tracking-tight">Your Order Summary</h2>
              </div>
              <button 
                onClick={()=>setIsCartOpen(false)}
                className="w-10 h-10 rounded-full border border-[#1a2e05]/10 flex items-center justify-center text-[#1a2e05] hover:bg-[#1a2e05] hover:text-white transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* ITEM LIST */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 no-scrollbar">
              {cartItems?.length > 0 ? (
                cartItems?.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 md:gap-6 group"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm md:text-lg font-black text-[#1a2e05] leading-tight mb-1">{item.name}</h3>
                          <p className="text-[#68a336] font-bold text-xs md:text-sm">₹{item.price.toFixed(2)} / each</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#1a2e05]/30 hover:text-red-500 transition-colors"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        {/* QTY CONTROLS */}
                        <div className="flex items-center bg-white border border-[#1a2e05]/10 rounded-full p-1 shadow-sm">
                          <button disabled={item.qty === 1} onClick={() => updateQty(item.id, -1)} className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-[#1a2e05] font-bold  ${item.qty === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50"}`}>-</button>
                          <span className="w-6 md:w-8 text-center text-xs md:text-sm font-black text-[#1a2e05]">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-gray-50 text-[#1a2e05] font-bold">+</button>
                        </div>
                        <span className="text-sm md:text-lg font-black text-[#1a2e05]">
                          ₹{(item.price * item.qty).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#1a2e05]/5 rounded-full flex items-center justify-center mb-4 text-[#1a2e05]/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 2 3.05 11.62C9.39 14.85 10.5 16 11.9 16h5.85c1.3 0 2.44-.95 2.67-2.23L22 7H6"/><path d="M9 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm9 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
                  </div>
                  <p className="text-[#1a2e05]/40 font-bold uppercase tracking-widest text-xs">Empty Table</p>
                </div>
              )}
            </div>

            {/* BOTTOM SECTION */}
            <div className="p-6 md:p-10 bg-white border-t border-[#1a2e05]/5 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[#1a2e05]/40 font-bold uppercase tracking-widest text-[10px] mb-1">Order Total</p>
                  <p className="text-3xl md:text-4xl font-black text-[#1a2e05] tracking-tighter">
                    ₹{subtotal.toFixed(2)}
                  </p>
                </div>
                <p className="text-[#68a336] font-bold text-xs">Inc. all taxes</p>
              </div>

              <button
               onClick={sendToWhatsApp}
              className="w-full cursor-pointer bg-[#1a2e05] text-[#fcfdfa] py-4 md:py-6 rounded-2xl md:rounded-3xl text-xs md:text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-[#1a2e05]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                Order via WhatsApp
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <p className="text-center mt-6 text-[10px] text-[#1a2e05]/30 font-medium uppercase tracking-widest">Fast ordering through WhatsApp</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;