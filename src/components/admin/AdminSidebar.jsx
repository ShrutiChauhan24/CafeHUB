import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import gsap from 'gsap';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";



const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const menuItemsRef = useRef([]);
  const location = useLocation(); // Used to determine which link is active based on the URL

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (window.innerWidth >= 1024) {
        tl.from(sidebarRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          clearProps: "all"
        });

        tl.from(menuItemsRef.current, {
          x: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all"
        }, "-=0.6");
      }
    });
    return () => ctx.revert();
  }, []);


  const handleLogout = async () => {
  await signOut(auth);
};
  // Update navigation "path" to match your Route definitions
  const navigation = [
    { name: 'Menu Items', path: '/admin/menu-items', icon: '☕' },
    { name: 'Categories', path: '/admin/all-categories', icon: '📋' },
  ];

  return (
    <>
      {/* Mobile Burger Trigger */}
      <button 
  onClick={() => setIsOpen(!isOpen)}
  className="lg:hidden fixed top-8 left-8 z-[150] w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-xl transition-all active:scale-95 border border-stone-100 cursor-pointer"
>
  {isOpen ? '✕' : '☰'}
</button>

      {/* Sidebar Container */}
      <aside 
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-[140] 
          w-72 sm:w-80 
          bg-white border-r border-stone-100 
          transition-transform duration-500 ease-in-out
          lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col p-8
        `}
      >
        {/* Branding */}
        <div className="mb-16 mt-12 lg:mt-0">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-stone-900 rounded-2xl flex items-center justify-center text-white text-xl">
              C
            </div>
            <div>
              <h2 className="text-xl font-serif italic text-stone-900 leading-none">
                Cafe<span className="not-italic text-[#5d8026]">Hub</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-1 font-bold">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav - Using Link for Routing */}
        <nav className="flex-1 space-y-4">
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                ref={(el) => (menuItemsRef.current[index] = el)}
                onClick={() => setIsOpen(false)}
                className={`
                  w-full group relative flex items-center gap-4 px-6 py-5 rounded-[1.5rem] transition-all duration-500
                  ${isActive 
                    ? 'bg-[#FCF9F5] text-stone-900 shadow-sm' 
                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-50/50'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 w-1.5 h-8 bg-[#5d8026] rounded-full" />
                )}
                <span className="text-xl">{item.icon}</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
       {/* Bottom Section */}
        <div className="mt-auto pt-8 border-t border-stone-50 space-y-6">
          
          {/* Logout Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout()
            }}
            className="w-full group flex items-center gap-4 px-6 py-5 rounded-[1.5rem] text-red-600 hover:text-red-500 hover:bg-red-50/30 transition-all duration-500 cursor-pointer"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform duration-500">
              🚪
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]">
              Logout
            </span>
          </button>

          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300 font-bold text-center">
            System Status: Active
          </p>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-stone-900/10 backdrop-blur-md z-[130] lg:hidden transition-all duration-700"
        />
      )}
    </>
  );
};

export default AdminSidebar;