import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Container from "./Container";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Reserve", href: "/reserve" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-coffee-cream/95 backdrop-blur-md shadow-md"
          : "bg-coffee-cream/90 backdrop-blur-sm"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/assets/logo.png"
              alt="Blend & Brew Coffee Shop"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
            />
            <span className="font-heading font-bold text-lg md:text-xl text-coffee-dark tracking-wide">
              Blend & Brew
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative font-body text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? "text-coffee-accent"
                      : "text-coffee-dark/80 hover:text-coffee-accent"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-coffee-accent rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              type="button"
              className="font-body text-sm font-medium text-coffee-dark hover:text-coffee-accent transition-colors"
            >
              Sign In
            </button>

            <button
              type="button"
              aria-label="Shopping cart"
              className="relative w-10 h-10 rounded-full bg-coffee-dark flex items-center justify-center hover:bg-coffee-brown transition-colors"
            >
              <ShoppingBag size={18} className="text-coffee-cream" />
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-coffee-accent text-white font-semibold">
                0
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-coffee-dark"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-coffee-cream border-t border-coffee-dark/10"
          >
            <Container className="flex flex-col gap-4 py-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`font-body text-base font-medium transition-colors ${
                      isActive
                        ? "text-coffee-accent"
                        : "text-coffee-dark hover:text-coffee-accent"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-coffee-dark/10">
                <button
                  type="button"
                  className="font-body text-sm font-medium text-coffee-dark hover:text-coffee-accent transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm font-medium text-coffee-dark hover:text-coffee-accent transition-colors"
                >
                  <ShoppingBag size={18} />
                  Cart (0)
                </button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
