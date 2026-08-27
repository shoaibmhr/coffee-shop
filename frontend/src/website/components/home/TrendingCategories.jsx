import { motion } from "framer-motion";
import Container from "../../common/Container";

const categories = [
  {
    name: "Hot Coffee",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Cold Brew",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=jpg&q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Fresh Juices",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?fm=jpg&q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Smoothies",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?fm=jpg&q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Snacks & Pastries",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&q=80&w=600&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TrendingCategories = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-coffee-dark tracking-wide uppercase">
            Trending Categories
          </h2>
          <span className="block w-14 h-0.5 bg-coffee-accent mx-auto mt-3 sm:mt-4" />
          <p className="font-body text-sm sm:text-base text-coffee-dark/60 mt-4 sm:mt-5">
            Explore Our Most-Loved Picks
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-7"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={cardVariants}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image block */}
              <div className="relative w-full aspect-square bg-coffee-cream overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Name only */}
              <div className="text-center pt-4 sm:pt-5">
                <h3 className="font-body text-sm sm:text-base font-semibold text-coffee-dark group-hover:text-coffee-accent transition-colors duration-300">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default TrendingCategories;
