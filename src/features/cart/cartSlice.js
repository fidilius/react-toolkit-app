import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"

const url = "https://course-api.com/react-useReducer-cart-project"

const initialState = {
  cartItems,
  total: 0,
  amount: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err))
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      )
      state.cartItems = newCartItems
    },
    increase: (state, action) => {
      const theItem = state.cartItems.find((item) => item.id === action.payload)
      theItem.amount++
    },
    decrease: (state, action) => {
      const theItem = state.cartItems.find((item) => item.id === action.payload)

      if (theItem.amount === 0) return

      theItem.amount--
    },
    calculateTotals: (state) => {
      let total = 0
      let cartAmount = 0

      state.cartItems.forEach((item) => {
        const { amount, price } = item
        const subTotal = amount * price

        total += subTotal
        cartAmount += amount
      })

      state.amount = cartAmount.toLocaleString("en-US")
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: () => {},
    [getCartItems.fulfilled]: () => {},
    [getCartItems.rejected]: () => {},
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
