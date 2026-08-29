import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ArrowLeft, MailCheck } from "lucide-react";
import AuthLayout from "../common/AuthLayout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Backend integration later: POST /api/auth/forgot-password { email }
    // Backend sends an email with a reset link like /reset-password/:token
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <AuthLayout
      title={submitted ? "Check Your Email" : "Forgot Password?"}
      subtitle={
        submitted
          ? "We've sent password reset instructions to your inbox."
          : "No worries — enter your email and we'll send you a reset link."
      }
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="w-16 h-16 rounded-full bg-coffee-accent/10 flex items-center justify-center mb-5">
              <MailCheck size={30} className="text-coffee-accent" />
            </div>
            <p className="font-body text-sm text-coffee-dark/65 leading-relaxed max-w-xs">
              We've sent a reset link to{" "}
              <span className="font-semibold text-coffee-dark">{email}</span>.
              Didn't get it? Check your spam folder or try again.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-7 font-body text-sm font-semibold text-coffee-accent hover:text-coffee-dark transition-colors"
            >
              Try a different email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-coffee-dark hover:bg-coffee-accent disabled:opacity-70 transition-colors font-body font-semibold text-coffee-cream text-sm"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <Link
        to="/login"
        className="flex items-center justify-center gap-1.5 font-body text-sm font-semibold text-coffee-dark/60 hover:text-coffee-accent transition-colors mt-8"
      >
        <ArrowLeft size={14} /> Back to Login
      </Link>
    </AuthLayout>
  );
};

export default ForgotPassword;
