import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/image/logo.png";
import {
  LayoutDashboard,
  ShoppingBag,
  Coffee,
  Calendar,
  Tags,
  Mail,
  Users,
  Star,
  Settings,
  X,
  ChevronRight,
} from "lucide-react";

// Grouped nav items — grouping makes large admin panels easier to scan
const navGroups = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", icon: LayoutDashboard, href: "/admin" }],
  },
  {
    label: "Operations",
    items: [
      { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
      { name: "Menu Items", icon: Coffee, href: "/admin/menu" },
      { name: "Categories", icon: Tags, href: "/admin/categories" },
      { name: "Reservations", icon: Calendar, href: "/admin/reservations" },
    ],
  },
  {
    label: "People",
    items: [
      { name: "Customers", icon: Users, href: "/admin/customers" },
      { name: "Messages", icon: Mail, href: "/admin/messages", badge: 3 },
      { name: "Reviews", icon: Star, href: "/admin/reviews" },
    ],
  },
  {
    label: "System",
    items: [{ name: "Settings", icon: Settings, href: "/admin/settings" }],
  },
];

// Custom scrollbar styled to match the coffee-dark sidebar theme
// (scoped via class name since no scrollbar plugin is assumed in Tailwind config)
const ScrollbarStyles = () => (
  <style>{`
    .admin-sidebar-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .admin-sidebar-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
    .admin-sidebar-scroll::-webkit-scrollbar-thumb {
      background-color: rgba(214, 197, 172, 0.18);
      border-radius: 999px;
    }
    .admin-sidebar-scroll::-webkit-scrollbar-thumb:hover {
      background-color: rgba(214, 197, 172, 0.35);
    }
    .admin-sidebar-scroll {
      scrollbar-width: thin;
      scrollbar-color: rgba(214, 197, 172, 0.18) transparent;
    }
  `}</style>
);

// Standalone component — outside AdminSidebar, so it never gets recreated on render
const SidebarContent = ({ onLinkClick, onCloseClick }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      <ScrollbarStyles />

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6 border-b border-coffee-cream/10">
        <div className="w-10 h-10 rounded-full bg-coffee-cream flex items-center justify-center shrink-0 overflow-hidden  ring-2 ring-coffee-accent/30">
          <img
            src={logo}
            alt="Blend & Brew"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="font-heading font-bold text-coffee-cream text-base leading-tight">
            Blend & Brew
          </h2>
          <span className="font-body text-[10px] text-coffee-accent uppercase tracking-wide">
            Admin Panel
          </span>
        </div>
        {onCloseClick && (
          <button
            onClick={onCloseClick}
            className="ml-auto lg:hidden text-coffee-cream/60 hover:text-coffee-cream transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="admin-sidebar-scroll flex-1 px-4 py-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <p className="px-4 mb-2 font-body text-[11px] font-semibold text-coffee-cream/30 uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? location.pathname === "/admin"
                    : location.pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onLinkClick}
                    aria-current={isActive ? "page" : undefined}
                    className="relative flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm font-medium group transition-colors"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-bg"
                        className="absolute inset-0 bg-coffee-accent rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}

                    <span
                      className={`relative z-10 flex items-center gap-3 flex-1 ${
                        isActive
                          ? "text-white"
                          : "text-coffee-cream/60 group-hover:text-coffee-cream"
                      }`}
                    >
                      <Icon size={18} className="shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </span>

                    {item.badge && (
                      <span
                        className={`relative z-10 text-[11px] font-semibold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-coffee-accent text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight
                        size={14}
                        className="relative z-10 text-white/80"
                      />
                    )}

                    {/* Hover background for inactive items */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-lg bg-coffee-cream/0 group-hover:bg-coffee-cream/5 transition-colors" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-coffee-dark shrink-0 border-r border-coffee-cream/10">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-72 bg-coffee-dark z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent
                onLinkClick={() => setMobileOpen(false)}
                onCloseClick={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
