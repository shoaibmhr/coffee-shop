import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "../../common/Container";

const infoItems = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Market Street", "San Francisco, CA 94103"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+92 300 123 4567", "Mon – Sun, 8am – 9pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["hello@blendandbrew.com", "We reply within 24 hours"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Mon – Fri: 7am – 9pm", "Sat – Sun: 8am – 10pm"],
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

const ContactInfo = () => {
  return (
    <section className="w-full bg-coffee-cream py-14 sm:py-20">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {infoItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-coffee-cream flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-coffee-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold text-coffee-dark mb-2">
                  {item.title}
                </h3>
                {item.lines.map((line) => (
                  <p
                    key={line}
                    className="font-body text-sm text-coffee-dark/60 leading-relaxed"
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
};

export default ContactInfo;
