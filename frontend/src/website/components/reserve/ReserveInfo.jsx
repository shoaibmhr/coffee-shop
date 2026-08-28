import { motion } from "framer-motion";
import { Clock, Phone, MapPin } from "lucide-react";

const hours = [
  { day: "Monday – Friday", time: "7:00 AM – 10:00 PM" },
  { day: "Saturday – Sunday", time: "8:00 AM – 11:00 PM" },
];

const ReserveInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-72 sm:h-96 lg:h-full min-h-[420px] rounded-lg overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?fm=jpg&q=85&w=900&auto=format&fit=crop"
        alt="Blend & Brew cafe interior"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/90 via-coffee-dark/20 to-transparent" />

      {/* Info card overlay */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-coffee-cream mb-5">
          Visit Us
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Clock size={17} className="text-coffee-accent mt-0.5 shrink-0" />
            <div>
              {hours.map((h) => (
                <p
                  key={h.day}
                  className="font-body text-xs sm:text-sm text-coffee-cream/85 leading-relaxed"
                >
                  <span className="text-coffee-cream/60">{h.day}:</span>{" "}
                  {h.time}
                </p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={17} className="text-coffee-accent shrink-0" />
            <p className="font-body text-xs sm:text-sm text-coffee-cream/85">
              +92 300 1234567
            </p>
          </div>

          <div className="flex items-start gap-3">
            <MapPin size={17} className="text-coffee-accent mt-0.5 shrink-0" />
            <p className="font-body text-xs sm:text-sm text-coffee-cream/85 leading-relaxed">
              123 Brew Street, Downtown District, City 45500
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReserveInfo;
