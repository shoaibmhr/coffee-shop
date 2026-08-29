import { useState } from "react";
import { motion } from "framer-motion";
import { Banknote, CreditCard, Smartphone } from "lucide-react";
import SaveBar from "../../common/SaveBar";
import { paymentMethods, deliverySettings } from "../../constants/settingsData";

const iconMap = {
  cash: Banknote,
  card: CreditCard,
  jazzcash: Smartphone,
  easypaisa: Smartphone,
};

const PaymentsTab = () => {
  const [methods, setMethods] = useState(paymentMethods);
  const [delivery, setDelivery] = useState(deliverySettings);

  const toggleMethod = (key) => {
    setMethods((prev) =>
      prev.map((m) => (m.key === key ? { ...m, enabled: !m.enabled } : m)),
    );
  };

  const handleDeliveryChange = (e) => {
    setDelivery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Payment methods */}
      <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-7 space-y-4">
        <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
          Payment Methods
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {methods.map((method) => {
            const Icon = iconMap[method.key];
            return (
              <div
                key={method.key}
                className="flex items-center justify-between p-3.5 rounded-xl bg-coffee-cream/50"
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={17} className="text-coffee-dark/60" />
                  <span className="font-body text-sm font-medium text-coffee-dark">
                    {method.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggleMethod(method.key)}
                  className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                    method.enabled ? "bg-coffee-accent" : "bg-coffee-dark/20"
                  }`}
                >
                  <motion.span
                    animate={{ x: method.enabled ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-7 space-y-4">
        <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
          Delivery Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
              Delivery Fee ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="deliveryFee"
              value={delivery.deliveryFee}
              onChange={handleDeliveryChange}
              className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
              Free Delivery Over ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="freeDeliveryOver"
              value={delivery.freeDeliveryOver}
              onChange={handleDeliveryChange}
              className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
              Pickup Ready Time (min)
            </label>
            <input
              type="number"
              name="pickupReadyTime"
              value={delivery.pickupReadyTime}
              onChange={handleDeliveryChange}
              className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>
      </div>

      <SaveBar onSave={() => console.log("Saved:", methods, delivery)} />
    </div>
  );
};

export default PaymentsTab;
