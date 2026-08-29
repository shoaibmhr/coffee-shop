import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import AuthLayout from "../common/AuthLayout";
import PasswordInput from "../components/PasswordInput";

const ResetPassword = () => {
  // eslint-disable-next-line no-unused-vars
  const { token } = useParams(); // reset token from the emailed link, e.g. /reset-password/:token
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    // Backend integration later: POST /api/auth/reset-password
    // body: { token, password: form.password }
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    }, 1200);
  };

  return (
    <AuthLayout
      title={success ? "Password Reset" : "Set New Password"}
      subtitle={
        success
          ? "Your password has been updated successfully."
          : "Choose a new password for your account."
      }
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="w-16 h-16 rounded-full bg-coffee-accent/10 flex items-center justify-center mb-5">
              <CheckCircle2 size={30} className="text-coffee-accent" />
            </div>
            <p className="font-body text-sm text-coffee-dark/65 leading-relaxed max-w-xs">
              Redirecting you to login...
            </p>
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
            <PasswordInput
              label="New Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
            />
            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
            />

            {error && (
              <p className="font-body text-xs text-red-500 -mt-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-coffee-dark hover:bg-coffee-accent disabled:opacity-70 transition-colors font-body font-semibold text-coffee-cream text-sm"
            >
              {loading ? "Updating..." : "Reset Password"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {!success && (
        <p className="font-body text-sm text-coffee-dark/60 text-center mt-8">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-coffee-accent hover:text-coffee-dark transition-colors"
          >
            Log In
          </Link>
        </p>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
