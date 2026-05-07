import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const formRef = useRef(null);
  const bgRef = useRef(null);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Background Cinematic Entrance
      tl.fromTo(bgRef.current,
        { scale: 1.1, filter: 'blur(20px) brightness(0.5)' },
        { scale: 1, filter: 'blur(10px) brightness(0.8)', duration: 2.5, ease: "power2.out" }
      );

      // 2. Card Unmask & Slide Up
      tl.fromTo(cardRef.current,
        { y: 60, opacity: 0, clipPath: 'inset(10% 10% 10% 10% round 40px)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 40px)', duration: 1.5, ease: "expo.out" },
        "-=1.8"
      );

      // 3. Staggered Content Reveal
      tl.fromTo(formRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLogin = async (e)=>{
    e.preventDefault();

    try {
       await signInWithEmailAndPassword(auth,email,password);
       navigate('/admin/menu-items')
    } catch (error) {
      toast.error("Invalid Credentials")
    }
  }

  const inputClasses = "w-full bg-[#FCF9F5]/40 border-b border-stone-200 py-3 md:py-4 focus:border-[#8BA888] outline-none transition-all duration-500 text-stone-800 placeholder:text-stone-300 text-sm md:text-base";
  const labelClasses = "block text-[#8BA888] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-2";

  return (
    <main 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-[#FCF9F5] px-6 overflow-hidden"
    >
      {/* Background Layer: Blurred Cafe Aesthetic */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000" 
          alt="Cafe Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#FCF9F5]/60 backdrop-blur-3xl" />
      </div>

      {/* Login Card (Layout based on Ref 2) */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-[450px] bg-white p-8 md:p-12 lg:p-16 rounded-[40px] shadow-2xl shadow-stone-900/5 border border-stone-100/50 flex flex-col items-center"
      >
        {/* Brand Identity / Icon Area */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FCF9F5] rounded-full flex items-center justify-center mb-10 shadow-inner border border-stone-100">
          <span className="text-[#8BA888] text-2xl">☕</span>
        </div>

        <div className="w-full text-center mb-12">
          <h1 className="text-stone-900 font-serif text-3xl md:text-4xl italic mb-2">
            Welcome <span className="not-italic text-[#8BA888]">Back.</span>
          </h1>
          <p className="text-stone-400 text-xs md:text-sm tracking-widest uppercase font-light">
            Admin Portal Access
          </p>
        </div>

        <form ref={formRef} className="w-full space-y-10" onSubmit={handleLogin}>
          <div className="relative group">
            <label className={labelClasses}>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@elevare.com" 
              className={inputClasses}
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="relative group">
            <label className={labelClasses}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className={inputClasses}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              className="group relative w-full px-8 py-4 md:py-5 bg-stone-900 text-[#FCF9F5] rounded-full overflow-hidden transition-all duration-500 hover:text-stone-900 border border-stone-900 shadow-xl shadow-stone-900/10 cursor-pointer"
            >
              {/* Background Hover Effect: Inverts to White */}
              <div className="absolute inset-0 bg-[#FCF9F5] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
              
              <span className="relative z-10 font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs transition-colors duration-500">
                Login
              </span>
            </button>
          </div>

          <div className="text-center">
            <button type="button" className="text-stone-300 hover:text-[#8BA888] text-[10px] uppercase tracking-widest transition-colors duration-300">
              Forgot Credentials?
            </button>
          </div>
        </form>
      </div>

      {/* Subtle Bottom Detail */}
      <div className="absolute bottom-8 text-stone-400/50 text-[10px] tracking-[0.5em] uppercase pointer-events-none">
        Elevare Admin Interface
      </div>
    </main>
  );
};

export default AdminLogin;