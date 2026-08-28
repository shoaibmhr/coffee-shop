import { createSlice } from "@reduxjs/toolkit";

const getInitialItems = () => {
  try {
    const stored = localStorage.getItem("blendbrew_cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Cart line is unique by product id + selected size
const makeCartId = (id, sizeLabel) => `${id}-${sizeLabel}`;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialItems(),
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, image, description, size } = action.payload;
      const cartId = makeCartId(id, size.label);
      const existing = state.items.find((i) => i.cartId === cartId);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          cartId,
          id,
          name,
          image,
          description,
          size: size.label,
          numericPrice: size.price,
          quantity: 1,
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.cartId !== action.payload);
    },
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.cartId === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.cartId === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.cartId !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.numericPrice * i.quantity, 0);

export default cartSlice.reducer;
