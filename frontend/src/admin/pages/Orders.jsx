import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import OrdersTable from "../components/orders/OrdersTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import { ordersData, orderStatuses } from "../constants/ordersData";

const Orders = () => {
  const [orders, setOrders] = useState(ordersData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchTerm]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
    setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
          Orders
        </h1>
        <p className="font-body text-sm text-coffee-dark/50 mt-1">
          Manage and track all customer orders.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {["All", ...orderStatuses].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`shrink-0 px-4 py-2 rounded-full font-body text-xs sm:text-sm font-semibold transition-colors ${
                statusFilter === status
                  ? "bg-coffee-dark text-coffee-cream"
                  : "bg-white text-coffee-dark/60 border border-coffee-dark/10 hover:border-coffee-dark/25"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID or customer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      <OrdersTable orders={filteredOrders} onViewOrder={setSelectedOrder} />

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Orders;
