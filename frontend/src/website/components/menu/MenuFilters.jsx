import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Container from "../../common/Container";

const MenuFilters = ({
  categories,
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="sticky top-16 md:top-20 z-30 bg-coffee-cream/95 backdrop-blur-md border-b border-coffee-dark/10 py-4 sm:py-5">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative shrink-0 font-body text-xs sm:text-sm font-semibold uppercase tracking-wide pb-2 transition-colors whitespace-nowrap ${
                  activeCategory === category
                    ? "text-coffee-accent"
                    : "text-coffee-dark/60 hover:text-coffee-dark"
                }`}
              >
                {category}

                {activeCategory === category && (
                  <motion.span
                    layoutId="menu-tab-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-coffee-accent rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-64 shrink-0">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-coffee-dark/40"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search menu..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-coffee-dark/10 font-body text-sm text-coffee-dark placeholder:text-coffee-dark/35 focus:outline-none focus:border-coffee-accent transition-colors"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MenuFilters;
