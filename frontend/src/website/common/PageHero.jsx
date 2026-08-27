import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Container from "./Container";

const PageHero = ({ title, subtitle, breadcrumb, bgImage }) => {
  return (
    <section className="relative w-full bg-coffee-dark pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      {/* Background image */}
      {bgImage && (
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/85 via-coffee-dark/80 to-coffee-dark/90" />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-1.5 font-body text-xs sm:text-sm text-coffee-cream/50 mb-6">
            <a href="/" className="hover:text-coffee-accent transition-colors">
              Home
            </a>
            <ChevronRight size={14} />
            <span className="text-coffee-accent">{breadcrumb}</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-coffee-cream">
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-sm sm:text-base text-coffee-cream/60 mt-4 max-w-lg mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
};

export default PageHero;
