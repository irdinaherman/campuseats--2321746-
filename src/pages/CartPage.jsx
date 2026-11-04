
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
      <h2 className="section-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <section className="card">
          <p>Your cart is currently empty.</p>

          <Link to="/" className="btn">
            Browse Vendors
          </Link>
        </section>
      ) : (
        <>
          {cartItems.map((item) => (
            <article className="card" key={item.cartKey}>
              <p className="muted">
                {item.vendorName || item.vendorId}
              </p>

              <h3>{item.name}</h3>

              <p className="price">
                RM {item.price.toFixed(2)} each
              </p>

              <div className="quantity-control">
                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    updateQuantity(item.cartKey, item.quantity - 1)
                  }
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  className="btn"
                  onClick={() =>
                    updateQuantity(item.cartKey, item.quantity + 1)
                  }
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>

              <p>
                Subtotal: RM{' '}
                {(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                type="button"
                className="btn"
                onClick={() => removeFromCart(item.cartKey)}
              >
                Remove
              </button>
            </article>
          ))}

          <section className="card">
            <h3>Total: RM {cartTotal.toFixed(2)}</h3>

            <Link to="/checkout" className="btn">
              Proceed to Checkout
            </Link>
          </section>
        </>
      )}
    </main>
  )
}

export default CartPage
