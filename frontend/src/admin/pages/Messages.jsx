import { useEffect, useMemo, useState } from "react";
import { Search, Mail, Trash2 } from "lucide-react";
import MessageDetailModal from "../components/messages/MessageDetailModal";
import { apiRequest } from "../../services/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchMessages = async () => {
      try {
        const data = await apiRequest("/admin/messages");

        if (!cancelled) {
          setMessages(data.messages || []);
          setError("");
        }
      } catch (error) {
        if (!cancelled) {
          setError(error.message || "Could not load messages.");
        }
      }
    };

    fetchMessages();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return messages.filter((message) => {
      const matchesTab = activeTab === "All" || message.status === activeTab;

      const matchesSearch =
        (message.name || "").toLowerCase().includes(searchText) ||
        (message.subject || "").toLowerCase().includes(searchText) ||
        (message.email || "").toLowerCase().includes(searchText);

      return matchesTab && matchesSearch;
    });
  }, [messages, activeTab, search]);

  const newCount = messages.filter(
    (message) => message.status === "New",
  ).length;

  const openMessage = async (message) => {
    setSelectedMessage(message);

    if (message.status !== "New") {
      return;
    }

    try {
      await apiRequest(`/admin/messages/${message.id}/read`, {
        method: "PATCH",
      });

      setMessages((previous) =>
        previous.map((item) =>
          item.id === message.id ? { ...item, status: "Read" } : item,
        ),
      );

      setSelectedMessage((previous) =>
        previous ? { ...previous, status: "Read" } : previous,
      );
    } catch (error) {
      setError(error.message || "Could not mark message as read.");
    }
  };

  const deleteMessage = async (message) => {
    try {
      await apiRequest(`/admin/messages/${message.id}`, {
        method: "DELETE",
      });

      setMessages((previous) =>
        previous.filter((item) => item.id !== message.id),
      );

      setSelectedMessage(null);
    } catch (error) {
      setError(error.message || "Could not delete message.");
    }
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
            <Mail size={12} />
            {newCount} New
          </span>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-coffee-dark/10 rounded-full p-1 w-fit">
          {["All", "New", "Read"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-body text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-coffee-dark text-coffee-cream"
                  : "text-coffee-dark/60 hover:text-coffee-dark"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search messages..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-coffee-dark/15 bg-white font-body text-sm focus:outline-none focus:border-coffee-accent"
          />
        </div>
      </div>

      {/* Error */}
      {error && <p className="mb-4 font-body text-sm text-red-600">{error}</p>}

      {/* Messages List */}
      <div className="bg-white rounded-2xl border border-coffee-dark/10 overflow-hidden">
        {filtered.map((message) => (
          <div
            key={message.id}
            onClick={() => openMessage(message)}
            className="flex items-center gap-4 p-5 border-b border-coffee-dark/10 last:border-0 hover:bg-coffee-cream/30 cursor-pointer transition-colors"
          >
            {/* Message Info */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-sm font-bold text-coffee-dark">
                {message.status === "New" && "● "}
                {message.name}
              </p>

              <p className="font-body text-xs text-coffee-dark/50">
                {message.email}
              </p>

              <p className="font-body text-sm text-coffee-dark/70 mt-1 truncate">
                {message.subject}
              </p>
            </div>

            {/* Status */}
            <span
              className={`font-body text-xs font-medium ${
                message.status === "New"
                  ? "text-coffee-accent"
                  : "text-coffee-dark/50"
              }`}
            >
              {message.status}
            </span>

            {/* Delete */}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                deleteMessage(message);
              }}
              className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
              aria-label="Delete message"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        {/* Empty State */}
        {filtered.length === 0 && (
          <p className="py-16 text-center font-body text-sm text-coffee-dark/50">
            No messages found.
          </p>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={deleteMessage}
        />
      )}
    </div>
  );
};

export default Messages;
