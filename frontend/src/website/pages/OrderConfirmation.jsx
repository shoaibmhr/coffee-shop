import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Home } from "lucide-react";
import Container from "../common/Container";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderNumber, orderType, formData } = location.state || {};

  // Agar direct URL se aaya (koi order data nahi), Home pe redirect
  if (!orderNumber) return <Navigate to="/" replace />;

  return (
    <section className="w-full min-h-screen bg-coffee-cream pt-32 pb-20 flex items-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut", delay: 0.15 }}
            className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={36} className="text-green-600" />
          </motion.div>

          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
            Order Confirmed!
          </h1>
          <p className="font-body text-sm text-coffee-dark/60 mt-2">
            Thank you, {formData?.fullName}. Your order has been placed
            successfully.
          </p>

          <div className="mt-6 py-4 border-y border-coffee-dark/10">
            <p className="font-body text-xs text-coffee-dark/50 uppercase tracking-wide">
              Order Number
            </p>
            <p className="font-heading text-xl font-bold text-coffee-accent mt-1">
              {orderNumber}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6 text-coffee-dark/70">
            <Clock size={16} className="text-coffee-accent" />
            <span className="font-body text-sm">
              {orderType === "delivery"
                ? "Estimated delivery: 30–40 minutes"
                : "Ready for pickup in 15–20 minutes"}
            </span>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm"
          >
            <Home size={16} /> Back to Home
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default OrderConfirmation;
