import { createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"

const initialState = {
  cartItems,
  total: 0,
  amount: 2,
  isLoading: true,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
  },
})

export const { clearCart } = cartSlice.actions

export default cartSlice.reducer
