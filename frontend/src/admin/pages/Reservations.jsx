import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import ReservationsTable from "../components/reservations/ReservationsTable";
import ReservationDetailModal from "../components/reservations/ReservationDetailModal";
import { reservationStatuses } from "../constants/reservationsData";
import { apiRequest } from "../../services/api";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReservations = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/admin/reservations");
        setReservations(data.reservations);
      } catch (error) {
        setError(error.message || "Could not load reservations.");
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, []);

  const filtered = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return reservations.filter((reservation) => {
      const matchesStatus =
        statusFilter === "All" || reservation.status === statusFilter;

      const matchesSearch =
        reservation.customerName.toLowerCase().includes(search) ||
        reservation.phone.includes(search) ||
        reservation.id.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [reservations, statusFilter, searchTerm]);

  const grouped = useMemo(() => {
    const today = new Date().toLocaleDateString("en-CA");
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toLocaleDateString("en-CA");

    return {
      today: filtered.filter((reservation) => reservation.dateKey === today),
      tomorrow: filtered.filter(
        (reservation) => reservation.dateKey === tomorrow,
      ),
      upcoming: filtered.filter(
        (reservation) =>
          reservation.dateKey !== today && reservation.dateKey !== tomorrow,
      ),
    };
  }, [filtered]);

  const handleStatusChange = async (id, newStatus) => {
    const reservation = reservations.find((item) => item.id === id);

    if (!reservation) return;

    try {
      setError("");

      await apiRequest(`/admin/reservations/${reservation.databaseId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setReservations((previous) =>
        previous.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );

      setSelected((previous) =>
        previous ? { ...previous, status: newStatus } : previous,
      );
    } catch (error) {
      setError(error.message || "Could not update reservation status.");
    }
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
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="bg-white rounded-2xl py-16 text-center">
          <p className="font-body text-sm text-coffee-dark/50">
            Loading reservations...
          </p>
        </div>
      ) : (
        <>
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
        </>
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
