import { motion, AnimatePresence } from "framer-motion";
import { Frown } from "lucide-react";
import Container from "../../common/Container";
import ProductCard from "../../common/ProductCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const MenuGrid = ({ items }) => {
  return (
    <section className="w-full bg-coffee-ivory py-12 sm:py-16">
      <Container>
        <p className="font-body text-sm text-coffee-dark/50 mb-8">
          Showing {items.length} {items.length === 1 ? "item" : "items"}
        </p>

        {items.length > 0 ? (
          <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-8 sm:gap-y-14"
          >
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <Frown size={40} className="text-coffee-dark/25 mb-4" />
            <p className="font-body text-coffee-dark/60">
              No items found. Try a different category or search term.
            </p>
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default MenuGrid;
