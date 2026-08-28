import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { addItem } from "../../redux/slices/cartSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const wishlisted = wishlistItems.some((i) => i.id === item.id);

  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem({ ...item, size: selectedSize }));
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(item));
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.25 } }}
      className="group relative"
    >
      {/* Image wrapper */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-coffee-dark/5 rounded-sm">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Wishlist heart + tooltip */}
      <div
        className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-10 right-0 whitespace-nowrap bg-coffee-dark text-coffee-cream text-[11px] font-body font-medium px-3 py-1.5 rounded-md shadow-lg pointer-events-none"
            >
              {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              <span className="absolute top-full right-3 w-2 h-2 bg-coffee-dark rotate-45 -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleToggleWishlist}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label="Toggle wishlist"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart
            size={15}
            className={
              wishlisted ? "fill-red-500 text-red-500" : "text-coffee-dark/60"
            }
          />
        </button>
      </div>

      {/* Thin separator line */}
      <div className="w-full h-px bg-coffee-dark/15 mt-4 sm:mt-5" />

      {/* Content */}
      <div className="pt-3.5 sm:pt-4">
        <h3 className="font-body text-sm sm:text-base md:text-lg font-bold text-coffee-dark uppercase tracking-wide">
          {item.name}
        </h3>
        <p className="font-body text-xs sm:text-sm font-semibold text-coffee-accent mt-1.5 sm:mt-2">
          Price: ${selectedSize.price.toFixed(2)}
        </p>
        <p className="font-body text-xs sm:text-sm text-coffee-dark/55 leading-relaxed mt-1.5 sm:mt-2 mb-3.5">
          {item.description}
        </p>

        {/* Size selector */}
        {item.sizes.length > 1 && (
          <div className="flex items-center gap-2 mb-4">
            {item.sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-body font-semibold uppercase tracking-wide border transition-colors ${
                  selectedSize.label === size.label
                    ? "bg-coffee-dark border-coffee-dark text-coffee-cream"
                    : "border-coffee-dark/20 text-coffee-dark/60 hover:border-coffee-dark/50"
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}
        {item.sizes.length === 1 && <div className="mb-4" />}

        <button
          onClick={handleAddToCart}
          disabled={justAdded}
          className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 border-2 font-body text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
            justAdded
              ? "bg-green-600 border-green-600 text-white"
              : "border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-coffee-cream"
          }`}
        >
          {justAdded ? (
            <>
              <Check size={14} /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={13} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
