import { useState, useMemo } from "react";
import PageHero from "../common/PageHero";
import MenuFilters from "../components/menu/MenuFilters";
import MenuGrid from "../components/menu/MenuGrid";
import { menuItems } from "../constants/menuData";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <main className="w-full overflow-x-hidden">
      <PageHero
        title="Our Menu"
        breadcrumb="Menu"
        subtitle="Explore our full range of handcrafted coffee, cold brews, and fresh bakes — made with love, served with pride."
        bgImage="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?fm=jpg&q=80&w=1600&auto=format&fit=crop"
      />
      <MenuFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <MenuGrid items={filteredItems} />
    </main>
  );
};

export default Menu;
