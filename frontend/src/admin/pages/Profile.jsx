import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, KeyRound, LogOut } from "lucide-react";
import EditProfile from "../components/profile/EditProfile";
import ChangePassword from "../components/profile/ChangePassword";
import LogoutModal from "../components/profile/LogoutModal";

const tabs = [
  { id: "edit", label: "Edit Profile", icon: User },
  { id: "password", label: "Change Password", icon: KeyRound },
];

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "password" ? "password" : "edit";
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth token / session here
    setShowLogoutModal(false);
    navigate("/admin/login");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
      >
        <div>
          <h1 className="font-heading font-bold text-xl sm:text-2xl text-coffee-dark">
            Account Settings
          </h1>
          <p className="font-body text-sm text-coffee-dark/50 mt-1">
            Manage your profile information and account security.
          </p>
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-colors shrink-0"
        >
          <LogOut size={16} />
          Logout
        </button>
      </motion.div>

      {/* Tabs — pill style, matching CategoryFormModal's tab switcher */}
      <div className="flex items-center gap-1 bg-coffee-cream rounded-full p-1 w-fit mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSearchParams({ tab: tab.id })}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full font-body text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
            >
              {isActive && (
                <motion.div
                  layoutId="active-profile-tab"
                  className="absolute inset-0 bg-coffee-dark rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 ${
                  isActive
                    ? "text-coffee-cream"
                    : "text-coffee-dark/60 hover:text-coffee-dark"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab content — fade + slide transition on switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {activeTab === "edit" && <EditProfile />}
          {activeTab === "password" && <ChangePassword />}
        </motion.div>
      </AnimatePresence>

      {/* Logout confirmation modal */}
      <LogoutModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Profile;
