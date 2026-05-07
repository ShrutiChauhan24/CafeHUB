import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AddItemModal from '../../components/admin/AddItemModal';
import EditItemModal from '../../components/admin/EditItemModal';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const AdminMenuItems = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [categories,setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems,setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "categories"),
        (snapshot) => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setCategories(data);
        },
        (error) => {
          console.error("Error:", error);
        }
      );
  
      return () => unsubscribe(); // cleanup
    }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(headerRef.current.children, { y: -20, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out" });
      // Target both table rows and cards for the entrance animation
      tl.from(".animate-item", { 
        y: 40, 
        opacity: 0, 
        stagger: 0.08, 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.6");
    }, containerRef);
    return () => ctx.revert();
  }, []);

   useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "menus"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setMenuItems(data);
      },
      (error) => {
        console.error("Error:", error);
      }
    );

    return () => unsubscribe(); // cleanup
  }, []);



  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditOpen(true);
  };

const categoryMap = {};

categories.forEach(cat => {
  categoryMap[cat.id] = cat;
});

const filteredItems = menuItems.filter((item) => {
  const term = searchTerm.toLowerCase();

  return (
    item.name.toLowerCase().includes(term) ||
    item.categoryName.toLowerCase().includes(term)
  );
});

  return (
    <div ref={containerRef} className="w-full p-6 sm:p-10 lg:p-12 xl:p-14 text-stone-800">
      <AddItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} categories={categories}/>
      <EditItemModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} itemData={selectedItem} categories={categories}/>

       <div className="h-20 md:h-30 lg:hidden" />
      {/* Header Section */}
      <div ref={headerRef} className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif italic text-stone-900 leading-tight">
            Menu <span className="not-italic text-[#5d8026]">Items</span>
          </h1>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-stone-400">Refine your cafe offerings</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative group flex-1">
            <input 
              type="text" 
              placeholder="Search items..." 
               value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-72 bg-white border border-stone-100 rounded-2xl py-4 px-6 pl-12 text-sm outline-none focus:border-[#5d8026]/30 focus:ring-4 focus:ring-[#5d8026]/5 transition-all shadow-sm"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30">🔍</span>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:shadow-xl transition-all active:scale-95 cursor-pointer">
            + New Item
          </button>
        </div>
      </div>

      {/* --- RESPONSIVE CONTENT AREA --- */}
      <div ref={contentRef}>
        
        {/* MOBILE & TABLET GRID VIEW (Visible up to XL) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:hidden">
          {filteredItems.map((item) => {
             const category = categoryMap[item.categoryId];
             const isCategoryInactive = !category?.status;
             const isToggleDisabled = isCategoryInactive;

            return(
            <div key={item?.id} className="animate-item bg-white p-6 rounded-[2rem] border border-stone-100 shadow-xl shadow-stone-200/40 group">
              <div className="flex gap-5 items-start mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <img src={item?.image} alt={item?.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] tracking-widest uppercase text-[#5d8026] font-bold bg-[#5d8026]/5 px-3 py-1 rounded-full mb-2 inline-block">
                      {item?.categoryName}
                    </span>
                    <button className={`w-10 h-5 rounded-full relative transition-all duration-500 ${item?.status ? 'bg-[#5d8026]' : 'bg-stone-200'}`}>
                      <div className={`absolute top-0.75 w-3.5 h-3.5 bg-white rounded-full transition-all duration-500 ${item?.status ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 italic truncate">{item?.name}</h3>
                  <p className="text-stone-500 font-medium mt-1">₹{item?.price}</p>
                </div>
              </div>
              <button 
                onClick={() => handleEditClick(item)}
                className="w-full py-3.5 bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold rounded-xl transition-all duration-300 cursor-pointer"
              >
                Edit Details
              </button>
            </div>
          )})}
        </div>

        {/* DESKTOP TABLE VIEW (Visible from XL onwards) */}
        <div className="hidden xl:block bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/40 border border-stone-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50/30">
                <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#5d8026] font-bold">Item</th>
                <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#5d8026] font-bold">Category</th>
                <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#5d8026] font-bold">Price</th>
                <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#5d8026] font-bold">Status</th>
                <th className="px-10 py-7 text-[10px] uppercase tracking-[0.25em] text-[#5d8026] font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>

              {filteredItems?.map((item) =>  {
                const category = categoryMap[item.categoryId];
            const isCategoryInactive = !category?.status;
               const isToggleDisabled = isCategoryInactive;


                return(
                <tr key={item?.id} className="animate-item group border-b border-stone-50 last:border-0 hover:bg-[#FCF9F5]/40 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-700">
                        <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-serif text-lg text-stone-900 italic leading-tight">{item?.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-[10px] tracking-widest uppercase text-stone-400 bg-stone-100/50 px-4 py-1.5 rounded-full">
                      {item?.categoryName}
                    </span>
                  </td>
                  <td className="px-10 py-6 font-medium text-stone-700 font-serif italic">₹{item?.price}</td>
                  <td className="px-10 py-6">
                    <button
  disabled={isToggleDisabled}
  onClick={() => handleToggle(item)}
  className={`w-11 h-5.5 rounded-full relative transition-all duration-500
    ${
      isToggleDisabled
        ? 'bg-stone-200 opacity-50 cursor-not-allowed'
        : item?.status
          ? 'bg-[#5d8026]'
          : 'bg-stone-200'
    }
  `}
>
  <div
    className={`absolute top-1 w-3.5 h-3.5 bg-white rounded-full transition-all duration-500
      ${item.status ? 'right-1' : 'left-1'}
    `}
  />
</button>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button onClick={() => handleEditClick(item)} className="text-stone-300 hover:text-stone-900 cursor-pointer transition-colors px-4 py-2 text-[10px] uppercase tracking-widest font-bold">
                      Edit
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminMenuItems;