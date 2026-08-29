import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Users, ShoppingBag, DollarSign } from "lucide-react";
import { initialCustomers } from "../constants/customersAdminData";
import CustomerDetailModal from "../components/customers/CustomerDetailModal";
import StatusBadge from "../common/StatusBadge";

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrdersAll = customers.reduce((sum, c) => sum + c.totalOrders, 0);
  const avgOrderValue = totalOrdersAll > 0 ? totalRevenue / totalOrdersAll : 0;

  const handleToggleStatus = (customer) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customer.id
          ? { ...c, status: c.status === "Active" ? "Blocked" : "Active" }
          : c
      )
    );
    setSelectedCustomer((prev) =>
      prev
        ? { ...prev, status: prev.status === "Active" ? "Blocked" : "Active" }
        : prev
    );
  };

  const summaryCards = [
    { label: "Total Customers", value: totalCustomers, icon: Users },
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign },
    { label: "Avg. Order Value", value: `$${avgOrderValue.toFixed(2)}`, icon: ShoppingBag },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-coffee-dark">
          Customers
        </h1>
        <p className="font-body text-sm text-coffee-dark/50 mt-1">
          View and manage everyone who's ordered from Blend & Brew.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {summaryCards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-coffee-dark/8 p-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-full bg-coffee-accent/10 flex items-center justify-center shrink-0">
              <Icon size={19} className="text-coffee-accent" />
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-coffee-dark">
                {value}
              </p>
              <p className="font-body text-xs text-coffee-dark/50">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-coffee-dark/15 bg-white font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-coffee-dark/8 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-coffee-dark/8 bg-coffee-cream/40">
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Customer
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Orders
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Total Spent
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Status
              </th>
              <th className="text-right font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((customer) => (
                <motion.tr
                  key={customer.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="border-b border-coffee-dark/6 last:border-0 hover:bg-coffee-cream/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-body text-sm font-semibold text-coffee-dark truncate">
                          {customer.name}
                        </p>
                        <p className="font-body text-xs text-coffee-dark/45 truncate">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-coffee-dark/70">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm font-semibold text-coffee-dark">
                      ${customer.totalSpent.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        aria-label="View customer details"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-coffee-dark/60 hover:text-coffee-accent hover:bg-coffee-accent/10 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-14 font-body text-sm text-coffee-dark/40">
            No customers found.
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {filtered.map((customer) => (
            <motion.button
              key={customer.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(customer)}
              className="w-full text-left bg-white rounded-xl border border-coffee-dark/8 p-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-body text-sm font-semibold text-coffee-dark truncate">
                      {customer.name}
                    </h3>
                    <StatusBadge status={customer.status} />
                  </div>
                  <p className="font-body text-xs text-coffee-dark/45 truncate mt-0.5">
                    {customer.email}
                  </p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <span className="font-body text-xs text-coffee-dark/60">
                      {customer.totalOrders} orders
                    </span>
                    <span className="font-body text-xs font-semibold text-coffee-dark">
                      ${customer.totalSpent.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-14 font-body text-sm text-coffee-dark/40">
            No customers found.
          </div>
        )}
      </div>

      {/* Detail slide-over */}
      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  );
};

export default Customers;
