import { motion } from "framer-motion";
import {
  ShoppingBag,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { statsData } from "../../constants/dashboardData";

const icons = [ShoppingBag, DollarSign, Users, Clock];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const StatsCards = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
    >
      {statsData.map((stat, i) => {
        const Icon = icons[i];
        const isUp = stat.trend === "up";
        return (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-coffee-dark/5 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-coffee-cream flex items-center justify-center">
                <Icon size={20} className="text-coffee-accent" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-body font-semibold ${
                  isUp ? "text-green-600" : "text-red-500"
                }`}
              >
                {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {stat.change}
              </span>
            </div>
            <p className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
              {stat.value}
            </p>
            <p className="font-body text-xs sm:text-sm text-coffee-dark/50 mt-1">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsCards;
