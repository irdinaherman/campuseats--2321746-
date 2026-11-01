
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart()

  return (
    <main className="container">
      <h2 className="section-title">My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <article className="card" key={item.id}>
              <h3>{item.name}</h3>
              <p className="price">RM {item.price.toFixed(2)}</p>

              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.id, Number(event.target.value))
                  }
                />
              </label>

              <p>
                Subtotal: RM {(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </article>
          ))}

          <h3>Total: RM {cartTotal.toFixed(2)}</h3>

          <Link to="/checkout" className="btn">
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  )
}

export default CartPage
