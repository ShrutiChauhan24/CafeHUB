import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const CafeContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
    email: ""
  });
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const leftContentRef = useRef(null);
  const formFieldsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      tl.from(
        leftContentRef.current.children,
        { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 },
        "-=0.8"
      );

      tl.from(
        formFieldsRef.current,
        { x: 20, opacity: 0, stagger: 0.05, duration: 0.8 },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const labelStyle = "text-[#5d8026] font-bold uppercase tracking-[0.2em] text-[10px] mb-2 block";
  const inputStyle = "w-full bg-transparent border-b border-stone-200 py-3 focus:border-[#8BA888] outline-none transition-all duration-500 text-stone-800 placeholder:text-stone-300 text-sm md:text-base";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim() || !form.email.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      { ...form },
      import.meta.env.VITE_EMAIL_PUBLIC_KEY
    ).then(() => {
      toast.success("Message sent ✅");
      setForm({ name: "", phone: "", message: "", email: "" });
    }).catch(() => {
      toast.error("Failed to send message");
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-20 lg:py-24 xl:py-32 bg-[#FCF9F5] px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden"
    >
      {/* Background Decorative Bloom */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-[600px] md:h-[600px] bg-[#8BA888]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div
        ref={cardRef}
        /* Adjusted flex logic: Stacks until LG (small laptops) to prevent cropping on MD (tablets) */
        className="container mx-auto max-w-6xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-stone-200/40 flex flex-col lg:flex-row"
      >
        {/* Left Visual Panel */}
        {/* Increased min-height and padding logic for tablets/small laptops to fix cropping */}
        <div className="lg:w-[40%] bg-stone-900 p-8 sm:p-12 md:p-16 lg:p-12 xl:p-16 relative flex flex-col justify-between overflow-hidden min-h-[350px] md:min-h-[450px] lg:min-h-[600px] xl:min-h-[700px]">
          <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
              className="w-full h-full object-cover"
              alt="Cafe Interior"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-900/90 to-stone-800/50" />

          <div ref={leftContentRef} className="relative z-10 space-y-4 md:space-y-6">
            <span className="text-[#8BA888] font-bold uppercase tracking-[0.4em] text-[10px]">
              Reach Out
            </span>
            <h2 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl italic leading-tight">
              Let's start <br /> a <span className="not-italic text-[#5d8026]">conversation.</span>
            </h2>
            <p className="text-stone-400 font-light leading-relaxed max-w-sm text-sm md:text-base lg:text-sm xl:text-base">
              Whether you're inquiring about our beans, booking a private event, or just saying hello.
            </p>
          </div>

          <div className="relative z-10 pt-8 border-t border-white/10 hidden sm:block">
            <div className="flex items-center gap-3">
              <span className="text-lg">📍</span>
              <p className="text-stone-300 text-[10px] tracking-widest uppercase">
                Visit our main roastery
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:w-[60%] p-8 sm:p-12 md:p-16 lg:p-12 xl:p-20 flex flex-col justify-center bg-white">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-10 lg:gap-y-12" onSubmit={handleSubmit}>
            
            <div ref={(el) => (formFieldsRef.current[0] = el)} className="md:col-span-1">
              <label className={labelStyle}>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={inputStyle}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div ref={(el) => (formFieldsRef.current[3] = el)} className="md:col-span-1">
              <label className={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className={inputStyle}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div ref={(el) => (formFieldsRef.current[1] = el)} className="md:col-span-2">
              <label className={labelStyle}>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 00000 00000"
                className={inputStyle}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div ref={(el) => (formFieldsRef.current[2] = el)} className="md:col-span-2">
              <label className={labelStyle}>Message</label>
              <textarea
                rows="2"
                placeholder="Tell us more..."
                className={`${inputStyle} resize-none`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div ref={(el) => (formFieldsRef.current[4] = el)} className="md:col-span-2">
              <button
                type="submit"
                className="group relative w-full sm:w-auto px-10 py-4 bg-stone-900 text-[#FCF9F5] rounded-full overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-[#5d8026] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[10px]">
                  Send Message
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CafeContactForm;