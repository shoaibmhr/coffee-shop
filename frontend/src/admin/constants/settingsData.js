export const businessInfo = {
  name: "Blend & Brew Coffee Shop",
  tagline: "Blended Flavors, Brewed to Perfection",
  address: "123 Market Street, San Francisco, CA 94103",
  phone: "+92 300 123 4567",
  email: "hello@blendandbrew.com",
  description:
    "Since 2014, we've hand-picked the finest single-origin beans from small family farms, roasting each batch fresh to bring out its true character in every cup.",
  logo: "/assets/logo.png",
};

export const operatingHours = [
  { day: "Monday", open: "07:00", close: "21:00", closed: false },
  { day: "Tuesday", open: "07:00", close: "21:00", closed: false },
  { day: "Wednesday", open: "07:00", close: "21:00", closed: false },
  { day: "Thursday", open: "07:00", close: "21:00", closed: false },
  { day: "Friday", open: "07:00", close: "21:00", closed: false },
  { day: "Saturday", open: "08:00", close: "22:00", closed: false },
  { day: "Sunday", open: "08:00", close: "22:00", closed: false },
];

export const paymentMethods = [
  { key: "cash", label: "Cash", enabled: true },
  { key: "card", label: "Card", enabled: true },
  { key: "jazzcash", label: "JazzCash", enabled: true },
  { key: "easypaisa", label: "Easypaisa", enabled: true },
];

export const deliverySettings = {
  deliveryFee: 2.5,
  freeDeliveryOver: 25,
  pickupReadyTime: 20,
};

export const notificationSettings = [
  { key: "newOrder", label: "New order received", enabled: true },
  { key: "newReservation", label: "New table reservation", enabled: true },
  { key: "lowStock", label: "Low stock alerts", enabled: false },
  { key: "customerReview", label: "New customer review", enabled: true },
];

export const socialLinks = {
  instagram: "https://instagram.com/blendandbrew",
  facebook: "https://facebook.com/blendandbrew",
  twitter: "https://twitter.com/blendandbrew",
};
