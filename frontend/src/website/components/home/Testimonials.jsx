import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Container from "../../common/Container";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Regular Customer",
    rating: 5,
    review:
      "Blend & Brew has completely changed my morning routine. The espresso is rich and consistent every single time, and the staff genuinely remembers my order. It feels like home.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "James Carter",
    role: "Local Food Blogger",
    rating: 5,
    review:
      "I've reviewed dozens of coffee shops, and this one stands out. Single-origin beans, thoughtful brewing, and a cozy atmosphere that makes you want to stay longer than planned.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Ayesha Khan",
    role: "Freelance Designer",
    rating: 5,
    review:
      "My go-to spot for work sessions. Great wifi, comfortable seating, and the cold brew is honestly the best I've had in the city. Highly recommend the caramel latte too.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const TestimonialCard = ({ item }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-coffee-cream rounded-2xl p-6 sm:p-8 relative flex flex-col h-full"
    >
      {/* Quote icon */}
      <Quote
        size={34}
        className="text-coffee-accent/20 absolute top-5 right-5 sm:top-6 sm:right-6"
        fill="currentColor"
      />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={15}
            className={
              i < item.rating
                ? "fill-coffee-accent text-coffee-accent"
                : "fill-coffee-dark/15 text-coffee-dark/15"
            }
          />
        ))}
      </div>

      {/* Review text */}
      <p className="font-body text-sm sm:text-base text-coffee-dark/70 leading-relaxed flex-1">
        "{item.review}"
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-coffee-dark/10 my-5 sm:my-6" />

      {/* Author */}
      <div className="flex items-center gap-3.5">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
        />
        <div>
          <h4 className="font-body text-sm sm:text-base font-bold text-coffee-dark">
            {item.name}
          </h4>
          <p className="font-body text-xs sm:text-sm text-coffee-dark/50">
            {item.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <span className="font-body tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-sm font-semibold text-coffee-accent uppercase">
            Testimonials
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-coffee-dark mt-2 sm:mt-3">
            What Our Customers Say
          </h2>
          <p className="font-body text-sm sm:text-base text-coffee-dark/60 mt-3 sm:mt-4 leading-relaxed">
            Real stories from real coffee lovers who make Blend & Brew part of
            their daily ritual.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7"
        >
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default Testimonials;
