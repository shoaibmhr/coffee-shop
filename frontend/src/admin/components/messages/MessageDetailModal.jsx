import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Calendar, MessageCircle, Trash2 } from "lucide-react";

function getWhatsAppNumber(phone) {
  if (!phone) return "";

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    digits = `92${digits.slice(1)}`;
  }

  return digits;
}

const MessageDetailModal = ({ message, onClose, onDelete }) => {
  if (!message) return null;

  const whatsappNumber = getWhatsAppNumber(message.phone);

  const submittedDate = new Date(message.submittedDate).toLocaleString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-md h-full bg-white overflow-y-auto flex flex-col"
        >
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/10">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
              Message Details
            </h3>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-coffee-cream"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 sm:p-6 flex-1">
            <h4 className="font-heading text-base font-bold text-coffee-dark">
              {message.name}
            </h4>

            <p className="font-body text-sm text-coffee-accent font-semibold mt-1">
              {message.subject}
            </p>

            <div className="mt-5 space-y-3 text-coffee-dark/60">
              <p className="flex items-center gap-2 text-xs">
                <Mail size={14} /> {message.email}
              </p>

              {message.phone && (
                <p className="flex items-center gap-2 text-xs">
                  <Phone size={14} /> {message.phone}
                </p>
              )}

              <p className="flex items-center gap-2 text-xs">
                <Calendar size={14} /> {submittedDate}
              </p>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-coffee-cream/40">
              <p className="font-body text-sm text-coffee-dark/80 leading-relaxed">
                {message.message}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <a
                href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent text-white font-body text-sm font-semibold transition-colors"
              >
                <Mail size={15} /> Email Customer
              </a>

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-body text-sm font-semibold transition-colors"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              )}

              {message.phone && (
                <a
                  href={`tel:${message.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-full border border-coffee-dark/20 text-coffee-dark font-body text-sm font-semibold"
                >
                  <Phone size={15} /> Call Customer
                </a>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6 border-t border-coffee-dark/10">
            <button
              onClick={() => onDelete(message)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-red-500 hover:bg-red-50 font-body font-semibold text-sm"
            >
              <Trash2 size={15} /> Delete Message
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageDetailModal;
