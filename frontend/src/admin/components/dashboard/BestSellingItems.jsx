import { motion } from "framer-motion";
import { bestSellingItems } from "../../constants/dashboardData";

const BestSellingItems = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
      className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-6"
    >
      <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark mb-5">
        Best Selling Items
      </h3>

      <div className="space-y-4">
        {bestSellingItems.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="font-heading text-sm font-bold text-coffee-dark/30 w-4">
              {i + 1}
            </span>
            <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0">
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
                {item.sales} sold
              </p>
            </div>
            <span className="font-body text-sm font-semibold text-coffee-accent shrink-0">
              {item.revenue}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BestSellingItems;
