import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    items:[]
  },
  reducers: {
    addItem:(state,action)=>{
        state.items.push(action.payload)
    },
    removeItem:(state,action)=>{
      const itemIdToRemove = action.payload;
        
        const itemIndex = state.items.findIndex(
          (item) => item.card.info.id === itemIdToRemove
        );

        if (itemIndex > -1) {
          state.items.splice(itemIndex, 1);
        }
    },
    clearCart:(state)=>{
        state.items.length = 0;
    }

  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer