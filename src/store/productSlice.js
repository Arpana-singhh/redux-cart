import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status:'idle'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },

//   another better way
extraReducers: (builder) =>{
    builder
    .addCase(getProduct.pending, (state, action)=>{
        state.status ='loading';
    })
    .addCase(getProduct.fulfilled, (state, action)=>{
        state.data=action.payload;
        state.status ='idle'
    })
    .addCase(getProduct.rejected, (state, action)=>{
        state.status = 'error'
    })
}
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;



// export function getProduct() {
//   return async function getProductThunk(dispatch, getState) {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       const result = await response.json();
//       dispatch(fetchProducts(result));
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };
// }

//simple  way compare to above
export const getProduct = createAsyncThunk('products/get', async() => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json(); 
    //no need to pass dispatcher because there is nothing in the dispatchers
    return result;
})
