import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const EmptyState = ({ icon: Icon, title, subtitle, ctaText, ctaLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-16 sm:py-24"
    >
      <div className="w-20 h-20 rounded-full bg-coffee-cream flex items-center justify-center mb-6">
        <Icon size={32} className="text-coffee-accent" />
      </div>
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-coffee-dark">
        {title}
      </h3>
      <p className="font-body text-sm text-coffee-dark/55 mt-2 max-w-xs">
        {subtitle}
      </p>
      <Link
        to={ctaLink}
        className="mt-7 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm"
      >
        {ctaText} <ArrowRight size={15} />
      </Link>
    </motion.div>
  );
};

export default EmptyState;
