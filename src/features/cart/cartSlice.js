import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const url = "https://course-api.com/react-useReducer-cart-projects"

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, thunkAPI) => {
    try {
      // console.log(_)
      // console.log(thunkAPI)

      const res = await axios(url)
      return res.data
    } catch (error) {
      // console.log(error.response)
      return thunkAPI.rejectWithValue("something went wrong")
    }
  }
)

const initialState = {
  cartItems: [],
  total: 0,
  amount: 0,
  isLoading: true,
}

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

      state?.cartItems?.forEach((item) => {
        const { amount, price } = item
        const subTotal = amount * price

        total += subTotal
        cartAmount += amount
      })

      state.amount = cartAmount.toLocaleString("en-US")
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(getCartItems.fulfilled, (state, action) => {
      // console.log(action)
      state.isLoading = false
      state.cartItems = action.payload
    })

    builder.addCase(getCartItems.rejected, (state, action) => {
      // console.log(action.payload)
      state.isLoading = false
    })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
