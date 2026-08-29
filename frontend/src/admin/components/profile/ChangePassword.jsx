import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0 - 4
};

const strengthMeta = [
  { label: "Very weak", color: "bg-red-500" },
  { label: "Weak", color: "bg-orange-500" },
  { label: "Fair", color: "bg-yellow-500" },
  { label: "Good", color: "bg-lime-500" },
  { label: "Strong", color: "bg-green-500" },
];

const PasswordField = ({
  label,
  name,
  value,
  onChange,
  show,
  onToggleShow,
}) => (
  <div>
    <label className="block font-body text-sm font-medium text-coffee-dark mb-1.5">
      {label}
    </label>
    <div className="relative">
      <Lock
        size={16}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
      />
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-11 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent/30 focus:border-coffee-accent transition-colors"
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40 hover:text-coffee-dark/70 transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);

const ChangePassword = () => {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [visibility, setVisibility] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [saving, setSaving] = useState(false);

  const strength = getStrength(form.next);
  const passwordsMatch =
    form.confirm.length === 0 || form.next === form.confirm;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShow = (field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1200); // TODO: connect to real API
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-coffee-dark/10 shadow-sm p-5 sm:p-8 space-y-5 max-w-lg"
    >
      <PasswordField
        label="Current Password"
        name="current"
        value={form.current}
        onChange={handleChange}
        show={visibility.current}
        onToggleShow={() => toggleShow("current")}
      />

      <div>
        <PasswordField
          label="New Password"
          name="next"
          value={form.next}
          onChange={handleChange}
          show={visibility.next}
          onToggleShow={() => toggleShow("next")}
        />

        {form.next.length > 0 && (
          <div className="mt-2.5">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full bg-coffee-dark/10 overflow-hidden"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i < strength ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                    className={`h-full rounded-full ${strengthMeta[strength].color}`}
                  />
                </div>
              ))}
            </div>
            <p className="font-body text-xs text-coffee-dark/50 mt-1.5">
              Strength:{" "}
              <span className="font-medium text-coffee-dark/70">
                {strengthMeta[strength].label}
              </span>
            </p>
          </div>
        )}
      </div>

      <div>
        <PasswordField
          label="Confirm New Password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          show={visibility.confirm}
          onToggleShow={() => toggleShow("confirm")}
        />
        {!passwordsMatch && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-xs text-red-500 mt-1.5"
          >
            Passwords do not match.
          </motion.p>
        )}
      </div>

      <ul className="font-body text-xs text-coffee-dark/50 space-y-1 pt-1">
        <li>• At least 8 characters</li>
        <li>• One uppercase letter and one number</li>
        <li>• One special character recommended</li>
      </ul>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        <button
          type="button"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-body text-sm font-medium text-coffee-dark/70 border border-coffee-dark/15 hover:bg-coffee-dark/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !passwordsMatch || !form.next}
          className="w-full sm:w-auto px-5 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Password"}
        </button>
      </div>
    </motion.form>
  );
};

export default ChangePassword;
