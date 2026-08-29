import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Coffee,
  ShieldCheck,
  Loader2,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Backend integration later: POST /api/admin/auth/login
    // On success: store token, then navigate("/admin")
    // On failure (invalid credentials or role !== "admin"/"staff"):
    //   setError("Invalid email or password"); triggerShake();
    setTimeout(() => {
      setLoading(false);
      navigate("/admin");
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full bg-coffee-dark flex items-center justify-center px-5 py-10 relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #F5E6D3 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      <div className="hidden sm:block absolute -top-24 -right-24 w-72 h-72 rounded-full bg-coffee-accent/10 blur-3xl" />
      <div className="hidden sm:block absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-coffee-accent/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-coffee-cream/10 border border-coffee-cream/20 flex items-center justify-center mb-4">
            <Coffee size={24} className="text-coffee-accent" />
          </div>
          <h1 className="font-heading text-xl font-bold text-coffee-cream">
            Blend & Brew
          </h1>
          <span className="flex items-center gap-1.5 font-body text-[11px] font-semibold text-coffee-accent uppercase tracking-[0.2em] mt-1.5">
            <ShieldCheck size={12} /> Admin Panel
          </span>
        </div>

        {/* Card */}
        <motion.div
          animate={shake ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          onAnimationComplete={() => setShake(false)}
          className="bg-coffee-cream rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          <h2 className="font-heading text-lg font-bold text-coffee-dark">
            Staff Sign In
          </h2>
          <p className="font-body text-sm text-coffee-dark/55 mt-1.5 mb-6">
            Enter your credentials to access the dashboard.
          </p>

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
                  autoFocus
                  value={form.email}
                  onChange={handleChange}
                  placeholder="admin@blendandbrew.com"
                  autoComplete="username"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
                />
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-12 pl-11 pr-11 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setVisible((prev) => !prev)}
                  aria-label={visible ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-dark/40 hover:text-coffee-dark transition-colors"
                >
                  {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-body text-xs text-red-500 -mt-1"
              >
                {error}
              </motion.p>
            )}

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((prev) => !prev)}
                className="w-4 h-4 rounded border-coffee-dark/25 text-coffee-accent focus:ring-coffee-accent/30 cursor-pointer"
              />
              <span className="font-body text-sm text-coffee-dark/65">
                Keep me signed in
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-coffee-dark hover:bg-coffee-accent disabled:opacity-70 transition-colors font-body font-semibold text-coffee-cream text-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* No self-service reset — internal tool convention */}
          <p className="font-body text-xs text-coffee-dark/45 text-center mt-6 leading-relaxed">
            Forgot your password? Contact your system administrator.
          </p>
        </motion.div>

        {/* Back to website */}
        <Link
          to="/"
          className="block text-center font-body text-sm text-coffee-cream/50 hover:text-coffee-cream transition-colors mt-6"
        >
          ← Back to website
        </Link>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
