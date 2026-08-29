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
import { apiRequest } from "../../services/api";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  const [orderType, setOrderType] = useState("pickup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    payment: "cash",
    walletNumber: "",
    notes: "",
  });

  const handlePlaceOrder = async () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      setError("Please fill in your name, phone, and email.");
      return;
    }

    if (orderType === "delivery" && !formData.address) {
      setError("Please enter a delivery address.");
      return;
    }

    if (
      (formData.payment === "jazzcash" || formData.payment === "easypaisa") &&
      !formData.walletNumber
    ) {
      setError("Please enter your wallet account number.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const data = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          customerName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          orderType,
          address: formData.address,
          paymentMethod: formData.payment,
          notes: formData.notes,
          items: cartItems.map((item) => ({
            productId: item.id,
            sizeId: item.sizeId,
            quantity: item.quantity,
          })),
        }),
      });

      dispatch(clearCart());

      navigate("/order-confirmation", {
        state: {
          orderNumber: data.order.orderNumber,
          orderType,
          formData,
        },
      });
    } catch (error) {
      setError(error.message || "Could not place your order.");
    } finally {
      setIsSubmitting(false);
    }
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

                {error && (
                  <p className="mt-4 font-body text-sm text-red-600">{error}</p>
                )}
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
