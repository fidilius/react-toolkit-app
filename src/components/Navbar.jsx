import { CartIcon } from "../icons"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { calculateTotals } from "../features/cart/cartSlice"

const Navbar = () => {
  const { amount, cartItems } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <nav>
      <div className="nav-center">
        <h3>Redux Toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
