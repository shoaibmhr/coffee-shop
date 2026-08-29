import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Trash2 } from "lucide-react";
import { initialMessages } from "../constants/messagesAdminData";
import MessageDetailModal from "../components/messages/MessageDetailModal";
import StatusBadge from "../common/StatusBadge";

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const filterTabs = ["All", "New", "Read", "Replied"];

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return "Just now";
  if (diffHrs < 24) return `${diffHrs}h ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays}d ago`;
};

const Messages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const newCount = messages.filter((m) => m.status === "New").length;

  const filtered = messages
    .filter((m) => activeTab === "All" || m.status === activeTab)
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.subject.toLowerCase().includes(search.toLowerCase())
    );

  const handleOpen = (message) => {
    setSelectedMessage(message);
    if (message.status === "New") {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, status: "Read" } : m))
      );
    }
  };

  const handleReply = (message) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === message.id ? { ...m, status: "Replied" } : m))
    );
    setSelectedMessage((prev) => (prev ? { ...prev, status: "Replied" } : prev));
  };

  const confirmDelete = () => {
    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    if (selectedMessage?.id === deleteTarget.id) setSelectedMessage(null);
    setDeleteTarget(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-coffee-dark">
            Messages
          </h1>
          <p className="font-body text-sm text-coffee-dark/50 mt-1">
            Contact form submissions from your website.
          </p>
        </div>
        {newCount > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coffee-accent/10 text-coffee-accent font-body text-xs font-semibold">
            <Mail size={12} /> {newCount} New
          </span>
        )}
      </div>

      {/* Filter tabs + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 bg-white border border-coffee-dark/10 rounded-full p-1 w-fit overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-body text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-coffee-dark text-coffee-cream"
                  : "text-coffee-dark/60 hover:text-coffee-dark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-coffee-dark/15 bg-white font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-coffee-dark/8 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-coffee-dark/8 bg-coffee-cream/40">
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                From
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Subject
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Received
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
              {filtered.map((msg) => (
                <motion.tr
                  key={msg.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  onClick={() => handleOpen(msg)}
                  className="border-b border-coffee-dark/6 last:border-0 hover:bg-coffee-cream/20 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      {msg.status === "New" && (
                        <span className="w-2 h-2 rounded-full bg-coffee-accent shrink-0" />
                      )}
                      <div>
                        <p
                          className={`font-body text-sm truncate ${
                            msg.status === "New"
                              ? "font-bold text-coffee-dark"
                              : "font-semibold text-coffee-dark/80"
                          }`}
                        >
                          {msg.name}
                        </p>
                        <p className="font-body text-xs text-coffee-dark/45 truncate">
                          {msg.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-coffee-dark/70 max-w-xs line-clamp-1">
                      {msg.subject}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-xs text-coffee-dark/50">
                      {timeAgo(msg.submittedDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={msg.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(msg);
                        }}
                        aria-label="Delete message"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-coffee-dark/60 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
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
            No messages found.
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {filtered.map((msg) => (
            <motion.button
              key={msg.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              onClick={() => handleOpen(msg)}
              className="w-full text-left bg-white rounded-xl border border-coffee-dark/8 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  {msg.status === "New" && (
                    <span className="w-2 h-2 rounded-full bg-coffee-accent shrink-0 mt-1.5" />
                  )}
                  <div className="min-w-0">
                    <p
                      className={`font-body text-sm truncate ${
                        msg.status === "New"
                          ? "font-bold text-coffee-dark"
                          : "font-semibold text-coffee-dark/80"
                      }`}
                    >
                      {msg.name}
                    </p>
                    <p className="font-body text-xs text-coffee-dark/70 mt-0.5 truncate">
                      {msg.subject}
                    </p>
                  </div>
                </div>
                <StatusBadge status={msg.status} />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-coffee-dark/8">
                <span className="font-body text-xs text-coffee-dark/45">
                  {timeAgo(msg.submittedDate)}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(msg);
                  }}
                  className="flex items-center gap-1 text-xs font-body font-semibold text-red-500"
                >
                  <Trash2 size={12} /> Delete
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-14 font-body text-sm text-coffee-dark/40">
            No messages found.
          </div>
        )}
      </div>

      {/* Detail slide-over */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onReply={handleReply}
          onDelete={(msg) => setDeleteTarget(msg)}
        />
      )}

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteTarget(null)}
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-sm p-6"
            >
              <h3 className="font-heading text-lg font-bold text-coffee-dark">
                Delete this message?
              </h3>
              <p className="font-body text-sm text-coffee-dark/55 mt-2 leading-relaxed">
                This will permanently remove the message from{" "}
                {deleteTarget.name}. This can't be undone.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-full border border-coffee-dark/15 font-body text-sm font-semibold text-coffee-dark hover:bg-coffee-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors font-body text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;
