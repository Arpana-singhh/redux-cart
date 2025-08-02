import {createSlice} from '@reduxjs/toolkit';


const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice= createSlice({
    name: 'cart',
    initialState,
    // get data in payload from ui and update in state 
    reducers:{
     add(state, action){
      const product =action.payload;
      const existingProduct = state.find(item=> item.id == product.id);
      if(existingProduct){
        existingProduct.quantity += 1;
      }
      else{
        state.push({...product, quantity:1});
      }
       
     },

     remove(state, action){
       return state.filter(item => item.id !== action.payload)
     },

     increaseQuantity(state, action){
      const product = state.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const product = state.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    clearCart() {
      return [];
  },
    }
})

export const {add, remove, increaseQuantity, decreaseQuantity,  clearCart } = cartSlice.actions;
export default cartSlice.reducer;