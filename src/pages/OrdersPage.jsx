
import { useCart } from '../context/CartContext.jsx'

function OrdersPage() {
  const { orders } = useCart()

  return (
    <main className="container">
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <article className="card" key={order.id}>
            <h3>Order #{order.id}</h3>
            <p className="muted">{order.date}</p>

            {order.items.map((item) => (
              <p key={item.id}>
                {item.name} × {item.quantity}
              </p>
            ))}

            <h3>Total: RM {order.total.toFixed(2)}</h3>
          </article>
        ))
      )}
    </main>
  )
}

export default OrdersPage
