import { motion } from "framer-motion";
import Container from "../../common/Container";

const blogs = [
  {
    id: 1,
    day: "12",
    month: "Jan",
    category: "News",
    title: "Interesting Things You Didn't Know About Coffee",
    excerpt:
      "From bean to cup — discover the fascinating journey your morning coffee takes before it reaches your table, and why origin matters more than you think.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 2,
    day: "18",
    month: "Jan",
    category: "Brewing Tips",
    title: "Do You Really Know Your Brew Method?",
    excerpt:
      "Pour-over, French press, or espresso — each method pulls different flavors from the same beans. Here's how to pick the right one for your taste.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?fm=jpg&q=80&w=700&auto=format&fit=crop",
  },
  {
    id: 3,
    day: "25",
    month: "Jan",
    category: "Cafe Life",
    title: "The Most Useful Things For A Perfect Morning",
    excerpt:
      "A great morning starts with the right pairing — here are our favorite coffee and pastry combinations to kickstart your day the right way.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?fm=jpg&q=80&w=700&auto=format&fit=crop",
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

const BlogCard = ({ post }) => {
  return (
    <motion.article variants={cardVariants} className="group cursor-pointer">
      {/* Image with date badge */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Date badge */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-coffee-cream px-3 py-2 sm:px-3.5 sm:py-2.5 text-center shadow-md">
          <span className="block font-heading text-base sm:text-lg font-bold text-coffee-dark leading-none">
            {post.day}
          </span>
          <span className="block font-body text-[9px] sm:text-[10px] font-semibold text-coffee-accent uppercase tracking-wider mt-1">
            {post.month}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-5 sm:pt-6">
        <span className="font-body text-[11px] sm:text-xs font-semibold text-coffee-accent uppercase tracking-[0.2em]">
          {post.category}
        </span>

        <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-cream leading-snug mt-2.5 group-hover:text-coffee-accent transition-colors duration-300">
          {post.title}
        </h3>

        <span className="block w-10 h-0.5 bg-coffee-cream/20 mt-3.5 mb-3.5 group-hover:w-16 group-hover:bg-coffee-accent transition-all duration-300" />

        <p className="font-body text-sm text-coffee-cream/60 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
};

const OurBlogs = () => {
  return (
    <section className="w-full bg-coffee-brown py-14 sm:py-20 md:py-24">
      <Container>
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-coffee-cream tracking-wide uppercase">
            Our Blogs
          </h2>
          <span className="block w-14 h-0.5 bg-coffee-accent mx-auto mt-3 sm:mt-4" />
          <p className="font-body text-sm sm:text-base text-coffee-cream/65 mt-4 sm:mt-5">
            Stories, Brewing Tips & News From Blend & Brew
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 md:gap-10"
        >
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default OurBlogs;
