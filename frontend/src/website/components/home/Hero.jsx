import { motion } from "framer-motion";
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

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] flex flex-col overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/hero-fallback.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/810/810-360.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay — only enough for text legibility on the left, image stays clear on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/90 via-coffee-dark/50 to-transparent" />

      {/* Content — sits in the upper-left area, not vertically centered, so the visual breathes below */}
      <Container className="relative z-10 pt-32 sm:pt-40 md:pt-44">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-md sm:max-w-lg"
        >
          <motion.h1
            variants={itemVariants}
            className="font-heading text-[clamp(1.9rem,5.5vw,3.25rem)] font-bold text-coffee-cream leading-[1.15] drop-shadow-lg text-balance"
          >
            Savor the
            <br />
            Perfect Brew!
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-body text-xs sm:text-sm text-coffee-cream/80 max-w-xs sm:max-w-sm mt-4 leading-relaxed"
          >
            Single-origin beans, expert baristas, and a cozy space that feels
            like home — blended flavors, brewed to perfection.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mt-6"
          >
            <a
              href="#menu"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("menu");
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-coffee-cream hover:bg-white active:scale-[0.97] transition-all duration-300 font-body font-semibold text-coffee-dark text-xs sm:text-sm shadow-md"
            >
              Learn More
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-coffee-accent hover:bg-coffee-brown active:scale-[0.97] transition-all duration-300 font-body font-semibold text-coffee-cream text-xs sm:text-sm shadow-md"
            >
              Order Now
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
