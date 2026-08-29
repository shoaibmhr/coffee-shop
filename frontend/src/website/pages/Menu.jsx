import { useEffect, useMemo, useState } from "react";
import PageHero from "../common/PageHero";
import MenuFilters from "../components/menu/MenuFilters";
import MenuGrid from "../components/menu/MenuGrid";
import { apiRequest } from "../../services/api";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const [productsData, categoriesData] = await Promise.all([
          apiRequest("/products"),
          apiRequest("/categories"),
        ]);

        setMenuItems(productsData.products);

        setCategories([
          "All",
          ...categoriesData.categories.map((category) => category.name),
        ]);
      } catch (error) {
        console.error("Menu loading error:", error);
        setError(error.message || "Could not load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchTerm]);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        title="Our Menu"
        breadcrumb="Menu"
        subtitle="Explore our full range of handcrafted coffee, cold brews, and fresh bakes — made with love, served with pride."
        bgImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />

      <MenuFilters
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {loading && (
        <section className="w-full bg-coffee-ivory py-20 text-center">
          <p className="font-body text-sm text-coffee-dark/60">
            Loading menu...
          </p>
        </section>
      )}

      {!loading && error && (
        <section className="w-full bg-coffee-ivory py-20 text-center px-5">
          <p className="font-body text-sm text-red-600">{error}</p>
        </section>
      )}

      {!loading && !error && <MenuGrid items={filteredItems} />}
    </main>
  );
};

export default Menu;
