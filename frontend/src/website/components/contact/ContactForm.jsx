import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const socialLinks = [FaInstagram, FaFacebookF, FaTwitter];

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
          <div>
            <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help?"
            className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>

        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more..."
            className="w-full px-4 py-3 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitted}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-body font-semibold text-sm transition-colors duration-300 ${
            submitted
              ? "bg-green-600 text-white"
              : "bg-coffee-dark hover:bg-coffee-accent text-coffee-cream"
          }`}
        >
          {submitted ? (
            "Message Sent ✓"
          ) : (
            <>
              <Send size={15} /> Send Message
            </>
          )}
        </button>
      </form>

      {/* Social links */}
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-coffee-dark/10">
        <span className="font-body text-xs text-coffee-dark/50 mr-2">
          Follow us:
        </span>
        {socialLinks.map((Icon, i) => (
          
           <a key={i}
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