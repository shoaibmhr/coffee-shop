import { useState } from "react";
import { Check } from "lucide-react";

const SaveBar = ({ onSave }) => {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex justify-end pt-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={saved}
        className={`flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors duration-300 ${
          saved
            ? "bg-green-600 text-white"
            : "bg-coffee-dark hover:bg-coffee-accent text-coffee-cream"
        }`}
      >
        {saved ? (
          <>
            <Check size={16} /> Saved
          </>
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
};

export default SaveBar;
