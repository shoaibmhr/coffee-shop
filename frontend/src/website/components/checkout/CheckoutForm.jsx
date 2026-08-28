import { motion, AnimatePresence } from "framer-motion";
import { Clock, CreditCard, Banknote, Smartphone } from "lucide-react";
import OrderTypeToggle from "./OrderTypeToggle";

const paymentOptions = [
  { value: "cash", label: "Cash", icon: Banknote },
  { value: "card", label: "Card", icon: CreditCard },
  { value: "jazzcash", label: "JazzCash", icon: Smartphone },
  { value: "easypaisa", label: "Easypaisa", icon: Smartphone },
];

const CheckoutForm = ({ formData, setFormData, orderType, setOrderType }) => {
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showWalletNumber =
    formData.payment === "jazzcash" || formData.payment === "easypaisa";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm p-6 sm:p-8"
    >
      <h2 className="font-heading text-xl sm:text-2xl font-bold text-coffee-dark mb-5">
        Order Details
      </h2>

      <OrderTypeToggle orderType={orderType} setOrderType={setOrderType} />

      {/* Customer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
            className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
        />
      </div>

      {/* Conditional: Delivery Address or Pickup Time */}
      <AnimatePresence mode="wait">
        {orderType === "delivery" ? (
          <motion.div
            key="delivery"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-4"
          >
            <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
              Delivery Address
            </label>
            <textarea
              name="address"
              required
              rows={2}
              value={formData.address}
              onChange={handleChange}
              placeholder="House #, Street, Area, City"
              className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors resize-none"
            />
          </motion.div>
        ) : (
          <motion.div
            key="pickup"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-4"
          >
            <div className="flex items-start gap-3 p-4 rounded-lg bg-coffee-cream">
              <Clock size={18} className="text-coffee-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-sm font-semibold text-coffee-dark">
                  Pickup from: Blend & Brew, 123 Market Street
                </p>
                <p className="font-body text-xs text-coffee-dark/55 mt-1">
                  Your order will be ready in approximately 15–20 minutes.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-2 block">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          {paymentOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = formData.payment === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  isActive
                    ? "border-coffee-accent bg-coffee-accent/5"
                    : "border-coffee-dark/10"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={opt.value}
                  checked={isActive}
                  onChange={handleChange}
                  className="accent-coffee-accent"
                />
                <Icon size={16} className="text-coffee-dark/60 shrink-0" />
                <span className="font-body text-sm text-coffee-dark">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>

        {/* JazzCash / Easypaisa wallet number field */}
        <AnimatePresence>
          {showWalletNumber && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-3"
            >
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
                {formData.payment === "jazzcash" ? "JazzCash" : "Easypaisa"}{" "}
                Account Number
              </label>
              <input
                type="tel"
                name="walletNumber"
                required
                value={formData.walletNumber}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
              />
              <p className="font-body text-xs text-coffee-dark/45 mt-1.5">
                You'll receive a payment request on this number to confirm.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Special Instructions */}
      <div>
        <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
          Special Instructions (optional)
        </label>
        <textarea
          name="notes"
          rows={2}
          value={formData.notes}
          onChange={handleChange}
          placeholder="Extra hot, no sugar, leave at door..."
          className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors resize-none"
        />
      </div>
    </motion.div>
  );
};

export default CheckoutForm;
