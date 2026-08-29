import { useState } from "react";
import { ImagePlus } from "lucide-react";
import SaveBar from "../../common/SaveBar";
import { businessInfo } from "../../constants/settingsData";

const BusinessInfoTab = () => {
  const [formData, setFormData] = useState(businessInfo);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo: url }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-coffee-dark/5 p-5 sm:p-7 space-y-5">
      <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
        Business Information
      </h3>

      {/* Logo */}
      <div>
        <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-2 block">
          Logo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-coffee-cream shrink-0">
            <img
              src={formData.logo}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm font-medium text-coffee-dark hover:bg-coffee-cream/50 transition-colors cursor-pointer">
            <ImagePlus size={15} />
            Change Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Cafe Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Tagline
          </label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
          Address
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
        <div>
          <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors resize-none"
        />
      </div>

      <SaveBar onSave={() => console.log("Saved:", formData)} />
    </div>
  );
};

export default BusinessInfoTab;
