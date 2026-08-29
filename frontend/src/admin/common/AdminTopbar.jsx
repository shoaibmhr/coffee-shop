import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  KeyRound,
  LogOut,
} from "lucide-react";
import LogoutModal from "../components/profile/LogoutModal";
import GlobalSearch from "./GlobalSearch";

const AdminTopbar = ({ setMobileOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEditProfile = () => {
    setProfileOpen(false);
    navigate("/admin/profile");
  };

  const handleChangePassword = () => {
    setProfileOpen(false);
    navigate("/admin/profile?tab=password");
  };

  const handleLogoutClick = () => {
    setProfileOpen(false);
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    // TODO: clear auth token / session here
    setShowLogoutModal(false);
    navigate("/admin/login");
  };

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

        {/* Naya: */}
        <div className="hidden sm:block max-w-xs w-full">
          <GlobalSearch />
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

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-lg py-1 px-1.5 hover:bg-coffee-cream/50 transition-colors"
          >
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
              className={`hidden sm:block text-coffee-dark/40 transition-transform ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-coffee-dark/10 py-2 z-50">
              <div className="px-4 py-2 border-b border-coffee-dark/10 sm:hidden">
                <p className="font-body text-sm font-semibold text-coffee-dark">
                  Admin User
                </p>
                <p className="font-body text-xs text-coffee-dark/50">Manager</p>
              </div>

              <button
                onClick={handleEditProfile}
                className="flex items-center gap-3 w-full px-4 py-2.5 font-body text-sm text-coffee-dark hover:bg-coffee-cream/50 transition-colors"
              >
                <User size={16} className="text-coffee-dark/60" />
                Edit Profile
              </button>

              <button
                onClick={handleChangePassword}
                className="flex items-center gap-3 w-full px-4 py-2.5 font-body text-sm text-coffee-dark hover:bg-coffee-cream/50 transition-colors"
              >
                <KeyRound size={16} className="text-coffee-dark/60" />
                Change Password
              </button>

              <div className="my-1 border-t border-coffee-dark/10" />

              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-3 w-full px-4 py-2.5 font-body text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
      />
    </header>
  );
};

export default AdminTopbar;
