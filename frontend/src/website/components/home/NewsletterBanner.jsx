import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Coffee } from "lucide-react";
import Container from "../../common/Container";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // Backend integration later: POST /api/newsletter/subscribe
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative w-full bg-coffee-brown py-14 sm:py-18 md:py-20 overflow-hidden">
      {/* Decorative faint icon */}
      <Coffee
        size={220}
        strokeWidth={0.6}
        className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 text-coffee-cream/10 pointer-events-none"
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10"
        >
          {/* Left — Text */}
          <div className="text-center lg:text-left">
            <span className="font-body tracking-[0.2em] sm:tracking-[0.25em] text-[11px] sm:text-xs font-semibold text-coffee-accent uppercase">
              Stay In The Loop
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-coffee-cream mt-3 leading-snug">
              Get 10% Off Your First Order
            </h2>
            <p className="font-body text-sm sm:text-base text-coffee-cream/75 mt-3 max-w-md mx-auto lg:mx-0">
              Subscribe for brewing tips, new menu drops, and exclusive offers —
              straight to your inbox.
            </p>
          </div>

          {/* Right — Form */}
          <div className="w-full lg:w-auto lg:min-w-[420px]">
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-sm sm:text-base text-coffee-cream text-center lg:text-left"
              >
                🎉 Thanks for subscribing! Check your inbox for your code.
              </motion.p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0"
              >
                <div className="relative flex-1">
                  <Mail
                    size={17}
                    className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-4 bg-coffee-cream border border-coffee-cream sm:border-r-0 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-coffee-dark text-sm placeholder:text-coffee-dark/40 font-body focus:outline-none focus:ring-2 focus:ring-coffee-accent/40 transition-shadow duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-7 bg-coffee-accent hover:bg-coffee-dark rounded-lg sm:rounded-l-none sm:rounded-r-lg text-coffee-cream font-body font-semibold text-sm uppercase tracking-wide transition-colors duration-300 shrink-0"
                >
                  Subscribe
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default NewsletterBanner;
