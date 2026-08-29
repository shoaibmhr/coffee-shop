import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, ImagePlus, Link2, Upload } from "lucide-react";
import { adminCategories } from "../../constants/menuAdminData";

const emptyProduct = {
  name: "",
  category: adminCategories[0],
  description: "",
  image: "",
  sizes: [{ label: "Regular", price: "" }],
  status: "Active",
};

const ProductFormModal = ({ product, onClose, onSave }) => {
  // Initialized ONCE from props — no useEffect needed.
  // Parent passes a `key` so React remounts this component fresh
  // whenever it switches between "add" and a different "edit" target.
  const [formData, setFormData] = useState(product || emptyProduct);
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [imageTab, setImageTab] = useState("upload"); // "upload" | "url"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
      // Backend connect hone par: yahan file ko FormData me daal kar
      // POST /api/upload jaisi API call hogi, aur response se real URL milega
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...formData.sizes];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, sizes: updated }));
  };

  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { label: "", price: "" }],
    }));
  };

  const removeSize = (index) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: product?.id || Date.now(),
      sizes: formData.sizes.map((s) => ({
        ...s,
        price: parseFloat(s.price) || 0,
      })),
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-5 sm:p-6 border-b border-coffee-dark/10 sticky top-0 bg-white z-10">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-coffee-dark">
              {product ? "Edit Product" : "Add New Product"}
            </h3>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-coffee-cream transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-coffee-dark" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {/* Image upload */}
            <div>
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-2 block">
                Product Image
              </label>

              {/* Tab switcher */}
              <div className="flex items-center gap-1 bg-coffee-cream rounded-full p-1 w-fit mb-3">
                <button
                  type="button"
                  onClick={() => setImageTab("upload")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-colors ${
                    imageTab === "upload"
                      ? "bg-coffee-dark text-coffee-cream"
                      : "text-coffee-dark/60 hover:text-coffee-dark"
                  }`}
                >
                  <Upload size={13} /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab("url")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-body text-xs font-semibold transition-colors ${
                    imageTab === "url"
                      ? "bg-coffee-dark text-coffee-cream"
                      : "text-coffee-dark/60 hover:text-coffee-dark"
                  }`}
                >
                  <Link2 size={13} /> Image URL
                </button>
              </div>

              {imageTab === "upload" ? (
                <label className="relative flex items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-coffee-dark/20 cursor-pointer hover:border-coffee-accent transition-colors overflow-hidden bg-coffee-cream/30">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-coffee-dark/40">
                      <ImagePlus size={24} />
                      <span className="font-body text-xs">
                        Click to upload from device
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
              ) : (
                <div className="space-y-3">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                  />
                  {imagePreview && (
                    <div className="w-full h-36 rounded-xl overflow-hidden bg-coffee-cream/30">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImagePreview("")}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Name + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Signature Espresso"
                  className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                />
              </div>
              <div>
                <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                >
                  {adminCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-body text-xs font-semibold text-coffee-dark/70 mb-1.5 block">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={2}
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description of the item"
                className="w-full px-4 py-2.5 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors resize-none"
              />
            </div>

            {/* Sizes + Prices */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-body text-xs font-semibold text-coffee-dark/70">
                  Sizes & Prices
                </label>
                <button
                  type="button"
                  onClick={addSize}
                  className="flex items-center gap-1 text-xs font-body font-semibold text-coffee-accent hover:gap-1.5 transition-all"
                >
                  <Plus size={14} /> Add Size
                </button>
              </div>
              <div className="space-y-2">
                {formData.sizes.map((size, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={size.label}
                      onChange={(e) =>
                        handleSizeChange(i, "label", e.target.value)
                      }
                      placeholder="Size (e.g. Small)"
                      className="flex-1 px-3 py-2 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                    />
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(i, "price", e.target.value)
                      }
                      placeholder="Price"
                      className="w-24 px-3 py-2 rounded-lg border border-coffee-dark/15 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
                    />
                    {formData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSize(i)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-coffee-dark/40 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Availability toggle */}
            {/* Availability toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-coffee-cream/50">
              <span className="font-body text-sm font-medium text-coffee-dark">
                Available for order
              </span>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    status: prev.status === "Active" ? "Inactive" : "Active",
                  }))
                }
                className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${
                  formData.status === "Active"
                    ? "bg-coffee-accent"
                    : "bg-coffee-dark/20"
                }`}
              >
                <motion.span
                  animate={{ x: formData.status === "Active" ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow"
                />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm"
            >
              {product ? "Save Changes" : "Add Product"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductFormModal;
