import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";
import { recentOrders } from "../../constants/dashboardData";

const RecentOrdersTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/5">
        <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
          Recent Orders
        </h3>
        <Link
          to="/admin/orders"
          className="flex items-center gap-1 font-body text-xs sm:text-sm font-semibold text-coffee-accent hover:gap-2 transition-all"
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-coffee-dark/5">
              {["Order ID", "Customer", "Items", "Total", "Status", "Date"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide px-5 sm:px-6 py-3"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-coffee-dark/5 last:border-0 hover:bg-coffee-cream/30 transition-colors"
              >
                <td className="px-5 sm:px-6 py-4 font-body text-sm font-semibold text-coffee-dark">
                  {order.id}
                </td>
                <td className="px-5 sm:px-6 py-4 font-body text-sm text-coffee-dark/70">
                  {order.customer}
                </td>
                <td className="px-5 sm:px-6 py-4 font-body text-sm text-coffee-dark/70">
                  {order.items}
                </td>
                <td className="px-5 sm:px-6 py-4 font-body text-sm font-semibold text-coffee-dark">
                  {order.total}
                </td>
                <td className="px-5 sm:px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 sm:px-6 py-4 font-body text-sm text-coffee-dark/50">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-coffee-dark/5">
        {recentOrders.map((order) => (
          <div key={order.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-sm font-bold text-coffee-dark">
                {order.id}
              </span>
              <StatusBadge status={order.status} />
            </div>
            <p className="font-body text-sm text-coffee-dark/70">
              {order.customer}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-body text-xs text-coffee-dark/50">
                {order.items} items · {order.date}
              </span>
              <span className="font-body text-sm font-semibold text-coffee-dark">
                {order.total}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentOrdersTable;
