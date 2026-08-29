import { useState } from "react";
import { motion } from "framer-motion";
import SaveBar from "../../common/SaveBar";
import { operatingHours } from "../../constants/settingsData";

const HoursTab = () => {
  const [hours, setHours] = useState(operatingHours);

  const updateDay = (index, field, value) => {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h)),
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-7 space-y-5">
      <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
        Operating Hours
      </h3>

      <div className="space-y-3">
        {hours.map((day, i) => (
          <div
            key={day.day}
            className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3.5 rounded-xl transition-colors ${
              day.closed ? "bg-coffee-cream/30" : "bg-coffee-cream/50"
            }`}
          >
            <span className="font-body text-sm font-semibold text-coffee-dark w-full sm:w-28 shrink-0">
              {day.day}
            </span>

            {!day.closed ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  value={day.open}
                  onChange={(e) => updateDay(i, "open", e.target.value)}
                  className="px-3 py-2 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                />
                <span className="font-body text-sm text-coffee-dark/40">
                  to
                </span>
                <input
                  type="time"
                  value={day.close}
                  onChange={(e) => updateDay(i, "close", e.target.value)}
                  className="px-3 py-2 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                />
              </div>
            ) : (
              <span className="flex-1 font-body text-sm text-coffee-dark/40 italic">
                Closed
              </span>
            )}

            <button
              type="button"
              onClick={() => updateDay(i, "closed", !day.closed)}
              className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                !day.closed ? "bg-coffee-accent" : "bg-coffee-dark/20"
              }`}
            >
              <motion.span
                animate={{ x: !day.closed ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
              />
            </button>
          </div>
        ))}
      </div>

      <SaveBar onSave={() => console.log("Saved hours:", hours)} />
    </div>
  );
};

export default HoursTab;
