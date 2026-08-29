import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import MenuTable from "../components/menu/MenuTable";
import ProductFormModal from "../components/menu/ProductFormModal";
import ConfirmDialog from "../common/ConfirmDialog";
import { menuAdminItems, adminCategories } from "../constants/menuAdminData";

const MenuManagement = () => {
  const [items, setItems] = useState(menuAdminItems);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, categoryFilter, searchTerm]);

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingProduct(item);
    setShowForm(true);
  };

  const handleSave = (product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [...prev, product];
    });
    setShowForm(false);
  };

  const handleDeleteConfirm = () => {
    setItems((prev) => prev.filter((p) => p.id !== deletingItem.id));
    setDeletingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-coffee-dark">
            Menu Items
          </h1>
          <p className="font-body text-sm text-coffee-dark/50 mt-1">
            Manage your product catalog.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-coffee-dark hover:bg-coffee-accent transition-colors font-body font-semibold text-coffee-cream text-sm shrink-0"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {["All", ...adminCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`shrink-0 px-4 py-2 rounded-full font-body text-xs sm:text-sm font-semibold transition-colors ${
                categoryFilter === cat
                  ? "bg-coffee-dark text-coffee-cream"
                  : "bg-white text-coffee-dark/60 border border-coffee-dark/10 hover:border-coffee-dark/25"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-coffee-dark/10 font-body text-sm focus:outline-none focus:border-coffee-accent transition-colors"
          />
        </div>
      </div>

      <MenuTable
        items={filteredItems}
        onEdit={handleEdit}
        onDelete={setDeletingItem}
      />

      {showForm && (
        <ProductFormModal
          key={editingProduct?.id || "new"}
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
      {deletingItem && (
        <ConfirmDialog
          title="Delete this product?"
          message={`"${deletingItem.name}" will be permanently removed from your menu.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </div>
  );
};

export default MenuManagement;
