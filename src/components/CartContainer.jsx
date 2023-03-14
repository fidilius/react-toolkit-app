import CartItem from "./CartItem"
import { useSelector, useDispatch } from "react-redux"
import { getCartItems, calculateTotals } from "../features/cart/cartSlice"
import { useEffect } from "react"
import { openModal } from "../features/modal/modalSlice"

const CartContainer = () => {
  const { amount, total, cartItems, isLoading } = useSelector(
    (store) => store.cart
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <section className="cart">
        <header>
          <h2>loading...</h2>
        </header>
      </section>
    )
  }

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>$ {total.toFixed(2)}</span>
          </h4>
          <button
            className="btn clear-btn"
            onClick={() => dispatch(openModal())}
          >
            clear
          </button>
        </div>
      </footer>
    </section>
  )
}
export default CartContainer
