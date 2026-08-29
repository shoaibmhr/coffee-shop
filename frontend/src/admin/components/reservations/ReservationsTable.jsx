import { motion } from "framer-motion";
import { Eye, Users } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";

const statusBadgeMap = {
  Pending: "Pending",
  Confirmed: "Delivered",
  Cancelled: "Cancelled",
};

const ReservationsTable = ({ groupLabel, reservations, onView }) => {
  if (reservations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className="font-heading text-base sm:text-lg font-bold text-coffee-dark">
          {groupLabel}
        </h3>
        <span className="px-2 py-0.5 rounded-full bg-coffee-cream text-[11px] font-body font-semibold text-coffee-dark/60">
          {reservations.length}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-coffee-dark/5">
                {["Customer", "Phone", "Time", "Party Size", "Status", ""].map(
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
              {reservations.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-coffee-dark/5 last:border-0 hover:bg-coffee-cream/30 transition-colors"
                >
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm font-semibold text-coffee-dark">
                    {r.customerName}
                  </td>
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-coffee-dark/70">
                    {r.phone}
                  </td>
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-coffee-dark/70">
                    {r.time}
                  </td>
                  <td className="px-5 sm:px-6 py-3.5 font-body text-sm text-coffee-dark/70">
                    <div className="flex items-center gap-1.5">
                      <Users size={13} className="text-coffee-dark/40" />
                      {r.partySize}
                    </div>
                  </td>
                  <td className="px-5 sm:px-6 py-3.5">
                    <StatusBadge status={statusBadgeMap[r.status]} />
                  </td>
                  <td className="px-5 sm:px-6 py-3.5">
                    <button
                      onClick={() => onView(r)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-coffee-cream transition-colors"
                      aria-label="View reservation"
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
          {reservations.map((r) => (
            <button
              key={r.id}
              onClick={() => onView(r)}
              className="w-full text-left p-4 hover:bg-coffee-cream/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-body text-sm font-bold text-coffee-dark">
                  {r.customerName}
                </span>
                <StatusBadge status={statusBadgeMap[r.status]} />
              </div>
              <div className="flex items-center gap-3 text-coffee-dark/60">
                <span className="font-body text-xs">{r.time}</span>
                <span className="flex items-center gap-1 font-body text-xs">
                  <Users size={12} /> {r.partySize}
                </span>
                <span className="font-body text-xs">{r.phone}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReservationsTable;
