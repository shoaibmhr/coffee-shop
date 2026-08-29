import { useState } from "react";
import { motion } from "framer-motion";
import SaveBar from "../../common/SaveBar";
import { notificationSettings } from "../../constants/settingsData";

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(notificationSettings);

  const toggle = (key) => {
    setNotifications((prev) =>
      prev.map((n) => (n.key === key ? { ...n, enabled: !n.enabled } : n)),
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-7 space-y-4">
      <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
        Notification Preferences
      </h3>
      <p className="font-body text-sm text-coffee-dark/50 -mt-2">
        Choose which alerts you want to receive.
      </p>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.key}
            className="flex items-center justify-between p-3.5 rounded-xl bg-coffee-cream/50"
          >
            <span className="font-body text-sm font-medium text-coffee-dark">
              {n.label}
            </span>
            <button
              type="button"
              onClick={() => toggle(n.key)}
              className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                n.enabled ? "bg-coffee-accent" : "bg-coffee-dark/20"
              }`}
            >
              <motion.span
                animate={{ x: n.enabled ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
              />
            </button>
          </div>
        ))}
      </div>

      <SaveBar onSave={() => console.log("Saved:", notifications)} />
    </div>
  );
};

export default NotificationsTab;
