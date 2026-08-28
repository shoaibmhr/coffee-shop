import { motion } from "framer-motion";

const OrderReview = ({
  cartItems,
  totalPrice,
  orderType,
  onPlaceOrder,
  isSubmitting,
}) => {
  const deliveryFee = orderType === "delivery" ? 2.5 : 0;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-6 sm:p-7 sticky top-24"
    >
      <h3 className="font-heading text-xl font-bold text-coffee-dark mb-5">
        Your Order
      </h3>

      <div className="max-h-64 overflow-y-auto space-y-3.5 pr-1">
        {cartItems.map((item) => (
          <div key={item.cartId} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-coffee-dark/5 shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-coffee-dark truncate">
                {item.name}
              </p>
              <p className="font-body text-xs text-coffee-dark/50">
                {item.size} × {item.quantity}
              </p>
            </div>
            <span className="font-body text-sm font-semibold text-coffee-dark shrink-0">
              ${(item.numericPrice * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-coffee-dark/10 mt-5 pt-5 space-y-2.5 font-body text-sm">
        <div className="flex justify-between text-coffee-dark/60">
          <span>Subtotal</span>
          <span className="font-semibold text-coffee-dark">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-coffee-dark/60">
          <span>{orderType === "delivery" ? "Delivery Fee" : "Pickup"}</span>
          <span className="font-semibold text-coffee-dark">
            {orderType === "delivery" ? `$${deliveryFee.toFixed(2)}` : "Free"}
          </span>
        </div>
      </div>

      <div className="border-t border-coffee-dark/10 mt-4 pt-4 flex justify-between items-center">
        <span className="font-body text-base font-bold text-coffee-dark">
          Total
        </span>
        <span className="font-heading text-2xl font-bold text-coffee-accent">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className="mt-6 w-full py-3.5 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm uppercase tracking-wide disabled:opacity-60"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </motion.div>
  );
};

export default OrderReview;
