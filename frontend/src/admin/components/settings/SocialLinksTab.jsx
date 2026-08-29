import { useState } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import SaveBar from "../../common/SaveBar";
import { socialLinks } from "../../constants/settingsData";

const SocialLinksTab = () => {
  const [links, setLinks] = useState(socialLinks);

  const handleChange = (e) => {
    setLinks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fields = [
    {
      key: "instagram",
      label: "Instagram",
      icon: FaInstagram,
      placeholder: "https://instagram.com/yourcafe",
    },
    {
      key: "facebook",
      label: "Facebook",
      icon: FaFacebookF,
      placeholder: "https://facebook.com/yourcafe",
    },
    {
      key: "twitter",
      label: "Twitter / X",
      icon: FaTwitter,
      placeholder: "https://twitter.com/yourcafe",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-7 space-y-4">
      <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
        Social Media Links
      </h3>
      <p className="font-body text-sm text-coffee-dark/50 -mt-2">
        These links appear in your website's footer and contact page.
      </p>

      <div className="space-y-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key}>
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 flex items-center gap-1.5">
                <Icon size={13} /> {field.label}
              </label>
              <input
                type="url"
                name={field.key}
                value={links[field.key]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
              />
            </div>
          );
        })}
      </div>

      <SaveBar onSave={() => console.log("Saved:", links)} />
    </div>
  );
};

export default SocialLinksTab;
