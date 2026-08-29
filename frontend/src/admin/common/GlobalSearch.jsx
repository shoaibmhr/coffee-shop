import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag,  Calendar, X } from "lucide-react";
import { ordersData } from "../constants/ordersData";
import { menuAdminItems } from "../constants/menuAdminData";
import { reservationsData } from "../constants/reservationsData";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { orders: [], menu: [], reservations: [] };
    const q = query.toLowerCase();

    return {
      orders: ordersData
        .filter(
          (o) =>
            o.id.toLowerCase().includes(q) ||
            o.customer.toLowerCase().includes(q),
        )
        .slice(0, 3),
      menu: menuAdminItems
        .filter((m) => m.name.toLowerCase().includes(q))
        .slice(0, 3),
      reservations: reservationsData
        .filter(
          (r) =>
            r.customerName.toLowerCase().includes(q) ||
            r.id.toLowerCase().includes(q),
        )
        .slice(0, 3),
    };
  }, [query]);

  const hasResults =
    results.orders.length > 0 ||
    results.menu.length > 0 ||
    results.reservations.length > 0;

  const goTo = (path) => {
    navigate(path);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xs">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search orders, items, reservations..."
          className="w-full pl-10 pr-8 py-2.5 rounded-lg bg-coffee-cream/50 border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-coffee-dark/40 hover:text-coffee-dark transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-full sm:w-96 bg-white rounded-xl shadow-xl border border-coffee-dark/10 max-h-96 overflow-y-auto z-50"
          >
            {!hasResults ? (
              <div className="p-6 text-center">
                <p className="font-body text-sm text-coffee-dark/50">
                  No results found for "{query}"
                </p>
              </div>
            ) : (
              <div className="py-2">
                {/* Orders */}
                {results.orders.length > 0 && (
                  <div className="px-2 mb-1">
                    <p className="px-3 py-1.5 font-body text-[11px] font-semibold text-coffee-dark/40 uppercase tracking-wide">
                      Orders
                    </p>
                    {results.orders.map((o) => (
                      <button
                        key={o.id}
                        onClick={() => goTo("/admin/orders")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-coffee-cream/50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-coffee-cream flex items-center justify-center shrink-0">
                          <ShoppingBag
                            size={14}
                            className="text-coffee-accent"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-body text-sm font-semibold text-coffee-dark truncate">
                            {o.id}
                          </p>
                          <p className="font-body text-xs text-coffee-dark/50 truncate">
                            {o.customer} · ${o.total.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Menu Items */}
                {results.menu.length > 0 && (
                  <div className="px-2 mb-1">
                    <p className="px-3 py-1.5 font-body text-[11px] font-semibold text-coffee-dark/40 uppercase tracking-wide">
                      Menu Items
                    </p>
                    {results.menu.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => goTo("/admin/menu")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-coffee-cream/50 transition-colors text-left"
                      >
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-body text-sm font-semibold text-coffee-dark truncate">
                            {m.name}
                          </p>
                          <p className="font-body text-xs text-coffee-dark/50 truncate">
                            {m.category}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Reservations */}
                {results.reservations.length > 0 && (
                  <div className="px-2">
                    <p className="px-3 py-1.5 font-body text-[11px] font-semibold text-coffee-dark/40 uppercase tracking-wide">
                      Reservations
                    </p>
                    {results.reservations.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => goTo("/admin/reservations")}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-coffee-cream/50 transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-coffee-cream flex items-center justify-center shrink-0">
                          <Calendar size={14} className="text-coffee-accent" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-body text-sm font-semibold text-coffee-dark truncate">
                            {r.customerName}
                          </p>
                          <p className="font-body text-xs text-coffee-dark/50 truncate">
                            {r.date} · {r.time}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;
