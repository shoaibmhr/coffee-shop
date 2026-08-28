import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import Lightbox from "./Lightbox";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const GalleryGrid = ({ images, activeCategory }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 [column-fill:_balance]"
        >
          {images.map((img, idx) => (
            <motion.button
              key={img.id}
              variants={itemVariants}
              onClick={() => openLightbox(idx)}
              className="group relative w-full mb-4 sm:mb-5 rounded-xl overflow-hidden break-inside-avoid block"
            >
              <img
                src={img.image}
                alt={img.caption}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                    <Expand size={16} className="text-coffee-dark" />
                  </span>
                  <span className="font-body text-xs text-white font-medium px-3 text-center">
                    {img.caption}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
};

export default GalleryGrid;
