import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {toast} from "react-toastify";
import {db} from "../../firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import generateSlug from "../../helper/generateSlug";

const AddCategoryModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const [categoryName, setCategoryName] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.to(backdropRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        })
          .fromTo(
            modalRef.current,
            { scale: 0.95, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
            "-=0.3",
          )
          .from(
            contentRef.current.children,
            {
              y: 20,
              opacity: 0,
              stagger: 0.06,
              duration: 0.6,
              ease: "power4.out",
            },
            "-=0.4",
          );
      });
      return () => ctx.revert();
    }
  }, [isOpen]);


  if (!isOpen) return null;

  // Fluid Typography & Spacing Constants
  const labelStyle =
    "block text-[#5d8026] font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs mb-1.5 md:mb-2";
  const inputStyle =
    "w-full bg-[#FCF9F5] border border-stone-100 rounded-xl md:rounded-2xl py-2.5 px-4 md:py-3.5 md:px-6 text-stone-800 placeholder:text-stone-300 focus:border-[#8BA888] focus:ring-4 focus:ring-[#8BA888]/5 outline-none transition-all duration-300 text-sm md:text-base";


    const handleSubmit = async (e)=>{
       e.preventDefault();
       try {
         if(!categoryName.trim()){
           return toast.error("Category Name is required")
         }

     const slug =  generateSlug(categoryName)

     const q = query(
      collection(db, "categories"),
      where("slug", "==", slug)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return toast.error("Category with this name already exists");
    }

      await addDoc(collection(db, "categories"), {
      name: categoryName.trim(),
      slug : slug,
      status: isAvailable,
      createdAt: serverTimestamp()
    });

    toast.success("Category Added")

    setCategoryName("")
    setIsAvailable(false)
    onClose()
        } catch (error) {
          console.log(error)
        toast.error("Unable to add category, try again later")
       }
    }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Background Overlay */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md opacity-0 transition-opacity cursor-pointer"
      />

      {/* Modal Card - Responsive Width Scaling */}
      <div
       onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        className="relative w-full max-w-[95%] sm:max-w-[480px] md:max-w-[550px] lg:max-w-[600px] bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header Section */}
        <div className="px-6 pt-6 sm:px-8 sm:pt-8 md:px-12 md:pt-12 flex justify-between items-start">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-stone-900 leading-tight">
              Add{" "}
              <span className="not-italic text-[#5d8026]">New Category</span>
            </h2>
            <p className="text-[8px] sm:text-[10px] uppercase tracking-widest text-stone-400 mt-1 md:mt-2">
              Inventory Management
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer bg-[#FCF9F5] flex items-center justify-center text-stone-400 hover:text-stone-900 hover:scale-110 transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* Form Content - Scrollable for smaller heights */}
        <form
          ref={contentRef}
          onSubmit={(e) => {
    console.log("FORM SUBMIT TRIGGERED") 
    handleSubmit(e)}}
          className="p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6 md:space-y-8 overflow-y-auto max-h-[80vh] md:max-h-[75vh] scrollbar-hide"
        >
          {/* Name Input */}
          <div className="group">
            <label className={labelStyle}>Category Name</label>
            <input
              type="text"
              placeholder="e.g. Coffee"
              className={inputStyle}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between py-1 md:py-2">
            <div>
              <span className={labelStyle + " mb-0"}>
                Available in Category
              </span>
              <p className="text-[8px] sm:text-[9px] md:text-[10px] text-stone-400 lowercase italic leading-none mt-1">
                visible to customers
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAvailable(!isAvailable)}
              className={`w-10 h-5 md:w-12 md:h-6 cursor-pointer rounded-full relative transition-colors ${
                isAvailable ? "bg-[#8BA888]" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-sm transition-all ${
                  isAvailable ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Action Button */}
          <div className="pt-2 sm:pt-4">
            <button type="submit" className="group relative w-full py-4 md:py-6 bg-stone-900 text-[#FCF9F5] rounded-full overflow-hidden transition-all duration-500 hover:text-stone-900 border border-stone-900 shadow-xl shadow-stone-900/10 active:scale-[0.98]">
              <div className="absolute inset-0 bg-[#FCF9F5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-bold cursor-pointer uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs transition-colors duration-500">
                Confirm & Add
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
