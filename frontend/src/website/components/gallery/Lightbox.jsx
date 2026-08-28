import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 bg-coffee-dark/95 z-[100] flex items-center justify-center p-4 sm:p-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-coffee-cream transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-2 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-coffee-cream transition-colors z-10"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Image */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-3xl w-full max-h-[80vh] flex flex-col items-center"
        >
          <img
            src={current.image}
            alt={current.caption}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 rounded-full bg-coffee-accent/20 text-coffee-accent text-[11px] font-body font-semibold uppercase tracking-wide">
              {current.category}
            </span>
            <p className="font-body text-sm text-coffee-cream/80">
              {current.caption}
            </p>
          </div>
        </motion.div>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-2 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-coffee-cream transition-colors z-10"
        >
          <ChevronRight size={22} />
        </button>

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-coffee-cream/50">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
