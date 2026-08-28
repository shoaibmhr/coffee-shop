import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      className="w-full h-full min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden shadow-sm"
    >
      <iframe
        title="Blend & Brew Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0182226692!2d-122.41941568468226!3d37.77492957975892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjciTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2s!4v1620000000000"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "400px" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default MapSection;
