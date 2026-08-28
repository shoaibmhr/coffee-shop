import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../../../redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30, transition: { duration: 0.25 } }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-6 border-b border-coffee-dark/10"
    >
      <div className="w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden bg-coffee-dark/5 shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-base sm:text-lg font-bold text-coffee-dark truncate">
          {item.name}
        </h3>
        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-coffee-cream text-[10px] font-body font-semibold uppercase tracking-wide text-coffee-dark/60">
          {item.size}
        </span>
        <p className="font-body text-sm text-coffee-accent font-semibold mt-1.5">
          ${item.numericPrice.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-3 border border-coffee-dark/15 rounded-full px-2 py-1.5 w-fit">
        <button
          onClick={() => dispatch(decreaseQty(item.cartId))}
          aria-label="Decrease quantity"
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-coffee-dark hover:text-coffee-cream text-coffee-dark transition-colors"
        >
          <Minus size={13} />
        </button>
        <span className="font-body text-sm font-semibold text-coffee-dark w-5 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => dispatch(increaseQty(item.cartId))}
          aria-label="Increase quantity"
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-coffee-dark hover:text-coffee-cream text-coffee-dark transition-colors"
        >
          <Plus size={13} />
        </button>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-28 shrink-0">
        <span className="font-body text-sm sm:text-base font-bold text-coffee-dark">
          ${(item.numericPrice * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => dispatch(removeItem(item.cartId))}
          aria-label="Remove item"
          className="w-8 h-8 rounded-full flex items-center justify-center text-coffee-dark/40 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
