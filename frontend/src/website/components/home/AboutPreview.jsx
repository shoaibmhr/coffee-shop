import { motion } from "framer-motion";
import { Truck, Leaf } from "lucide-react";
import Container from "../../common/Container";

const AboutPreview = () => {
  return (
    <section className="w-full bg-white py-20 md:py-28 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <span className="font-body tracking-[0.2em] text-xs sm:text-sm font-semibold text-coffee-accent uppercase">
              Arabica & Robusta
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark mt-3 leading-tight">
              Exclusively Sourced,
              <br />
              Passionately Brewed
            </h2>
            <p className="font-body text-sm sm:text-base text-coffee-dark/65 mt-5 leading-relaxed max-w-md">
              Since 2014, we've hand-picked the finest single-origin beans from
              small family farms, roasting each batch fresh to bring out its
              true character in every cup.
            </p>

            {/* Info items */}
            <div className="flex flex-col sm:flex-row gap-6 mt-8">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-coffee-cream flex items-center justify-center shrink-0">
                  <Leaf size={18} className="text-coffee-accent" />
                </span>
                <div>
                  <p className="font-body text-xs text-coffee-dark/50 uppercase tracking-wide">
                    Sourcing
                  </p>
                  <p className="font-body text-sm font-semibold text-coffee-dark">
                    100% Single-Origin
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full bg-coffee-cream flex items-center justify-center shrink-0">
                  <Truck size={18} className="text-coffee-accent" />
                </span>
                <div>
                  <p className="font-body text-xs text-coffee-dark/50 uppercase tracking-wide">
                    Delivery
                  </p>
                  <p className="font-body text-sm font-semibold text-coffee-dark">
                    Fresh, Same-Day
                  </p>
                </div>
              </div>
            </div>

            <a
              href="/about"
              className="inline-block mt-9 px-8 py-3.5 rounded-full bg-coffee-accent hover:bg-coffee-brown transition-colors font-body font-semibold text-white text-sm shadow-lg shadow-coffee-accent/20"
            >
              Read Our Story
            </a>
          </motion.div>

          {/* Right: Blob Image with Badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="order-1 lg:order-2 relative flex justify-center"
          >
            <div
              className="relative w-full max-w-md aspect-[4/5] overflow-hidden shadow-xl"
              style={{
                borderRadius: "63% 37% 54% 46% / 42% 40% 60% 58%",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1746623691157-c4c7a3bad0c4?fm=jpg&q=80&w=1200&auto=format&fit=crop"
                alt="Coffee bean harvesting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-coffee-dark/10" />
            </div>

            {/* Floating "since" badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 right-4 sm:top-6 sm:right-0 lg:-right-2 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border-2 border-dashed border-coffee-accent/50 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="font-body text-[10px] sm:text-xs text-coffee-dark/60 uppercase tracking-wide">
                Since
              </span>
              <span className="font-heading text-xl sm:text-2xl font-bold text-coffee-accent">
                2014
              </span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutPreview;