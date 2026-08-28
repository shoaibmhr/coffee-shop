import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("blendbrew_cart", JSON.stringify(state.cart.items));
  localStorage.setItem(
    "blendbrew_wishlist",
    JSON.stringify(state.wishlist.items),
  );
});
