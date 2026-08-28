import { useState } from "react";
import { motion, } from "framer-motion";
import {
  Calendar,
  Clock,
  Minus,
  Plus,
  Send,
  CheckCircle2,
} from "lucide-react";

const today = new Date().toISOString().split("T")[0];

const ReserveForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    request: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const adjustGuests = (delta) => {
    setForm((prev) => ({
      ...prev,
      guests: Math.min(12, Math.max(1, prev.guests + delta)),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration later: POST /api/reservations
    setSubmitted(true);
  };

  const inputClasses =
    "w-full h-12 sm:h-13 px-4 bg-coffee-cream/40 border border-coffee-dark/10 rounded-lg text-coffee-dark text-sm font-body placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent focus:bg-white transition-colors duration-300";

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center text-center py-16 sm:py-20"
      >
        <div className="w-16 h-16 rounded-full bg-coffee-accent/10 flex items-center justify-center mb-5">
          <CheckCircle2 size={32} className="text-coffee-accent" />
        </div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-coffee-dark">
          Reservation Requested
        </h3>
        <p className="font-body text-sm sm:text-base text-coffee-dark/60 mt-3 max-w-sm leading-relaxed">
          Thanks, {form.name.split(" ")[0] || "there"}! We've received your
          request for {form.guests} {form.guests === 1 ? "guest" : "guests"}{" "}
          on {form.date || "your selected date"}. We'll confirm shortly by
          email or phone.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              phone: "",
              date: "",
              time: "",
              guests: 2,
              request: "",
            });
          }}
          className="mt-8 px-6 py-3 border border-coffee-dark text-coffee-dark font-body text-xs font-bold uppercase tracking-[0.15em] hover:bg-coffee-dark hover:text-coffee-cream transition-colors duration-300"
        >
          Make Another Reservation
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Phone + Guests */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
            className={inputClasses}
          />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
            Number of Guests
          </label>
          <div className="flex items-center h-12 sm:h-13 bg-coffee-cream/40 border border-coffee-dark/10 rounded-lg">
            <button
              type="button"
              onClick={() => adjustGuests(-1)}
              aria-label="Decrease guests"
              className="w-11 h-full flex items-center justify-center text-coffee-dark hover:text-coffee-accent transition-colors duration-200"
            >
              <Minus size={15} />
            </button>
            <span className="flex-1 text-center font-body text-sm font-semibold text-coffee-dark">
              {form.guests} {form.guests === 1 ? "Guest" : "Guests"}
            </span>
            <button
              type="button"
              onClick={() => adjustGuests(1)}
              aria-label="Increase guests"
              className="w-11 h-full flex items-center justify-center text-coffee-dark hover:text-coffee-accent transition-colors duration-200"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
            Date
          </label>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/40 pointer-events-none"
            />
            <input
              type="date"
              name="date"
              required
              min={today}
              value={form.date}
              onChange={handleChange}
              className={`${inputClasses} pl-11`}
            />
          </div>
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
            Time
          </label>
          <div className="relative">
            <Clock
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/40 pointer-events-none"
            />
            <input
              type="time"
              name="time"
              required
              value={form.time}
              onChange={handleChange}
              className={`${inputClasses} pl-11`}
            />
          </div>
        </div>
      </div>

      {/* Special Request */}
      <div className="mt-5">
        <label className="font-body text-xs font-semibold text-coffee-dark/70 uppercase tracking-wide mb-2 block">
          Special Request{" "}
          <span className="text-coffee-dark/40 normal-case font-normal">
            (optional)
          </span>
        </label>
        <textarea
          name="request"
          value={form.request}
          onChange={handleChange}
          placeholder="Window seat, birthday celebration, dietary needs..."
          rows={4}
          className="w-full px-4 py-3 bg-coffee-cream/40 border border-coffee-dark/10 rounded-lg text-coffee-dark text-sm font-body placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent focus:bg-white transition-colors duration-300 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="group w-full sm:w-auto flex items-center justify-center gap-2 mt-7 px-8 py-3.5 bg-coffee-dark hover:bg-coffee-accent text-coffee-cream font-body text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300"
      >
        Reserve Now
        <Send
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
};

export default ReserveForm;
