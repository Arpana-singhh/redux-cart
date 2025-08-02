import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import productSlice from './productSlice'
const store = configureStore({
   reducer:{
      cart: cartSlice,
      products: productSlice
   }
})

store.subscribe(() => {
   const cartState = store.getState().cart;
   localStorage.setItem('cart', JSON.stringify(cartState));
});

export default store;