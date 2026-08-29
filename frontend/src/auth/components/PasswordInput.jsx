import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = ({ label, name, value, onChange, placeholder, required = true }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <Lock
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
        />
        <input
          type={visible ? "text" : "password"}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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
  );
};

export default PasswordInput;
