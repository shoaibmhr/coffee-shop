import { motion } from "framer-motion";
import Container from "../../common/Container";

const OurStory = () => {
  return (
    <section className="w-full bg-white py-14 sm:py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-dark">
              Our Story
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <span className="w-8 h-0.5 bg-coffee-accent" />
              <span className="font-body tracking-[0.2em] text-[11px] sm:text-xs font-semibold text-coffee-accent uppercase">
                Since 2014
              </span>
            </div>

            <p className="font-body text-sm sm:text-base text-coffee-dark/60 leading-relaxed mt-6">
              Blend & Brew started as a small corner cart with one espresso
              machine and a big dream — to serve coffee that felt personal. Over
              the years, that cart grew into a home for coffee lovers, built on
              the same belief: every cup should tell a story.
            </p>
            <p className="font-body text-sm sm:text-base text-coffee-dark/60 leading-relaxed mt-4">
              Today, we source single-origin beans from ethical farms, roast in
              small batches, and train every barista by hand — because great
              coffee isn't rushed, it's crafted.
            </p>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-72 sm:h-96 lg:h-[480px] rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=85&w=900&auto=format&fit=crop"
              alt="Handcrafted latte art"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default OurStory;
