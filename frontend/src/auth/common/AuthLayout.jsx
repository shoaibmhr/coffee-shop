import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left — Brand visual (now visible from tablet up, not just desktop) */}
      <div className="hidden md:block relative w-2/5 lg:w-1/2 xl:w-[45%]">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?fm=jpg&q=85&w=1200&auto=format&fit=crop"
          alt="Blend & Brew cafe interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/95 via-coffee-dark/40 to-coffee-dark/70" />

        {/* Logo + tagline overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10 xl:p-14">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-coffee-cream/10 border border-coffee-cream/30 flex items-center justify-center">
              <Coffee size={16} className="text-coffee-cream" />
            </div>
            <span className="font-heading text-base md:text-lg font-bold text-coffee-cream">
              Blend & Brew
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-heading text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-coffee-cream leading-tight max-w-xs md:max-w-[220px] lg:max-w-sm">
              Where Every Sip Tells a Story
            </h2>
            <p className="hidden lg:block font-body text-sm text-coffee-cream/70 mt-4 max-w-sm leading-relaxed">
              Join our community of coffee lovers — order your favorites, save
              what you love, and skip the wait.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right — Form content */}
      <div className="w-full md:w-3/5 lg:w-1/2 xl:w-[55%] flex flex-col min-h-screen bg-coffee-cream">
        {/* Mobile logo (shown only when left panel is hidden, i.e. below md) */}
        <div className="md:hidden flex items-center gap-2.5 px-6 pt-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-coffee-dark flex items-center justify-center">
              <Coffee size={16} className="text-coffee-cream" />
            </div>
            <span className="font-heading text-base font-bold text-coffee-dark">
              Blend & Brew
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 md:px-6 lg:px-10 py-10 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-sm"
          >
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
              {title}
            </h1>
            <p className="font-body text-sm text-coffee-dark/55 mt-2 mb-8">
              {subtitle}
            </p>

            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
