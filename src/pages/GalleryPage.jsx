import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA ---
const galleryItems = [
  { id: 1, url: 'https://preview.redd.it/cute-aesthetic-cafe-for-a-cozy-date-v0-s9yjbsfpbe1g1.jpg?width=640&crop=smart&auto=webp&s=c57d113576e606b95450f613173acac57530e4ce' },
  { id: 2, url: 'https://preview.redd.it/cute-aesthetic-cafe-for-a-cozy-date-v0-eekuxmfpbe1g1.jpg?width=640&crop=smart&auto=webp&s=3d2b2cea00074311be06002836178a2bdfffb5ab' },
  { id: 3, url: 'https://media.istockphoto.com/id/1369265275/photo/empty-coffee-shop-interior-with-coffee-maker-pastries-and-desserts-at-night-with-neon-lights.jpg?s=612x612&w=0&k=20&c=ZNJg7sBSnuisQDkHpdvkXVT_E3O-uDhrAvavUluBDtA=' },
  { id: 4, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-hqYvbZkgauVyJmdzdj09cYA1niLDPNQdvQ&s' },
  { id: 5, url: 'https://i.pinimg.com/736x/1c/ff/c5/1cffc500a48791e946ba1a05a038c8a8.jpg' },
  { id: 6, url: 'https://imgmediagumlet.lbb.in/media/2020/10/5f902b898c97b6651e531156_1603283849112.jpg' },
  { id: 7, url: 'https://i.pinimg.com/736x/0f/b3/ef/0fb3efd64520c1c222b62ce521d60f2e.jpg' },
  { id: 8, url: 'https://i.pinimg.com/236x/09/c9/55/09c955095d161d5dbaec043fa1f01a11.jpg' },
  { id: 9, url: 'https://thearchitectsdiary.com/wp-content/uploads/2024/02/Types-of-cafe-08.png' },
  { id: 10, url: 'https://res.cloudinary.com/purnesh/image/upload/w_540,f_auto,q_auto:eco,c_limit/51645012990743.jpg' },
  { id: 11, url: 'https://content.jdmagicbox.com/comp/amritsar/v2/0183px183.x183.201104010708.f2v2/catalogue/wild-bean-cafe-and-thai-food--amritsar-1oi0ayet0t.jpg' },
  { id: 12, url: 'https://i.pinimg.com/736x/6e/5e/61/6e5e613f78b2c39fb52db9168ed73b37.jpg' },
  { id: 13, url: 'https://static01.nyt.com/images/2026/04/18/multimedia/18ST-CHIC-FAST-FOOD-WED-01-fbtm/18ST-CHIC-FAST-FOOD-WED-01-fbtm-articleLarge.jpg?quality=75&auto=webp&disable=upscale' },
];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25 } },
  };

  return (
    <section className="relative py-20 md:py-24 lg:py-32 bg-[#fcfdfa] overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        // md:auto-rows adjusted for tablet balance; lg:grid-cols-6 preserved for desktop
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5 px-4 md:px-10 lg:px-6 max-w-[1700px] mx-auto auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[250px]"
      >
        
        {/* --- CENTER TEXT OVERLAY --- */}
        <motion.div 
          variants={itemVariants} 
          // Responsive spans: col-span-2 on mobile/tablet, 3 on desktop
          className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 bg-[#1a2e05] p-8 md:p-10 lg:p-14 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[3rem] flex flex-col justify-center gap-4 md:gap-6 z-10 shadow-2xl"
        >
          <span className="text-[#68a336] font-bold tracking-[0.3em] uppercase text-[10px]">The Atmosphere</span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black text-[#fcfdfa] leading-tight">
            A glimpse <span className="text-[#68a336]">of our coffee,</span> our space, and the moments we create.
          </h2>
          <p className="text-[#fcfdfa]/70 text-xs md:text-base lg:text-lg leading-relaxed max-w-sm">
            Simple, warm, and made for you to enjoy.
          </p>
        </motion.div>

        {/* --- DYNAMIC MOSAIC GRID --- */}
        {galleryItems.map((item, index) => (
          <motion.div 
            key={item.id}
            variants={itemVariants}
            onClick={() => setSelectedImage(item.url)}
            className={`cursor-pointer overflow-hidden rounded-[1.5rem] md:rounded-[2rem] group relative
              ${index % 5 === 0 ? 'md:col-span-2 row-span-2' : 'col-span-1'}
              ${index % 7 === 0 ? 'md:row-span-2' : ''}
            `}
          >
            <img 
              src={item.url} 
              alt="Cafe Gallery" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* --- REFINED LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-[#1a2e05]/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 30 }}
              className="relative max-w-6xl max-h-screen rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged" 
                className="w-full h-auto max-h-[85vh] md:max-h-[90vh] object-contain"
              />
              <button 
                onClick={() => setSelectedImage(null)} 
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white flex items-center justify-center hover:bg-[#68a336] transition-colors cursor-pointer"
              >
                <svg width="18" height="18" className="md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPage;