import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import Container from "../../common/Container";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hero-fallback.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/810/810-360.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/90 via-coffee-dark/60 to-coffee-dark/90" />
      <div className="absolute inset-0 bg-coffee-dark/15" />

      {/* Floating decorative icon */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden lg:flex absolute bottom-28 right-14 w-14 h-14 rounded-full border border-coffee-cream/30 items-center justify-center z-10"
      >
        <Coffee size={22} className="text-coffee-cream/70" />
      </motion.div>

      {/* Content */}
      <Container className="relative z-10 text-center pt-28 sm:pt-32 md:pt-24 pb-20 md:pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Small eyebrow label — clean, editorial, no box/pill */}
          <motion.span
            variants={itemVariants}
            className="font-body tracking-[0.3em] text-[11px] sm:text-xs font-semibold text-coffee-accent uppercase [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] mb-4"
          >
            Since 2014
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold text-coffee-cream leading-[1.1] drop-shadow-lg"
          >
            Where Every Sip
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="font-script text-5xl sm:text-7xl md:text-8xl text-coffee-accent -mt-1 md:-mt-3 drop-shadow-lg"
          >
            Tells a Story
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="font-body text-sm sm:text-base md:text-lg text-coffee-cream/85 max-w-md sm:max-w-xl mt-6 leading-relaxed px-2"
          >
            Single-origin beans, expert baristas, and a cozy space that feels
            like home — blended flavors, brewed to perfection.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 mt-9"
          >
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-coffee-accent hover:bg-coffee-brown transition-colors duration-300 font-body font-semibold text-white text-sm sm:text-base shadow-lg shadow-coffee-dark/40 hover:shadow-xl">
              Order Now
            </button>
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-coffee-cream/50 hover:bg-coffee-cream/10 hover:border-coffee-cream/80 transition-colors duration-300 font-body font-semibold text-coffee-cream text-sm sm:text-base">
              Reserve a Table
            </button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <div className="hidden sm:flex absolute bottom-7 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-coffee-cream/50 flex justify-center pt-2">
            <span className="w-1 h-2 rounded-full bg-coffee-cream/70" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
