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
import { apiRequest } from "../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleChange = (event) => {
    setForm((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);

      await apiRequest("/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          remember,
        }),
      });

      navigate("/admin");
    } catch (error) {
      setError(error.message || "Could not sign in.");
      setShake(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-coffee-dark flex items-center justify-center px-5 py-10 relative overflow-hidden">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-sm"
      >
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
                  placeholder="admin@blendbrew.com"
                  autoComplete="username"
                  className="w-full h-12 pl-11 pr-4 rounded-lg border border-coffee-dark/15 bg-white font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
                />
              </div>
            </div>

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
                  onClick={() => setVisible((previous) => !previous)}
                  aria-label={visible ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-dark/40 hover:text-coffee-dark transition-colors"
                >
                  {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-body text-xs text-red-500 -mt-1">{error}</p>
            )}

            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember((previous) => !previous)}
                className="w-4 h-4 rounded border-coffee-dark/25 text-coffee-accent focus:ring-coffee-accent/30 cursor-pointer"
              />

              <span className="font-body text-sm text-coffee-dark/65">
                Keep me signed in
              </span>
            </label>

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

          <p className="font-body text-xs text-coffee-dark/45 text-center mt-6 leading-relaxed">
            Forgot your password? Contact your system administrator.
          </p>
        </motion.div>

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
