export const adminCategories = [
  "Hot Coffee",
  "Cold Brew",
  "Fresh Juices",
  "Smoothies",
  "Snacks & Pastries",
];

export const menuAdminItems = [
  {
    id: 1,
    name: "Signature Espresso",
    category: "Hot Coffee",
    description: "Rich, bold single-origin espresso with a velvety crema.",
    image:
      "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?fm=jpg&q=80&w=200&auto=format&fit=crop",
    sizes: [
      { label: "Small", price: 3.0 },
      { label: "Medium", price: 3.5 },
      { label: "Large", price: 4.0 },
    ],
    status: "Active",
  },
  {
    id: 2,
    name: "Creamy Cappuccino",
    category: "Hot Coffee",
    description: "Perfectly steamed microfoam atop smooth espresso.",
    image:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?fm=jpg&q=80&w=200&auto=format&fit=crop",
    sizes: [
      { label: "Small", price: 4.0 },
      { label: "Medium", price: 4.5 },
      { label: "Large", price: 5.0 },
    ],
    status: "Active",
  },
  {
    id: 3,
    name: "Artisan Latte",
    category: "Hot Coffee",
    description: "Silky espresso blended with steamed milk, latte art on top.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?fm=jpg&q=80&w=200&auto=format&fit=crop",
    sizes: [
      { label: "Small", price: 4.5 },
      { label: "Medium", price: 5.0 },
      { label: "Large", price: 5.5 },
    ],
    status: "Active",
  },
  {
    id: 4,
    name: "Iced Cold Brew",
    category: "Cold Brew",
    description: "Slow-steeped 18 hours for a smooth, bold flavor.",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?fm=jpg&q=80&w=200&auto=format&fit=crop",
    sizes: [
      { label: "Small", price: 3.75 },
      { label: "Medium", price: 4.25 },
      { label: "Large", price: 4.75 },
    ],
    status: "Active",
  },
  {
    id: 5,
    name: "Mango Smoothie",
    category: "Smoothies",
    description: "Creamy mango blended with yogurt and honey.",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?fm=jpg&q=80&w=200&auto=format&fit=crop",
    sizes: [
      { label: "Small", price: 5.0 },
      { label: "Medium", price: 5.5 },
      { label: "Large", price: 6.0 },
    ],
    status: "Inactive",
  },
  {
    id: 6,
    name: "Butter Croissant",
    category: "Snacks & Pastries",
    description: "Flaky, buttery, baked fresh every morning.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?fm=jpg&q=80&w=200&auto=format&fit=crop",
    sizes: [{ label: "Regular", price: 3.25 }],
    status: "Active",
  },
];
