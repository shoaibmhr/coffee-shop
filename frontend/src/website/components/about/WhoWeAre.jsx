import { motion } from "framer-motion";
import Container from "../../common/Container";

const WhoWeAre = () => {
  return (
    <section className="w-full bg-coffee-cream py-14 sm:py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-72 sm:h-96 lg:h-[440px] rounded-lg overflow-hidden order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?fm=jpg&q=85&w=900&auto=format&fit=crop"
              alt="Coffee and pastries"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark">
              Who We Are?
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <span className="w-8 h-0.5 bg-coffee-accent" />
              <span className="font-body tracking-[0.2em] text-[11px] sm:text-xs font-semibold text-coffee-accent uppercase">
                Our Philosophy
              </span>
            </div>

            <p className="font-body text-sm sm:text-base text-coffee-dark/60 leading-relaxed mt-6">
              We're a small team of roasters, baristas, and coffee obsessives
              who believe a great cup starts long before it reaches you — with
              the farmer, the bean, and the care taken in between.
            </p>
            <p className="font-body text-sm sm:text-base text-coffee-dark/60 leading-relaxed mt-4">
              Whether you're grabbing a quick espresso or settling in for an
              afternoon, we want Blend & Brew to feel like the best part of your
              day.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default WhoWeAre;
