import { useSelector } from "react-redux";
import {  AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import PageHero from "../common/PageHero";
import Container from "../common/Container";
import EmptyState from "../common/EmptyState";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
} from "../../redux/slices/cartSlice";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  return (
    <>
      <PageHero
        title="Your Cart"
        breadcrumb="Cart"
        subtitle="Review your selected items before checking out."
        bgImage="https://images.unsplash.com/photo-1509042239860-f550ce710b93?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />

      <section className="w-full bg-coffee-cream py-14 sm:py-20">
        <Container>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
              {/* Items list */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-sm text-coffee-dark/50">
                    {totalItems} {totalItems === 1 ? "item" : "items"} in your
                    cart
                  </p>
                </div>
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItem key={item.cartId} item={item} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <OrderSummary totalPrice={totalPrice} itemCount={totalItems} />
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              subtitle="Looks like you haven't added anything yet. Explore our menu and find your favorite brew."
              ctaText="Browse Menu"
              ctaLink="/menu"
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default Cart;
