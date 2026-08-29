import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Mail, CreditCard } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";
import { orderStatuses } from "../../constants/ordersData";

const OrderDetailModal = ({ order, onClose, onStatusChange }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/10 sticky top-0 bg-white">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
                  {order.id}
                </h3>
                <StatusBadge status={order.status} />
              </div>
              <p className="font-body text-xs text-coffee-dark/50">
                {order.date} at {order.time}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-coffee-cream transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-coffee-dark" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Status update */}
            <div>
              <label className="font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide mb-2 block">
                Update Order Status
              </label>
              <select
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
              >
                {orderStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer info */}
            <div>
              <h4 className="font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide mb-2">
                Customer Details
              </h4>
              <div className="bg-coffee-cream/50 rounded-xl p-4 space-y-2">
                <p className="font-body text-sm font-semibold text-coffee-dark">
                  {order.customer}
                </p>
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <Phone size={13} />
                  <span className="font-body text-xs">{order.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <Mail size={13} />
                  <span className="font-body text-xs">{order.email}</span>
                </div>
                {order.address && (
                  <div className="flex items-start gap-2 text-coffee-dark/60">
                    <MapPin size={13} className="mt-0.5 shrink-0" />
                    <span className="font-body text-xs">{order.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <CreditCard size={13} />
                  <span className="font-body text-xs">
                    {order.payment} · {order.orderType}
                  </span>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <h4 className="font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide mb-2">
                Order Items
              </h4>
              <div className="space-y-2.5">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-coffee-dark/5 last:border-0"
                  >
                    <div>
                      <p className="font-body text-sm font-medium text-coffee-dark">
                        {item.name}
                      </p>
                      <p className="font-body text-xs text-coffee-dark/50">
                        {item.size} × {item.qty}
                      </p>
                    </div>
                    <span className="font-body text-sm font-semibold text-coffee-dark">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-coffee-dark/10">
              <span className="font-body text-base font-bold text-coffee-dark">
                Total
              </span>
              <span className="font-heading text-xl font-bold text-coffee-accent">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailModal;
