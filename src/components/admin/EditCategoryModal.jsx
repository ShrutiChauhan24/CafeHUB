import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { toast } from 'react-toastify';
import generateSlug from '../../helper/generateSlug';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';

const EditCategoryModal = ({ isOpen, onClose, itemData }) => {
  // State initialized with existing item values
  const [formData, setFormData] = useState({
    categoryName: '',
    status: true
  });
  
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  // Sync state when itemData changes (e.g., when clicking a different edit button)
  useEffect(() => {
    if (itemData) {
      setFormData({
        categoryName: itemData.name || '',
        status: itemData.status ?? true
      });
    }
  }, [itemData]);

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        tl.to(backdropRef.current, { 
          opacity: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        })
        .fromTo(modalRef.current, 
          { scale: 0.9, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, 
          "-=0.3"
        )
        .from(contentRef.current.children, {
          y: 25,
          opacity: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: "power4.out"
        }, "-=0.5");
      });
      return () => ctx.revert();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Responsive Styles
  const labelStyle = "block text-[#8BA888] font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs mb-2";
  const inputStyle = "w-full bg-[#FCF9F5] border border-stone-100 rounded-xl md:rounded-2xl py-3 px-5 md:py-4 md:px-6 text-stone-800 placeholder:text-stone-300 focus:border-[#8BA888] focus:ring-4 focus:ring-[#8BA888]/5 outline-none transition-all duration-300 text-sm md:text-base";

   const handleUpdate = async (e)=>{
      e.preventDefault();
      try {
        const docRef = doc(db, "categories", itemData.id);

        const updatedName = formData.categoryName.trim();
        let updatedSlug = itemData.slug;

        if(!updatedName){
          return toast.error("Category name is required")
        }

        if(updatedName !== itemData.name){
         updatedSlug = generateSlug(updatedName); 
        }

            const q = query(
                collection(db, "categories"),
                where("slug", "==", updatedSlug),
              );
        
              const snapshot = await getDocs(q);
        
               if (!snapshot.empty) {
                 const isSameDoc = snapshot.docs.some(doc => doc.id === itemData.id);
                   if (!isSameDoc){
                   return toast.error("Slug already exists");
                  }
                }

          await updateDoc(docRef,{
             name:updatedName,
             slug:updatedSlug,
             status:formData.status
          })

          // 1. Get all menus with this categoryId
const menuQuery = query(
  collection(db, "menus"),
  where("categoryId", "==", itemData.id)
);

const menuSnapshot = await getDocs(menuQuery);

// 2. Update each menu item
const updatePromises = menuSnapshot.docs.map((menuDoc) =>
  updateDoc(doc(db, "menus", menuDoc.id), {
    categoryName: updatedName,
    categoryStatus: formData.status
  })
);

await Promise.all(updatePromises);

        toast.success("category updated")
        onClose()   
      } catch (error) {
        console.error(error);
        toast.error("Update failed");
      }
   }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      {/* Background Overlay */}
      <div 
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-md opacity-0 transition-opacity cursor-pointer"
      />

      {/* Modal Card */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-[92%] sm:max-w-[500px] md:max-w-[580px] lg:max-w-[650px] bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header & Close Button */}
        <div className="px-8 pt-8 sm:px-10 sm:pt-10 md:px-14 md:pt-14 flex justify-between items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-stone-900">
              Edit <span className="not-italic text-[#8BA888]">Category</span>
            </h2>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.3em] text-stone-400 mt-2">Update inventory details</p>
          </div>
          <button 
            onClick={onClose}
            className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FCF9F5] flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all duration-500 cursor-pointer"
          >
            <span className="text-lg group-hover:rotate-90 transition-transform duration-500">✕</span>
          </button>
        </div>

        {/* Form Content */}
        <form 
          ref={contentRef} 
          className="p-8 sm:p-10 md:p-14 space-y-6 md:space-y-10 overflow-y-auto max-h-[75vh] scrollbar-hide"
          onSubmit={handleUpdate}
        >
          
          {/* category Name */}
          <div className="space-y-1">
            <label className={labelStyle}>Category Name</label>
            <input 
              type="text" 
              value={formData.categoryName}
              onChange={(e) => setFormData({...formData, categoryName: e.target.value})}
              placeholder="e.g. Lavender Honey Latte" 
              className={inputStyle} 
            />
          </div>

          {/* Status Switch */}
          <div className="flex items-center justify-between py-2 border-t border-stone-50 pt-8">
            <div>
              <span className={labelStyle + " mb-0"}>Availability Status</span>
              <p className="text-[10px] text-stone-400 italic mt-1">Hide or show this item from public menu</p>
            </div>
            <button 
              type="button" 
              value={formData.status}
              onClick={() => setFormData({...formData, status: !formData.status})}
              className={`w-12 h-6 md:w-14 md:h-7 rounded-full relative transition-all duration-500 cursor-pointer ${formData.status ? 'bg-[#5d8026]' : 'bg-stone-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full transition-all duration-500 shadow-sm ${formData.status ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button type='submit' className="group relative w-full py-5 md:py-6 bg-stone-900 text-[#FCF9F5] rounded-full overflow-hidden transition-all duration-500 hover:text-stone-900 border border-stone-900 shadow-2xl shadow-stone-900/10">
              <div className="absolute inset-0 bg-[#FCF9F5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
                Save Changes
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;