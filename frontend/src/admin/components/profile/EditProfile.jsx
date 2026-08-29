import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, User, Briefcase, Save } from "lucide-react";

const EditProfile = () => {
  const [avatarPreview, setAvatarPreview] = useState(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=80&w=200&auto=format&fit=crop",
  );
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@blendbrew.com",
    phone: "+92 300 1234567",
    role: "Manager",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
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
      className="bg-white rounded-2xl border border-coffee-dark/10 shadow-sm overflow-hidden"
    >
      {/* Avatar section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-5 sm:p-8 border-b border-coffee-dark/10 bg-coffee-cream/20">
        <div className="relative shrink-0">
          <img
            src={avatarPreview}
            alt="Avatar preview"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-white shadow-md"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-coffee-accent text-white flex items-center justify-center cursor-pointer hover:bg-coffee-accent/90 transition-colors shadow-sm"
          >
            <Camera size={15} />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <div className="text-center sm:text-left">
          <p className="font-body font-semibold text-coffee-dark text-base">
            Profile Photo
          </p>
          <p className="font-body text-xs text-coffee-dark/50 mt-0.5 max-w-xs">
            JPG or PNG. Square image recommended, at least 200x200px.
          </p>
        </div>
      </div>

      {/* Form fields */}
      <div className="p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div className="sm:col-span-1">
          <label className="block font-body text-sm font-medium text-coffee-dark mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
            />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent/30 focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block font-body text-sm font-medium text-coffee-dark mb-1.5">
            Role
          </label>
          <div className="relative">
            <Briefcase
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
            />
            <input
              type="text"
              name="role"
              value={form.role}
              disabled
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-coffee-dark/10 bg-coffee-cream/30 font-body text-sm text-coffee-dark/60 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block font-body text-sm font-medium text-coffee-dark mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent/30 focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className="block font-body text-sm font-medium text-coffee-dark mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm text-coffee-dark focus:outline-none focus:ring-2 focus:ring-coffee-accent/30 focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 px-5 sm:px-8 py-5 border-t border-coffee-dark/10 bg-coffee-cream/10">
        <button
          type="button"
          className="w-full sm:w-auto px-5 py-2.5 rounded-lg font-body text-sm font-medium text-coffee-dark/70 border border-coffee-dark/15 hover:bg-coffee-dark/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm disabled:opacity-60"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </motion.form>
  );
};

export default EditProfile;
