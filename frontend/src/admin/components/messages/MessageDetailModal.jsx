import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone, Calendar, Send, Trash2 } from "lucide-react";
import StatusBadge from "../../common/StatusBadge";

const MessageDetailModal = ({ message, onClose, onReply, onDelete }) => {
  const [replyText, setReplyText] = useState("");

  if (!message) return null;

  const submitted = new Date(message.submittedDate).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    // Backend integration later: POST /api/messages/{id}/reply
    // sends an actual email to message.email with replyText
    onReply(message);
    setReplyText("");
  };

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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md h-full bg-white overflow-y-auto flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/10 sticky top-0 bg-white z-10">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
              Message Details
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-coffee-cream transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-coffee-dark" />
            </button>
          </div>

          <div className="p-5 sm:p-6 flex-1">
            {/* Sender info */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-heading text-base font-bold text-coffee-dark">
                  {message.name}
                </h4>
                <p className="font-body text-sm text-coffee-accent font-semibold mt-1">
                  {message.subject}
                </p>
              </div>
              <StatusBadge status={message.status} />
            </div>

            {/* Contact info */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-coffee-dark/40 shrink-0" />
                <span className="font-body text-xs text-coffee-dark/60 truncate">
                  {message.email}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-coffee-dark/40 shrink-0" />
                <span className="font-body text-xs text-coffee-dark/60">
                  {message.phone}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar size={14} className="text-coffee-dark/40 shrink-0" />
                <span className="font-body text-xs text-coffee-dark/60">
                  {submitted}
                </span>
              </div>
            </div>

            {/* Message body */}
            <div className="mt-5 p-4 rounded-xl bg-coffee-cream/40">
              <p className="font-body text-sm text-coffee-dark/80 leading-relaxed">
                {message.message}
              </p>
            </div>

            {/* Reply box */}
            <form onSubmit={handleSendReply} className="mt-6">
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-2 block">
                Reply to {message.name.split(" ")[0]}
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                rows={4}
                placeholder="Type your reply..."
                className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm"
              >
                <Send size={14} /> Send Reply
              </button>
            </form>
          </div>

          {/* Footer action */}
          <div className="p-5 sm:p-6 border-t border-coffee-dark/10">
            <button
              onClick={() => onDelete(message)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-red-500 hover:bg-red-50 transition-colors font-body font-semibold text-sm"
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
