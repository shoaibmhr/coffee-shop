import { motion } from "framer-motion";
import { Coffee, Leaf, Users } from "lucide-react";
import Container from "../../common/Container";

const values = [
  {
    Icon: Coffee,
    title: "Craft",
    description:
      "Every cup is brewed with precision, care, and years of hands-on skill.",
  },
  {
    Icon: Leaf,
    title: "Sourcing",
    description:
      "Single-origin beans, ethically sourced straight from trusted farms.",
  },
  {
    Icon: Users,
    title: "Community",
    description:
      "A warm space built for connection, conversation, and slow mornings.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const OurValues = () => {
  return (
    <section className="relative w-full py-16 sm:py-24 md:py-28 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=1600&auto=format&fit=crop')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-coffee-dark/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/40 via-transparent to-coffee-dark/60" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-coffee-cream/15"
        >
          {values.map(({ Icon, title, description }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="flex flex-col items-center text-center px-6 sm:px-8 py-10 sm:py-0 group"
            >
              <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full border border-coffee-cream/30 flex items-center justify-center mb-6 group-hover:border-coffee-accent group-hover:bg-coffee-accent/10 transition-colors duration-300">
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-coffee-cream"
                />
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-coffee-cream">
                {title}
              </h3>

              <span className="block w-10 h-0.5 bg-coffee-accent mt-4 mb-5" />

              <p className="font-body text-sm sm:text-base text-coffee-cream/70 leading-relaxed max-w-xs">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default OurValues;
