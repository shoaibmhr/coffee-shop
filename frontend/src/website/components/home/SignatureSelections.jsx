import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../../common/Container";
import ProductCard from "../../common/ProductCard";
import { menuItems } from "../../constants/menuData";

// Show a curated selection of 6 items on the Home page
const featuredItems = menuItems.slice(0, 6);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const SignatureSelections = () => {
  return (
    <section className="w-full bg-coffee-cream py-14 sm:py-20 md:py-28">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16 px-4 sm:px-0">
          <span className="font-body tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-sm font-semibold text-coffee-accent uppercase">
            Our Craft
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-coffee-dark mt-2 sm:mt-3">
            Signature Selections
          </h2>
          <p className="font-body text-sm sm:text-base text-coffee-dark/60 mt-3 sm:mt-4 leading-relaxed">
            Handcrafted drinks made with premium ingredients, brewed to order —
            just for you.
          </p>
        </div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-8 sm:gap-y-14 px-4 sm:px-0"
        >
          {featuredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* View Full Menu CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors duration-300 font-body font-semibold text-coffee-cream text-sm"
          >
            View Full Menu →
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default SignatureSelections;
