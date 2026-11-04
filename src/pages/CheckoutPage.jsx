
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CheckoutPage() {
  const { cartItems, cartTotal, placeOrder } = useCart()
  const navigate = useNavigate()

  function handleCheckout(customerDetails) {
    if (cartItems.length === 0) {
      return
    }

    placeOrder(customerDetails)
    navigate('/orders')
  }

  if (cartItems.length === 0) {
    return (
      <main className="container">
        <h2 className="section-title">Checkout</h2>
        <p>
          Your cart is empty. Please add items before checkout.
        </p>
        <Link to="/" className="btn">
          Browse Vendors
        </Link>
      </main>
    )
  }

  return (
    <main className="container">
      <h2 className="section-title">Checkout</h2>

      <section className="card">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <article key={item.cartKey}>
            <p className="muted">
              {item.vendorName || item.vendorId}
            </p>

            <p>
              {item.name} × {item.quantity}
            </p>

            <p>
              RM {(item.price * item.quantity).toFixed(2)}
            </p>
          </article>
        ))}

        <h3>Total: RM {cartTotal.toFixed(2)}</h3>
      </section>

      <CheckoutForm onSubmit={handleCheckout} />
    </main>
  )
}

export default CheckoutPage
