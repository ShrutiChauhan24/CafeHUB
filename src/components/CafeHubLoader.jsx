import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CafeHubLoader = ({ onLoaded }) => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const progressTextRef = useRef(null);
  const waveMaskRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (typeof onLoaded === 'function') onLoaded();
        }
      });

      const totalDuration = 3.5;
      const fillDuration = totalDuration * 0.7;
      const scaleDuration = totalDuration * 0.3;

      // Initial States
      gsap.set(logoRef.current, { scale: 0.9, opacity: 0 });
      gsap.set(progressTextRef.current, { opacity: 0 });

      tl.to([logoRef.current, progressTextRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2
      })
      .to({ val: 0 }, {
        val: 100,
        duration: fillDuration,
        ease: 'none',
        onUpdate: function () {
          const currentVal = Math.round(this.targets()[0].val);
          setProgress(currentVal);
          // 60 is the height of our viewBox
          const waveHeight = 60 - (currentVal * 0.6); 
          if (waveMaskRef.current) {
            gsap.set(waveMaskRef.current, { attr: { y: waveHeight } });
          }
        }
      })
      .to(progressTextRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(logoRef.current, {
        scale: 12, // Dramatic scale into the screen
        opacity: 0,
        duration: scaleDuration,
        ease: 'expo.inOut'
      })
      .to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          gsap.set(loaderRef.current, { display: 'none' });
        }
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onLoaded]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1a1a1a] p-6 overflow-hidden"
    >
      {/* CENTRAL LOGO CONTAINER 
          Using flex-col and justify-center to ensure absolute vertical/horizontal centering.
      */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        
        <div ref={logoRef} className="w-full flex justify-center items-center">
          {/* RESPONSIBLE SVG WIDTHS:
              - Mobile (default): max-w-[280px]
              - Tablet (md): max-w-[350px]
              - Desktop (lg): max-w-[450px]
          */}
          <svg
            viewBox="0 0 200 60" 
            className="w-full max-w-[260px] md:max-w-[350px] lg:max-w-[450px] h-auto fill-current"
          >
            <defs>
              <mask id="textFillMask">
                <rect
                  ref={waveMaskRef}
                  width="100%"
                  height="100%"
                  fill="white"
                  y="60" 
                />
              </mask>
            </defs>

            {/* Background Text (Grey) */}
            <text
              x="50%"
              y="40"
              textAnchor="middle" 
              className="font-black text-[#333333]"
              style={{ fontSize: '24px', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.02em' }}
            >
              C CafeHUB
            </text>

            {/* Filled Text (White) */}
            <text
              x="50%"
              y="40"
              textAnchor="middle"
              mask="url(#textFillMask)"
              className="font-black text-white"
              style={{ fontSize: '24px', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.02em' }}
            >
              C CafeHUB
            </text>

            {/* Logo Dot */}
            <circle cx="172" cy="37" r="2.2" fill="#a3cb38" />
          </svg>
        </div>

        {/* PROGRESS SECTION
            Positioned absolutely relative to the container to not push the logo off-center.
        */}
        <div 
          ref={progressTextRef} 
          className="absolute bottom-10 md:bottom-16 flex flex-col items-center text-white"
        >
          <span className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase opacity-40 mb-3">
            Crafting the Perfect Blend
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-4xl font-extralight tabular-nums leading-none">
              {progress}
            </span>
            <span className="text-xs md:text-sm opacity-50">%</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CafeHubLoader;