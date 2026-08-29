import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

const MenuTable = ({ items, onEdit, onDelete }) => {
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
              {["Product", "Category", "Price", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide px-5 sm:px-6 py-3.5"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-coffee-dark/5 last:border-0 hover:bg-coffee-cream/30 transition-colors"
              >
                <td className="px-5 sm:px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-11 h-11 rounded-lg object-cover shrink-0"
                    />
                    <span className="font-body text-sm font-semibold text-coffee-dark">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-coffee-dark/70">
                  {item.category}
                </td>
                <td className="px-5 sm:px-6 py-3.5 font-body text-sm font-semibold text-coffee-dark">
                  ${item.sizes[0].price.toFixed(2)}
                  {item.sizes.length > 1 &&
                    ` – $${item.sizes[item.sizes.length - 1].price.toFixed(2)}`}
                </td>
                <td className="px-5 sm:px-6 py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-body font-semibold border ${
                      item.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-500 border-gray-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 sm:px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-coffee-cream transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={15} className="text-coffee-dark/60" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={15} className="text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-coffee-dark/5">
        {items.map((item) => (
          <div key={item.id} className="p-4 flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-semibold text-coffee-dark truncate">
                {item.name}
              </p>
              <p className="font-body text-xs text-coffee-dark/50">
                {item.category}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-body text-xs font-semibold text-coffee-accent">
                  ${item.sizes[0].price.toFixed(2)}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-body font-semibold border ${
                    item.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                onClick={() => onEdit(item)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-coffee-cream transition-colors"
              >
                <Pencil size={14} className="text-coffee-dark/60" />
              </button>
              <button
                onClick={() => onDelete(item)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-body text-sm text-coffee-dark/50">
            No products found.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default MenuTable;
