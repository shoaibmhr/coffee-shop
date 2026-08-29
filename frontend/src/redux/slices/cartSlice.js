import { createSlice } from "@reduxjs/toolkit";

const getInitialItems = () => {
  try {
    const stored = localStorage.getItem("blendbrew_cart");
    const items = stored ? JSON.parse(stored) : [];

    return items.filter((item) => item.id && item.sizeId);
  } catch {
    return [];
  }
};

const makeCartId = (id, sizeId) => `${id}-${sizeId}`;

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: getInitialItems(),
  },

  reducers: {
    addItem: (state, action) => {
      const { id, name, image, description, size } = action.payload;
      const cartId = makeCartId(id, size.id);

      const existing = state.items.find((item) => item.cartId === cartId);

      if (existing) {
        existing.quantity += 1;
        return;
      }

      state.items.push({
        cartId,
        id,
        name,
        image,
        description,
        sizeId: size.id,
        size: size.label,
        numericPrice: size.price,
        quantity: 1,
      });
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartId !== action.payload,
      );
    },

    increaseQty: (state, action) => {
      const item = state.items.find((item) => item.cartId === action.payload);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item.cartId === action.payload);

      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (cartItem) => cartItem.cartId !== action.payload,
          );
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("blendbrew_cart");
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectTotalItems = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.numericPrice * item.quantity,
    0,
  );

export default cartSlice.reducer;
