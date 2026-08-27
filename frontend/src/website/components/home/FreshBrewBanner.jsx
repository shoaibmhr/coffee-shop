import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "../../common/Container";

const FreshBrewBanner = () => {
  return (
    <section className="w-full bg-coffee-cream py-14 sm:py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="font-body tracking-[0.25em] text-[11px] sm:text-xs font-semibold text-coffee-accent uppercase">
              Fresh Every Morning
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark leading-[1.15] mt-4">
              Hot & Fresh Coffee,
              <br />
              Brewed Around You
            </h2>

            <p className="font-body text-sm sm:text-base text-coffee-dark/60 leading-relaxed mt-5 max-w-md">
              From single-origin beans to your cup — every order at Blend & Brew
              is ground fresh, brewed to order, and crafted by hand. No
              shortcuts, just great coffee.
            </p>

            <motion.button
              whileHover={{ gap: "0.75rem" }}
              className="group flex items-center gap-2 mt-8 px-7 py-3.5 bg-coffee-dark hover:bg-coffee-accent text-coffee-cream font-body text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300"
            >
              Shop Now
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>

          {/* Right — Image, contained with accent border line like reference */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-72 sm:h-96 lg:h-[520px] border-l-2 border-coffee-dark pl-4 sm:pl-6"
          >
            <img
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?fm=jpg&q=85&w=1200&auto=format&fit=crop"
              alt="Freshly brewed coffee with beans and ingredients"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FreshBrewBanner;
