import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import OrdersTable from "../components/orders/OrdersTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import { orderStatuses } from "../constants/ordersData";
import { apiRequest } from "../../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/admin/orders");
        setOrders(data.orders);
      } catch (error) {
        setError(error.message || "Could not load orders.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const search = searchTerm.toLowerCase();

      const matchesSearch =
        order.id.toLowerCase().includes(search) ||
        order.customer.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchTerm]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setError("");

      await apiRequest(`/admin/orders/${encodeURIComponent(orderId)}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((previous) =>
        previous.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );

      setSelectedOrder((previous) =>
        previous ? { ...previous, status: newStatus } : previous,
      );
    } catch (error) {
      setError(error.message || "Could not update order status.");
    }
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
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by ID or customer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="bg-white rounded-2xl py-16 text-center">
          <p className="font-body text-sm text-coffee-dark/50">
            Loading orders...
          </p>
        </div>
      ) : (
        <OrdersTable orders={filteredOrders} onViewOrder={setSelectedOrder} />
      )}

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
