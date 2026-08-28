import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  X as CloseIcon,
  Menu as MenuIcon,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Phone,
} from "lucide-react";
import Container from "./Container";
import { selectTotalItems } from "../../redux/slices/cartSlice";
import { selectTotalWishlist } from "../../redux/slices/wishlistSlice";

// Category preview data (mega-menu + mobile accordion)
const categoryPreview = [
  {
    name: "Hot Coffee",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Cold Brew",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Fresh Juices",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Smoothies",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Snacks & Pastries",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&q=80&w=200&auto=format&fit=crop",
  },
];

// Gallery preview data (mega-menu)
const galleryPreview = [
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?fm=jpg&q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?fm=jpg&q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1453614512568-c4024d13c247?fm=jpg&q=80&w=400&auto=format&fit=crop",
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu", dropdown: "categories" },
  { name: "Reserve", href: "/reserve" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery", dropdown: "gallery" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // "categories" | "gallery" | null
  const [mobileAccordion, setMobileAccordion] = useState(null); // which mobile section is expanded

  const location = useLocation();
  const totalItems = useSelector(selectTotalItems);
  const totalWishlist = useSelector(selectTotalWishlist);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAllOverlays = () => {
    setSearchOpen(false);
    setSearchTerm("");
    setOpenDropdown(null);
    setMobileOpen(false);
    setMobileAccordion(null);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-coffee-cream/95 backdrop-blur-md shadow-md"
            : "bg-coffee-cream/90 backdrop-blur-sm"
        }`}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" onClick={closeAllOverlays} className="flex items-center gap-2 shrink-0">
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
                const hasDropdown = Boolean(link.dropdown);

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() =>
                      hasDropdown && setOpenDropdown(link.dropdown)
                    }
                  >
                    <Link
                      to={link.href}
                      onClick={closeAllOverlays}
                      className={`relative flex items-center gap-1 font-body text-sm font-medium tracking-wide transition-colors ${
                        isActive
                          ? "text-coffee-accent"
                          : "text-coffee-dark/80 hover:text-coffee-accent"
                      }`}
                    >
                      {link.name}
                      {hasDropdown &&
                        (openDropdown === link.dropdown ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        ))}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-coffee-accent rounded-full"
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(null);
                  setSearchOpen((prev) => !prev);
                }}
                aria-label="Toggle search"
                className="w-10 h-10 rounded-full border border-coffee-dark/15 flex items-center justify-center hover:border-coffee-accent hover:bg-coffee-accent/5 transition-colors"
              >
                {searchOpen ? (
                  <CloseIcon size={17} className="text-coffee-dark" />
                ) : (
                  <Search size={17} className="text-coffee-dark" />
                )}
              </button>

              <button
                type="button"
                className="font-body text-sm font-medium text-coffee-dark hover:text-coffee-accent transition-colors mx-1"
              >
                Sign In
              </button>

              <Link
                to="/wishlist"
                onClick={closeAllOverlays}
                aria-label="Wishlist"
                className="relative w-10 h-10 rounded-full border border-coffee-dark/15 flex items-center justify-center hover:border-coffee-accent hover:bg-coffee-accent/5 transition-colors"
              >
                <Heart size={17} className="text-coffee-dark" />
                {totalWishlist > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-coffee-accent text-white font-semibold">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                onClick={closeAllOverlays}
                aria-label="Shopping cart"
                className="relative w-10 h-10 rounded-full bg-coffee-dark flex items-center justify-center hover:bg-coffee-brown transition-colors"
              >
                <ShoppingBag size={18} className="text-coffee-cream" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-coffee-accent text-white font-semibold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile: search + hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Toggle search"
                className="text-coffee-dark"
              >
                {searchOpen ? <CloseIcon size={22} /> : <Search size={22} />}
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="text-coffee-dark"
              >
                <MenuIcon size={26} />
              </button>
            </div>
          </div>
        </Container>

        {/* Desktop Mega Dropdown Panel */}
        <AnimatePresence>
          {openDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden lg:block absolute top-full left-0 w-full bg-white border-t border-coffee-dark/10 shadow-xl"
            >
              <Container className="py-8">
                {openDropdown === "categories" && (
                  <>
                    <div className="grid grid-cols-5 gap-6">
                      {categoryPreview.map((cat) => (
                        <Link
                          key={cat.name}
                          to="/menu"
                          onClick={closeAllOverlays}
                          className="group flex items-center gap-3"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-coffee-cream">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <span className="font-body text-sm font-semibold text-coffee-dark group-hover:text-coffee-accent transition-colors uppercase tracking-wide">
                            {cat.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-coffee-dark/10 mt-6 pt-5">
                      <Link
                        to="/menu"
                        onClick={closeAllOverlays}
                        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-coffee-accent hover:gap-3 transition-all"
                      >
                        View Full Menu <ArrowRight size={15} />
                      </Link>
                    </div>
                  </>
                )}

                {openDropdown === "gallery" && (
                  <>
                    <div className="grid grid-cols-3 gap-5">
                      {galleryPreview.map((img, i) => (
                        <Link
                          key={i}
                          to="/gallery"
                          onClick={closeAllOverlays}
                          className="group relative aspect-[4/3] rounded-lg overflow-hidden"
                        >
                          <img
                            src={img}
                            alt="Cafe ambiance"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/20 transition-colors" />
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-coffee-dark/10 mt-6 pt-5">
                      <Link
                        to="/gallery"
                        onClick={closeAllOverlays}
                        className="inline-flex items-center gap-2 font-body text-sm font-semibold text-coffee-accent hover:gap-3 transition-all"
                      >
                        View Full Gallery <ArrowRight size={15} />
                      </Link>
                    </div>
                  </>
                )}
              </Container>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expandable Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-coffee-dark/10 bg-coffee-cream/95 backdrop-blur-md"
            >
              <Container className="py-4">
                <div className="relative max-w-xl mx-auto">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/40"
                  />
                  <input
                    type="text"
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for coffee, pastries..."
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-coffee-dark/10 font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
                  />
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ===== Mobile Sidebar Drawer ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-coffee-dark/60 z-[60] lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-coffee-cream z-[70] flex flex-col lg:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-coffee-dark/10">
                <div>
                  <h3 className="font-heading text-lg font-bold text-coffee-dark">
                    Blend & Brew
                  </h3>
                  <span className="font-body text-[10px] tracking-[0.2em] text-coffee-accent uppercase">
                    Coffee & Roastery
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="text-coffee-dark"
                >
                  <CloseIcon size={22} />
                </button>
              </div>

              {/* Drawer Nav */}
              <nav className="flex-1 px-6">
                {navLinks.map((link) => {
                  const hasDropdown = Boolean(link.dropdown);
                  const isExpanded = mobileAccordion === link.dropdown;
                  const isActive = location.pathname === link.href;

                  if (!hasDropdown) {
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        onClick={closeAllOverlays}
                        className={`block py-4 border-b border-coffee-dark/10 font-body text-base font-semibold uppercase tracking-wide ${
                          isActive ? "text-coffee-accent" : "text-coffee-dark"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  }

                  return (
                    <div key={link.name} className="border-b border-coffee-dark/10">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileAccordion(isExpanded ? null : link.dropdown)
                        }
                        className={`w-full flex items-center justify-between py-4 font-body text-base font-semibold uppercase tracking-wide ${
                          isActive ? "text-coffee-accent" : "text-coffee-dark"
                        }`}
                      >
                        {link.name}
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 flex flex-col gap-3">
                              {link.dropdown === "categories" &&
                                categoryPreview.map((cat) => (
                                  <Link
                                    key={cat.name}
                                    to="/menu"
                                    onClick={closeAllOverlays}
                                    className="flex items-center gap-3 pl-2"
                                  >
                                    <div className="w-9 h-9 rounded-full overflow-hidden shrink-0">
                                      <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <span className="font-body text-sm text-coffee-dark/70">
                                      {cat.name}
                                    </span>
                                  </Link>
                                ))}

                              {link.dropdown === "gallery" && (
                                <div className="grid grid-cols-3 gap-2 pl-2">
                                  {galleryPreview.map((img, i) => (
                                    <Link
                                      key={i}
                                      to="/gallery"
                                      onClick={closeAllOverlays}
                                      className="aspect-square rounded-md overflow-hidden"
                                    >
                                      <img
                                        src={img}
                                        alt="Cafe ambiance"
                                        className="w-full h-full object-cover"
                                      />
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="px-6 py-6 border-t border-coffee-dark/10">
                <Link
                  to="/menu"
                  onClick={closeAllOverlays}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm uppercase tracking-wide"
                >
                  Order Now <ArrowRight size={16} />
                </Link>
                
                <a  href="tel:+923001234567"
                  className="flex items-center justify-center gap-2 mt-4 font-body text-sm text-coffee-dark/70"
                >
                  <Phone size={15} className="text-coffee-accent" />
                  +92 300 123 4567
                </a>

                {/* Wishlist / Cart quick access */}
                <div className="flex items-center justify-center gap-6 mt-5 pt-5 border-t border-coffee-dark/10">
                  <Link
                    to="/wishlist"
                    onClick={closeAllOverlays}
                    className="flex items-center gap-1.5 text-sm font-medium text-coffee-dark"
                  >
                    <Heart size={16} /> Wishlist ({totalWishlist})
                  </Link>
                  <Link
                    to="/cart"
                    onClick={closeAllOverlays}
                    className="flex items-center gap-1.5 text-sm font-medium text-coffee-dark"
                  >
                    <ShoppingBag size={16} /> Cart ({totalItems})
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;