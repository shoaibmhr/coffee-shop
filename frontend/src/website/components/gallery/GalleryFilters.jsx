import { motion } from "framer-motion";
import { galleryCategories } from "../../constants/galleryData";

const GalleryFilters = ({ activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-4">
      {galleryCategories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-body text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${
              isActive
                ? "text-coffee-cream"
                : "text-coffee-dark/60 hover:text-coffee-dark"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                className="absolute inset-0 bg-coffee-dark rounded-full"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
};

export default GalleryFilters;
