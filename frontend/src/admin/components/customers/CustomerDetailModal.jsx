import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  DollarSign,
} from "lucide-react";
import StatusBadge from "../../common/StatusBadge";

const CustomerDetailModal = ({ customer, onClose, onToggleStatus }) => {
  if (!customer) return null;

  const joined = new Date(customer.joinedDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm h-full bg-white overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/10 sticky top-0 bg-white z-10">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
              Customer Details
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-coffee-cream transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-coffee-dark" />
            </button>
          </div>

          <div className="p-5 sm:p-6">
            {/* Profile */}
            <div className="flex flex-col items-center text-center">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-20 h-20 rounded-full object-cover shadow-md"
              />
              <h4 className="font-heading text-lg font-bold text-coffee-dark mt-4">
                {customer.name}
              </h4>
              <div className="mt-2">
                <StatusBadge status={customer.status} />
              </div>
            </div>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-coffee-cream/40">
                <Mail size={16} className="text-coffee-accent shrink-0" />
                <span className="font-body text-sm text-coffee-dark/80 truncate">
                  {customer.email}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-coffee-cream/40">
                <Phone size={16} className="text-coffee-accent shrink-0" />
                <span className="font-body text-sm text-coffee-dark/80">
                  {customer.phone}
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-coffee-cream/40">
                <Calendar size={16} className="text-coffee-accent shrink-0" />
                <span className="font-body text-sm text-coffee-dark/80">
                  Joined {joined}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="rounded-xl border border-coffee-dark/8 p-4 text-center">
                <ShoppingBag size={18} className="text-coffee-accent mx-auto" />
                <p className="font-heading text-xl font-bold text-coffee-dark mt-2">
                  {customer.totalOrders}
                </p>
                <p className="font-body text-xs text-coffee-dark/50 mt-0.5">
                  Total Orders
                </p>
              </div>
              <div className="rounded-xl border border-coffee-dark/8 p-4 text-center">
                <DollarSign size={18} className="text-coffee-accent mx-auto" />
                <p className="font-heading text-xl font-bold text-coffee-dark mt-2">
                  ${customer.totalSpent.toFixed(2)}
                </p>
                <p className="font-body text-xs text-coffee-dark/50 mt-0.5">
                  Total Spent
                </p>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={() => onToggleStatus(customer)}
              className={`w-full mt-6 py-3.5 rounded-full font-body font-semibold text-sm transition-colors ${
                customer.status === "Active"
                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                  : "bg-coffee-dark text-coffee-cream hover:bg-coffee-accent"
              }`}
            >
              {customer.status === "Active"
                ? "Block Customer"
                : "Unblock Customer"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomerDetailModal;
