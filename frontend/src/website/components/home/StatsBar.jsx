import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Coffee, Users, Award } from "lucide-react";
import Container from "../../common/Container";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Happy Customers" },
  { icon: Coffee, value: 50, suffix: "+", label: "Coffee Varieties" },
  { icon: Award, value: 10, suffix: "+", label: "Years of Craft" },
];

const Counter = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsBar = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Coffee background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=1600&auto=format&fit=crop')",
        }}
      />

      {/* Dark brand-color overlay for readability */}
      <div className="absolute inset-0 bg-coffee-dark/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/40 via-transparent to-coffee-dark/60" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-coffee-cream/10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center gap-3 pt-8 sm:pt-0 group"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-coffee-accent/40 flex items-center justify-center group-hover:bg-coffee-accent/10 group-hover:border-coffee-accent/70 transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.75} className="text-coffee-accent" />
                </div>
                <div className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-coffee-cream mt-1">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-body text-xs sm:text-sm text-coffee-cream/65 tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default StatsBar;