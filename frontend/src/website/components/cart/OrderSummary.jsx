import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

const OrderSummary = ({ totalPrice, itemCount }) => {
  const deliveryFee = totalPrice > 0 ? 2.5 : 0;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-6 sm:p-7 sticky top-24"
    >
      <h3 className="font-heading text-xl font-bold text-coffee-dark mb-6">
        Order Summary
      </h3>

      <div className="space-y-3.5 font-body text-sm">
        <div className="flex justify-between text-coffee-dark/60">
          <span>Subtotal ({itemCount} items)</span>
          <span className="font-semibold text-coffee-dark">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-coffee-dark/60">
          <span>Delivery Fee</span>
          <span className="font-semibold text-coffee-dark">
            ${deliveryFee.toFixed(2)}
          </span>
        </div>

        {/* Promo code */}
        <div className="flex items-center gap-2 pt-2">
          <div className="relative flex-1">
            <Tag
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-dark/35"
            />
            <input
              type="text"
              placeholder="Promo code"
              className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-coffee-dark/15 text-xs font-body focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
          <button className="px-4 py-2.5 rounded-lg bg-coffee-cream border border-coffee-dark/15 text-xs font-semibold text-coffee-dark hover:border-coffee-accent transition-colors">
            Apply
          </button>
        </div>
      </div>

      <div className="border-t border-coffee-dark/10 mt-5 pt-5 flex justify-between items-center">
        <span className="font-body text-base font-bold text-coffee-dark">
          Total
        </span>
        <span className="font-heading text-2xl font-bold text-coffee-accent">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      <Link
        to="/checkout"
        className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm uppercase tracking-wide"
      >
        Proceed to Checkout <ArrowRight size={16} />
      </Link>

      <Link
        to="/menu"
        className="mt-3 block text-center font-body text-xs text-coffee-dark/50 hover:text-coffee-accent transition-colors"
      >
        or continue browsing menu
      </Link>
    </motion.div>
  );
};

export default OrderSummary;
