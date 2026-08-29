import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { apiRequest } from "../../../services/api";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSubmitted(false);

      await apiRequest("/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setFormData(initialForm);
      setSubmitted(true);
    } catch (error) {
      setError(error.message || "Could not send your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-sm p-7 sm:p-9"
    >
      <span className="font-body tracking-[0.2em] text-xs font-semibold text-coffee-accent uppercase">
        Get In Touch
      </span>

      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark mt-2 mb-6">
        Send Us a Message
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent"
          />

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent"
          />
        </div>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone / WhatsApp Number (optional)"
          className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent"
        />

        <input
          type="text"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent"
        />

        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us more..."
          className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent resize-none"
        />

        {error && <p className="font-body text-sm text-red-600">{error}</p>}

        {submitted && (
          <p className="font-body text-sm text-green-600">
            Message sent successfully. We will contact you soon.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm bg-coffee-dark hover:bg-coffee-accent disabled:opacity-60 text-coffee-cream transition-colors"
        >
          {loading ? "Sending..." : "Send Message"}
          {!loading && <Send size={15} />}
        </button>
      </form>

      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-coffee-dark/10">
        {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
          <a
            key={index}
            href="#"
            className="w-9 h-9 rounded-full bg-coffee-cream flex items-center justify-center hover:bg-coffee-accent hover:text-white text-coffee-dark transition-colors"
          >
            <Icon size={13} />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default ContactForm;
