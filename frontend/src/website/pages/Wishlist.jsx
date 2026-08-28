import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import PageHero from "../common/PageHero";
import Container from "../common/Container";
import EmptyState from "../common/EmptyState";
import ProductCard from "../common/ProductCard";
import { selectWishlistItems } from "../../redux/slices/wishlistSlice";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems);

  return (
    <>
      <PageHero
        title="Your Wishlist"
        breadcrumb="Wishlist"
        subtitle="Your saved favorites, all in one place."
        bgImage="https://images.unsplash.com/photo-1442512595331-e89e73853f31?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />

      <section className="w-full bg-coffee-cream py-14 sm:py-20">
        <Container>
          {wishlistItems.length > 0 ? (
            <>
              <p className="font-body text-sm text-coffee-dark/50 mb-8">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-8 gap-y-8 sm:gap-y-14"
              >
                {wishlistItems.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </motion.div>
            </>
          ) : (
            <EmptyState
              icon={Heart}
              title="Your wishlist is empty"
              subtitle="Save your favorite drinks here so you can order them anytime."
              ctaText="Browse Menu"
              ctaLink="/menu"
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
