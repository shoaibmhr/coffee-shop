import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import AuthLayout from "../common/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import SocialLoginButtons from "../components/SocialLoginButtons";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Backend integration later: POST /api/auth/login
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to order your favorites and pick up where you left off."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Password */}
        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember((prev) => !prev)}
              className="w-4 h-4 rounded border-coffee-dark/25 text-coffee-accent focus:ring-coffee-accent/30 cursor-pointer"
            />
            <span className="font-body text-sm text-coffee-dark/65">
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="font-body text-sm font-semibold text-coffee-accent hover:text-coffee-dark transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-coffee-dark hover:bg-coffee-accent disabled:opacity-70 transition-colors font-body font-semibold text-coffee-cream text-sm"
        >
          {loading ? "Logging in..." : "Log In"}
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      <SocialLoginButtons />

      <p className="font-body text-sm text-coffee-dark/60 text-center mt-8">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-coffee-accent hover:text-coffee-dark transition-colors"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
