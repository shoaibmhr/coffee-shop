import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";

const instagramPhotos = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447933601403-0c6688de566e?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600271886742-f049cd451bba?fm=jpg&q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553530666-ba11a7da3888?fm=jpg&q=80&w=500&auto=format&fit=crop",
];

const InstagramStrip = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    // Move by exactly one card's width (including its share of the gap),
    // so each click advances the carousel by one item — smooth and predictable.
    const firstCard = el.firstElementChild;
    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width
      : el.clientWidth / 4;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const target =
      dir === "left"
        ? Math.max(0, el.scrollLeft - cardWidth)
        : Math.min(maxScroll, el.scrollLeft + cardWidth);

    const start = el.scrollLeft;
    const distance = target - start;
    const duration = 500;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = start + distance * easeInOutQuad(progress);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  return (
    <section className="group/section relative w-full bg-coffee-cream overflow-hidden">
      {/* Scrollable photo strip */}
      <div ref={scrollRef} className="flex overflow-x-auto no-scrollbar">
        {instagramPhotos.map((src, i) => (
          <motion.a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group relative w-1/2 sm:w-1/3 lg:w-1/4 h-56 sm:h-64 md:h-72 lg:h-80 shrink-0 overflow-hidden"
          >
            <img
              src={src}
              alt="Blend & Brew on Instagram"
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[2500ms] ease-out group-hover:scale-125"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/45 transition-colors duration-500 flex items-center justify-center">
              <FaInstagram
                size={24}
                className="text-coffee-cream opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500"
              />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Center "Follow Us" overlay card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-auto bg-white shadow-xl px-5 sm:px-7 py-3.5 sm:py-4 flex items-center gap-2.5 sm:gap-3"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shrink-0">
            <FaInstagram size={16} className="text-white" />
          </div>
          <div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs sm:text-sm font-bold text-coffee-dark hover:text-coffee-accent transition-colors duration-300 whitespace-nowrap"
            >
              Follow Us On Instagram
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll arrows — desktop only, appear on section hover */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/90 hover:bg-white shadow-md items-center justify-center opacity-0 -translate-x-2 group-hover/section:opacity-100 group-hover/section:translate-x-0 transition-all duration-300"
      >
        <ChevronLeft size={18} className="text-coffee-dark" />
      </button>
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/90 hover:bg-white shadow-md items-center justify-center opacity-0 translate-x-2 group-hover/section:opacity-100 group-hover/section:translate-x-0 transition-all duration-300"
      >
        <ChevronRight size={18} className="text-coffee-dark" />
      </button>
    </section>
  );
};

export default InstagramStrip;
