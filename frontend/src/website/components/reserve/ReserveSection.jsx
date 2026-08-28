import { motion } from "framer-motion";
import Container from "../../common/Container";
import ReserveForm from "./ReserveForm";
import ReserveInfo from "./ReserveInfo";

const ReserveSection = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <span className="font-body tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-sm font-semibold text-coffee-accent uppercase">
            Book Ahead
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-coffee-dark mt-2 sm:mt-3">
            Reserve Your Table
          </h2>
          <p className="font-body text-sm sm:text-base text-coffee-dark/60 mt-3 sm:mt-4 leading-relaxed">
            Secure your spot for a relaxed cup, a working afternoon, or a
            celebration worth savoring.
          </p>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-3 bg-coffee-cream/20 border border-coffee-dark/5 rounded-lg p-6 sm:p-8 md:p-10"
          >
            <ReserveForm />
          </motion.div>

          <div className="lg:col-span-2">
            <ReserveInfo />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReserveSection;
