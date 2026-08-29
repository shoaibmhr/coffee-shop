import { Menu, Search, Bell, ChevronDown } from "lucide-react";

const AdminTopbar = ({ setMobileOpen }) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-white border-b border-coffee-dark/10 px-4 sm:px-6 py-4">
      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-coffee-dark shrink-0"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden sm:block max-w-xs w-full">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
          />
          <input
            type="text"
            placeholder="Search orders, items..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-coffee-cream/50 border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      {/* Right: notifications + profile */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-coffee-cream/50 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={19} className="text-coffee-dark/70" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-coffee-accent" />
        </button>

        <button className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=80&w=100&auto=format&fit=crop"
            alt="Admin"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden sm:block text-left">
            <p className="font-body text-sm font-semibold text-coffee-dark leading-tight">
              Admin User
            </p>
            <p className="font-body text-xs text-coffee-dark/50">Manager</p>
          </div>
          <ChevronDown
            size={16}
            className="hidden sm:block text-coffee-dark/40"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminTopbar;
