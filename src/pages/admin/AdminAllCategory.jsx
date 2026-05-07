import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import AddCategoryModal from '../../components/admin/AddCategoryModal';
import EditCategoryModal from '../../components/admin/EditCategoryModal';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const AdminAllCategory = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headerRef.current.children, {
        y: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out"
      });

      tl.from(".animate-cat-item", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);



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

  const handleEditClick = (cat) => {
    setSelectedCat(cat || { name: "Coffee", status: "true" });
    setIsEditOpen(true);
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#FCF9F5] p-5 sm:p-8 md:p-12 lg:p-16 flex justify-center overflow-x-hidden"
    >
      <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditCategoryModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} itemData={selectedCat} />

      <div className="w-full max-w-7xl">
        
        {/* Responsive Spacer for Hamburger */}
        <div className="h-20 sm:h-24 lg:hidden" />
        
        {/* --- HEADER SECTION --- */}
       {/* Header Section - Updated for Tablet/Medium screens */}
<div 
  ref={headerRef} 
  className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16"
>
  <div>
    <h1 className="text-4xl md:text-6xl font-serif italic text-stone-900 leading-tight">
      Menu <span className="not-italic text-[#5d8026]">Categories</span>
    </h1>
    <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-stone-400 mt-4 font-bold">
      Organize your offerings by essence
    </p>
  </div>

  <button 
    type='button' 
    onClick={() => setIsModalOpen(true)} 
    className="group relative shrink-0 px-8 py-5 sm:px-10 bg-stone-900 text-[#FCF9F5] rounded-full overflow-hidden transition-all duration-500 hover:text-stone-900 border border-stone-900 shadow-xl shadow-stone-900/10 self-start xl:self-auto cursor-pointer"
  >
    <div className="absolute inset-0 bg-[#FCF9F5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
    <span className="relative z-10 font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] md:text-xs whitespace-nowrap">
      + Add New Category
    </span>
  </button>
</div>
        {/* --- CONTENT AREA --- */}
        
        {/* MOBILE & TABLET: Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 lg:hidden">
          {categories?.map((cat) => (
            <div key={cat?.id} className="animate-cat-item bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-stone-100 shadow-xl shadow-stone-200/40 flex flex-col justify-between h-full">
              <div className="flex justify-between items-start mb-8 sm:mb-12">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Collection</p>
                  <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 italic leading-none">{cat?.name}</h3>
                </div>
                <button className={`shrink-0 w-10 h-5 sm:w-12 sm:h-6 rounded-full relative transition-all duration-700 ${cat?.status ? 'bg-[#5d8026]' : 'bg-stone-200'}`}>
                  <div className={`absolute top-1 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full transition-all duration-500 shadow-sm ${cat?.status ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              
              <button 
                onClick={() => handleEditClick(cat)}
                className="w-full py-4 bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-400 text-[10px] uppercase tracking-[0.2em] font-bold rounded-2xl transition-all duration-300 cursor-pointer"
              >
                Modify Collection
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP: Elegant Table */}
        <div className="hidden lg:block bg-white rounded-[2.5rem] xl:rounded-[3.5rem] shadow-2xl shadow-stone-200/30 border border-stone-100/50 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-50 bg-stone-50/20">
                <th className="px-10 xl:px-14 py-8 xl:py-10 text-[10px] xl:text-xs uppercase tracking-[0.3em] text-[#5d8026] font-bold">Category Name</th>
                <th className="px-10 xl:px-14 py-8 xl:py-10 text-[10px] xl:text-xs uppercase tracking-[0.3em] text-[#5d8026] font-bold text-center">Visibility</th>
                <th className="px-10 xl:px-14 py-8 xl:py-10 text-[10px] xl:text-xs uppercase tracking-[0.3em] text-[#5d8026] font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((cat) => (
                <tr key={cat?.id} className="animate-cat-item group border-b border-stone-50 last:border-none hover:bg-[#FCF9F5]/40 transition-colors duration-500">
                  <td className="px-10 xl:px-14 py-10 xl:py-14">
                    <span className="font-serif text-2xl xl:text-4xl text-stone-900 italic tracking-tight group-hover:pl-4 transition-all duration-500 block">
                      {cat?.name}
                    </span>
                  </td>
                  <td className="px-10 xl:px-14 py-10 xl:py-14">
                    <div className="flex justify-center">
                      <button className={`w-12 xl:w-14 h-6 xl:h-7 rounded-full relative transition-all duration-700 ease-in-out cursor-pointer ${cat?.status ? 'bg-[#5d8026]' : 'bg-stone-200'}`}>
                        <div className={`absolute top-1 w-4 xl:w-5 h-4 xl:h-5 bg-white rounded-full transition-all duration-500 shadow-sm ${cat?.status ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>
                  </td>
                  <td className="px-10 xl:px-14 py-10 xl:py-14 text-right">
                    <button 
                      onClick={() => handleEditClick(cat)} 
                      className="text-stone-300 hover:text-stone-900 font-bold uppercase tracking-[0.2em] text-[10px] xl:text-xs transition-all duration-300 hover:tracking-[0.4em] cursor-pointer"
                    >
                      Edit 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Detail */}
        <div className="mt-20 md:mt-32 mb-10 flex items-center gap-6 opacity-20">
          <div className="h-[1px] flex-grow bg-stone-400" />
          <span className="text-[10px] uppercase tracking-[1.2em] md:tracking-[2em] text-stone-500 whitespace-nowrap">End of Collections</span>
          <div className="h-[1px] flex-grow bg-stone-400" />
        </div>

      </div>
    </div>
  );
};

export default AdminAllCategory;