import { useState } from "react";
import { motion } from "framer-motion";
import { Store, Clock, CreditCard, Bell, Share2 } from "lucide-react";
import BusinessInfoTab from "../components/settings/BusinessInfoTab";
import HoursTab from "../components/settings/HoursTab";
import PaymentsTab from "../components/settings/PaymentsTab";
import NotificationsTab from "../components/settings/NotificationsTab";
import SocialLinksTab from "../components/settings/SocialLinksTab";

const tabs = [
  { key: "business", label: "Business Info", icon: Store },
  { key: "hours", label: "Operating Hours", icon: Clock },
  { key: "payments", label: "Payments & Delivery", icon: CreditCard },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "social", label: "Social Links", icon: Share2 },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("business");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
          Settings
        </h1>
        <p className="font-body text-sm text-coffee-dark/50 mt-1">
          Manage your cafe's business information and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 sm:gap-6 items-start">
        {/* Tabs sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-2 lg:sticky lg:top-24">
          <div className="flex lg:flex-col gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex items-center gap-2.5 px-4 py-3 rounded-xl font-body text-sm font-medium transition-colors shrink-0 lg:w-full text-left ${
                    isActive
                      ? "bg-coffee-dark text-coffee-cream"
                      : "text-coffee-dark/60 hover:bg-coffee-cream/50"
                  }`}
                >
                  <Icon size={17} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="lg:col-span-3"
        >
          {activeTab === "business" && <BusinessInfoTab />}
          {activeTab === "hours" && <HoursTab />}
          {activeTab === "payments" && <PaymentsTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "social" && <SocialLinksTab />}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
