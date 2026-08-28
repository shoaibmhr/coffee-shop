import { motion } from "framer-motion";
import { Store, Bike } from "lucide-react";

const OrderTypeToggle = ({ orderType, setOrderType }) => {
  const options = [
    { value: "pickup", label: "Pickup", icon: Store },
    { value: "delivery", label: "Delivery", icon: Bike },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = orderType === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setOrderType(opt.value)}
            className={`relative flex flex-col items-center justify-center gap-2 py-5 rounded-xl border-2 transition-colors duration-300 ${
              isActive
                ? "border-coffee-accent bg-coffee-accent/5"
                : "border-coffee-dark/10 hover:border-coffee-dark/25"
            }`}
          >
            <Icon
              size={22}
              className={
                isActive ? "text-coffee-accent" : "text-coffee-dark/50"
              }
            />
            <span
              className={`font-body text-sm font-semibold uppercase tracking-wide ${
                isActive ? "text-coffee-accent" : "text-coffee-dark/60"
              }`}
            >
              {opt.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="order-type-check"
                className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coffee-accent"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default OrderTypeToggle;
