import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, User, ArrowRight } from "lucide-react";
import AuthLayout from "../common/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import SocialLoginButtons from "../components/SocialLoginButtons";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    // Backend integration later: POST /api/auth/signup
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join Blend & Brew and start earning perks with every order."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Full Name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
            />
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full h-12 pl-11 pr-4 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>

        {/* Email */}
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
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full h-12 pl-11 pr-4 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
            />
            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+92 300 1234567"
              className="w-full h-12 pl-11 pr-4 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>

        {/* Password + Confirm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Min. 6 characters"
          />
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
        </div>

        {error && (
          <p className="font-body text-xs text-red-500 -mt-1">{error}</p>
        )}

        {/* Terms */}
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={() => setAgreed((prev) => !prev)}
            className="w-4 h-4 mt-0.5 rounded border-coffee-dark/25 text-coffee-accent focus:ring-coffee-accent/30 cursor-pointer shrink-0"
          />
          <span className="font-body text-sm text-coffee-dark/65 leading-relaxed">
            I agree to the{" "}
            <Link to="/terms" className="font-semibold text-coffee-accent hover:text-coffee-dark">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="font-semibold text-coffee-accent hover:text-coffee-dark">
              Privacy Policy
            </Link>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-coffee-dark hover:bg-coffee-accent disabled:opacity-70 transition-colors font-body font-semibold text-coffee-cream text-sm"
        >
          {loading ? "Creating account..." : "Create Account"}
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      <SocialLoginButtons />

      <p className="font-body text-sm text-coffee-dark/60 text-center mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-coffee-accent hover:text-coffee-dark transition-colors"
        >
          Log In
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
