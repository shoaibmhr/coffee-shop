import { createSlice } from "@reduxjs/toolkit";

const getInitialItems = () => {
  try {
    const stored = localStorage.getItem("blendbrew_wishlist");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: getInitialItems(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectTotalWishlist = (state) => state.wishlist.items.length;
export const makeSelectIsWishlisted = (id) => (state) =>
  state.wishlist.items.some((i) => i.id === id);

export default wishlistSlice.reducer;
