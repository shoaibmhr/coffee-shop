import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Coffee,
  Tags,
   Mail,
  Users,
  Star,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Menu Items", icon: Coffee, href: "/admin/menu" },
  { name: "Categories", icon: Tags, href: "/admin/categories" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
   { name: "Messages", icon: Mail, href: "/admin/messages" },   
  { name: "Reviews", icon: Star, href: "/admin/reviews" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

// Standalone component — outside AdminSidebar, so it never gets recreated on render
const SidebarContent = ({ onLinkClick, onCloseClick }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6 border-b border-coffee-cream/10">
        <img
          src="/assets/logo.png"
          alt="Blend & Brew"
          className="w-9 h-9 rounded-full object-cover"
        />
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
            className="ml-auto lg:hidden text-coffee-cream/60"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
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
              className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-medium transition-colors ${
                isActive
                  ? "bg-coffee-accent text-white"
                  : "text-coffee-cream/60 hover:bg-coffee-cream/5 hover:text-coffee-cream"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-5 border-t border-coffee-cream/10">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-medium text-coffee-cream/60 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-coffee-dark shrink-0">
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
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-72 bg-coffee-dark z-50 lg:hidden"
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
