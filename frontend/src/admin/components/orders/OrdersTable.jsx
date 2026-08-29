import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";

const OrdersTable = ({ orders, onViewOrder }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 overflow-hidden"
    >
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-coffee-dark/5">
              {[
                "Order ID",
                "Customer",
                "Items",
                "Total",
                "Status",
                "Date",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide px-5 sm:px-6 py-3.5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
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
                  {order.items.length}
                </td>
                <td className="px-5 sm:px-6 py-4 font-body text-sm font-semibold text-coffee-dark">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-5 sm:px-6 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 sm:px-6 py-4 font-body text-sm text-coffee-dark/50">
                  {order.date}
                </td>
                <td className="px-5 sm:px-6 py-4">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-coffee-cream transition-colors"
                    aria-label="View order"
                  >
                    <Eye size={16} className="text-coffee-dark/60" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-coffee-dark/5">
        {orders.map((order) => (
          <button
            key={order.id}
            onClick={() => onViewOrder(order)}
            className="w-full text-left p-4 hover:bg-coffee-cream/30 transition-colors"
          >
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
                {order.items.length} items · {order.date}
              </span>
              <span className="font-body text-sm font-semibold text-coffee-dark">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-body text-sm text-coffee-dark/50">
            No orders found.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default OrdersTable;
