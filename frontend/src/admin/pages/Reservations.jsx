import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ReservationsTable from "../components/reservations/ReservationsTable";
import ReservationDetailModal from "../components/reservations/ReservationDetailModal";
import {
  reservationsData,
  reservationStatuses,
} from "../constants/reservationsData";

// Hardcoded "today" for consistent demo grouping
const TODAY = "Aug 29, 2026";
const TOMORROW = "Aug 30, 2026";

const Reservations = () => {
  const [reservations, setReservations] = useState(reservationsData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return reservations.filter((r) => {
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      const matchesSearch =
        r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [reservations, statusFilter, searchTerm]);

  const grouped = useMemo(() => {
    const today = filtered.filter((r) => r.date === TODAY);
    const tomorrow = filtered.filter((r) => r.date === TOMORROW);
    const upcoming = filtered.filter(
      (r) => r.date !== TODAY && r.date !== TOMORROW,
    );
    return { today, tomorrow, upcoming };
  }, [filtered]);

  const handleStatusChange = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
    setSelected((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
          Reservations
        </h1>
        <p className="font-body text-sm text-coffee-dark/50 mt-1">
          Manage table reservations from your customers.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {["All", ...reservationStatuses].map((status) => (
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
            placeholder="Search by name or phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      {/* Grouped tables */}
      <ReservationsTable
        groupLabel="Today"
        reservations={grouped.today}
        onView={setSelected}
      />
      <ReservationsTable
        groupLabel="Tomorrow"
        reservations={grouped.tomorrow}
        onView={setSelected}
      />
      <ReservationsTable
        groupLabel="Upcoming"
        reservations={grouped.upcoming}
        onView={setSelected}
      />

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl py-16 text-center">
          <p className="font-body text-sm text-coffee-dark/50">
            No reservations found.
          </p>
        </div>
      )}

      {selected && (
        <ReservationDetailModal
          reservation={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Reservations;
