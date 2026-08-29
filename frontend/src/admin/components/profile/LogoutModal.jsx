import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";

// Usage: <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
const LogoutModal = ({ open, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 sm:p-7"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <LogOut size={20} className="text-red-500" />
            </div>

            <h2 className="font-heading font-bold text-lg text-coffee-dark">
              Log out of admin panel?
            </h2>
            <p className="font-body text-sm text-coffee-dark/50 mt-1.5">
              You'll need to sign in again to access the dashboard.
            </p>

            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
              <button
                onClick={onClose}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-lg font-body text-sm font-medium text-coffee-dark/70 border border-coffee-dark/15 hover:bg-coffee-dark/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="w-full sm:flex-1 px-4 py-2.5 rounded-full bg-coffee-dark hover:bg-red-500 transition-colors font-body font-semibold text-white text-sm"
              >
                Log Out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
