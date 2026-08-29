import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Pencil, Trash2, ImageOff } from "lucide-react";
import { initialCategories } from "../constants/categoriesAdminData";
import CategoryFormModal from "../components/menu/CategoryFormModal";
import StatusBadge from "../common/StatusBadge";

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSave = (data) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === data.id);
      return exists
        ? prev.map((c) => (c.id === data.id ? data : c))
        : [data, ...prev];
    });
    setShowForm(false);
  };

  const confirmDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-coffee-dark">
            Categories
          </h1>
          <p className="font-body text-sm text-coffee-dark/50 mt-1">
            Organize your menu into browsable categories.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm shrink-0"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-dark/35"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-coffee-dark/15 bg-white font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
        />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl border border-coffee-dark/8 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-coffee-dark/8 bg-coffee-cream/40">
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Category
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Description
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Items
              </th>
              <th className="text-left font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Status
              </th>
              <th className="text-right font-body text-xs font-semibold text-coffee-dark/60 uppercase tracking-wide px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((cat) => (
                <motion.tr
                  key={cat.id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  className="border-b border-coffee-dark/6 last:border-0 hover:bg-coffee-cream/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-coffee-cream shrink-0">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-coffee-dark/30">
                            <ImageOff size={16} />
                          </div>
                        )}
                      </div>
                      <span className="font-body text-sm font-semibold text-coffee-dark">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-coffee-dark/55 max-w-xs line-clamp-1">
                      {cat.description}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-body text-sm text-coffee-dark/70">
                      {cat.itemCount} items
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={cat.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        aria-label="Edit category"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-coffee-dark/60 hover:text-coffee-accent hover:bg-coffee-accent/10 transition-colors"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        aria-label="Delete category"
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-coffee-dark/60 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-14 font-body text-sm text-coffee-dark/40">
            No categories found.
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        <AnimatePresence>
          {filtered.map((cat) => (
            <motion.div
              key={cat.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="bg-white rounded-xl border border-coffee-dark/8 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-coffee-cream shrink-0">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-coffee-dark/30">
                      <ImageOff size={16} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-body text-sm font-semibold text-coffee-dark truncate">
                      {cat.name}
                    </h3>
                    <StatusBadge status={cat.status} />
                  </div>
                  <p className="font-body text-xs text-coffee-dark/50 mt-1 line-clamp-1">
                    {cat.description}
                  </p>
                  <p className="font-body text-xs text-coffee-dark/40 mt-1">
                    {cat.itemCount} items
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-coffee-dark/8">
                <button
                  onClick={() => handleEdit(cat)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-coffee-dark/70 hover:text-coffee-accent hover:bg-coffee-accent/10 transition-colors font-body text-xs font-semibold"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(cat)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-coffee-dark/70 hover:text-red-500 hover:bg-red-50 transition-colors font-body text-xs font-semibold"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-14 font-body text-sm text-coffee-dark/40">
            No categories found.
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      {showForm && (
        <CategoryFormModal
          key={editingCategory?.id || "new"}
          category={editingCategory}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteTarget(null)}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-sm p-6"
            >
              <h3 className="font-heading text-lg font-bold text-coffee-dark">
                Delete "{deleteTarget.name}"?
              </h3>
              <p className="font-body text-sm text-coffee-dark/55 mt-2 leading-relaxed">
                This will remove the category. Items inside it won't be
                deleted, but will need to be reassigned.
              </p>
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 py-2.5 rounded-full border border-coffee-dark/15 font-body text-sm font-semibold text-coffee-dark hover:bg-coffee-cream transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-2.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors font-body text-sm font-semibold text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Categories;
