import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import PageHero from "../common/PageHero";
import Container from "../common/Container";
import EmptyState from "../common/EmptyState";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderReview from "../components/checkout/OrderReview";
import {
  selectCartItems,
  selectTotalPrice,
  clearCart,
} from "../../redux/slices/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const [orderType, setOrderType] = useState("pickup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    payment: "cash",
    walletNumber: "",
    notes: "",
  });

  const handlePlaceOrder = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Please fill in your name, phone, and email.");
      return;
    }
    if (orderType === "delivery" && !formData.address) {
      alert("Please enter a delivery address.");
      return;
    }
    if (
      (formData.payment === "jazzcash" || formData.payment === "easypaisa") &&
      !formData.walletNumber
    ) {
      alert("Please enter your wallet account number.");
      return;
    }

    setIsSubmitting(true);

    // Backend connect hone par yahan POST /api/orders call hogi
    setTimeout(() => {
      const orderNumber = `BB-${Math.floor(10000 + Math.random() * 90000)}`;
      dispatch(clearCart());
      navigate("/order-confirmation", {
        state: { orderNumber, orderType, formData },
      });
    }, 2200);
  };

  return (
    <>
      <PageHero
        title="Checkout"
        breadcrumb="Checkout"
        subtitle="Almost there — just a few details to complete your order."
        bgImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />

      <section className="w-full bg-coffee-cream py-14 sm:py-20">
        <Container>
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-2">
                <CheckoutForm
                  formData={formData}
                  setFormData={setFormData}
                  orderType={orderType}
                  setOrderType={setOrderType}
                />
              </div>
              <div className="lg:col-span-1">
                <OrderReview
                  cartItems={cartItems}
                  totalPrice={totalPrice}
                  orderType={orderType}
                  onPlaceOrder={handlePlaceOrder}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              subtitle="Add some items to your cart before checking out."
              ctaText="Browse Menu"
              ctaLink="/menu"
            />
          )}
        </Container>
      </section>
    </>
  );
};

export default Checkout;
