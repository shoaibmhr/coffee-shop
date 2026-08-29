import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Users, Clock, MessageSquare } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";
import { reservationStatuses } from "../../constants/reservationsData";

const statusBadgeMap = {
  Pending: "Pending",
  Confirmed: "Delivered",
  Cancelled: "Cancelled",
};

const ReservationDetailModal = ({ reservation, onClose, onStatusChange }) => {
  if (!reservation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/10 sticky top-0 bg-white z-10">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
                  {reservation.id}
                </h3>
                <StatusBadge status={statusBadgeMap[reservation.status]} />
              </div>
              <p className="font-body text-xs text-coffee-dark/50">
                {reservation.date} at {reservation.time}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-coffee-cream transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-coffee-dark" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Status update */}
            <div>
              <label className="font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide mb-2 block">
                Update Status
              </label>
              <select
                value={reservation.status}
                onChange={(e) => onStatusChange(reservation.id, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
              >
                {reservationStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer info */}
            <div>
              <h4 className="font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide mb-2">
                Customer Details
              </h4>
              <div className="bg-coffee-cream/50 rounded-xl p-4 space-y-2">
                <p className="font-body text-sm font-semibold text-coffee-dark">
                  {reservation.customerName}
                </p>
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <Phone size={13} />
                  <span className="font-body text-xs">{reservation.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <Mail size={13} />
                  <span className="font-body text-xs">{reservation.email}</span>
                </div>
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <Users size={13} />
                  <span className="font-body text-xs">
                    Party of {reservation.partySize}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-coffee-dark/60">
                  <Clock size={13} />
                  <span className="font-body text-xs">
                    {reservation.date} · {reservation.time}
                  </span>
                </div>
              </div>
            </div>

            {/* Special requests */}
            {reservation.specialRequests && (
              <div>
                <h4 className="font-body text-xs font-semibold text-coffee-dark/50 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <MessageSquare size={13} /> Special Requests
                </h4>
                <p className="font-body text-sm text-coffee-dark/70 leading-relaxed bg-coffee-cream/50 rounded-xl p-4">
                  {reservation.specialRequests}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReservationDetailModal;
