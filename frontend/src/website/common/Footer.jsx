import { motion } from "framer-motion";
import { Coffee, MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Container from "./Container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Menu", href: "/menu" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const menuLinks = [
  { label: "Hot Coffee", href: "/menu#hot-coffee" },
  { label: "Cold Brew", href: "/menu#cold-brew" },
  { label: "Fresh Juices", href: "/menu#juices" },
  { label: "Smoothies", href: "/menu#smoothies" },
  { label: "Snacks & Pastries", href: "/menu#snacks" },
];

const socialLinks = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaXTwitter, href: "#", label: "Twitter" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Footer = () => {
  return (
    <footer className="w-full bg-coffee-dark relative overflow-hidden">
      {/* Faint decorative icon */}
      <Coffee
        size={280}
        strokeWidth={0.5}
        className="hidden lg:block absolute -left-16 -bottom-16 text-coffee-cream/[0.03] pointer-events-none"
      />

      <Container className="relative z-10">
        {/* Main footer grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 py-14 sm:py-18 md:py-20"
        >
          {/* Brand column */}
          <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-coffee-accent/15 border border-coffee-accent/40 flex items-center justify-center">
                <Coffee size={18} className="text-coffee-accent" />
              </div>
              <span className="font-heading text-xl font-bold text-coffee-cream">
                Blend & Brew
              </span>
            </div>
            <p className="font-body text-sm text-coffee-cream/55 leading-relaxed mt-5 max-w-xs">
              Blended flavors, brewed to perfection. Single-origin beans, expert
              baristas, and a space that feels like home.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-coffee-cream/20 flex items-center justify-center text-coffee-cream/60 hover:bg-coffee-accent hover:border-coffee-accent hover:text-coffee-cream transition-colors duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-heading text-base font-bold text-coffee-cream mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-coffee-cream/55 hover:text-coffee-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Menu links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-heading text-base font-bold text-coffee-cream mb-5">
              Our Menu
            </h4>
            <ul className="space-y-3">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-coffee-cream/55 hover:text-coffee-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact + hours */}
          <motion.div variants={fadeUp}>
            <h4 className="font-heading text-base font-bold text-coffee-cream mb-5">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={16}
                  className="text-coffee-accent mt-0.5 shrink-0"
                />
                <span className="font-body text-sm text-coffee-cream/55 leading-relaxed">
                  123 Brew Street, Downtown District, City 45500
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-coffee-accent shrink-0" />
                <span className="font-body text-sm text-coffee-cream/55">
                  +92 300 1234567
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-coffee-accent shrink-0" />
                <span className="font-body text-sm text-coffee-cream/55">
                  hello@blendandbrew.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-coffee-accent mt-0.5 shrink-0"
                />
                <span className="font-body text-sm text-coffee-cream/55 leading-relaxed">
                  Mon – Sun: 7:00 AM – 11:00 PM
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-coffee-cream/10" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="font-body text-xs sm:text-sm text-coffee-cream/45 text-center sm:text-left">
            © {new Date().getFullYear()} Blend & Brew Coffee Shop. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="font-body text-xs sm:text-sm text-coffee-cream/45 hover:text-coffee-accent transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="font-body text-xs sm:text-sm text-coffee-cream/45 hover:text-coffee-accent transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
