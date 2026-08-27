import { motion } from "framer-motion";
import Container from "../../common/Container";
import ProductCard from "../../common/ProductCard";

const products = [
  {
    id: 1,
    name: "Signature Espresso",
    price: "$3.50",
    description:
      "Rich, bold single-origin espresso with a velvety crema. Ideal for a quick, intense pick-me-up.",
    image:
      "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Creamy Cappuccino",
    price: "$4.50",
    description:
      "Perfectly steamed microfoam atop smooth espresso. Ideal for milk coffee lovers.",
    image:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Artisan Latte",
    price: "$5.00",
    description:
      "Silky espresso blended with steamed milk, finished with latte art. Ideal for slow mornings.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Flat White",
    price: "$4.75",
    description:
      "Velvety microfoam over a strong ristretto base. Ideal for a smooth, balanced cup.",
    image:
      "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Cinnamon Mocha",
    price: "$5.25",
    description:
      "Dark chocolate espresso with steamed milk and cinnamon. Ideal for dessert-style coffee.",
    image:
      "https://images.unsplash.com/photo-1616388761741-a5936c6f61f6?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Classic Americano",
    price: "$3.75",
    description:
      "Espresso extended with hot water — clean and bold. Ideal for a lighter, longer brew.",
    image:
      "https://images.unsplash.com/photo-1572286258217-40142c1c6a70?fm=jpg&q=80&w=800&auto=format&fit=crop",
  },
];

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
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default SignatureSelections;
