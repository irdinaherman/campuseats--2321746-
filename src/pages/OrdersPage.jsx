
import { useCart } from '../context/CartContext.jsx'

function OrdersPage() {
  const { orders } = useCart()

  return (
    <main className="container">
      <h2 className="section-title">My Orders</h2>

      {orders.length === 0 ? (
        <section className="card">
          <p>You have no orders yet.</p>
        </section>
      ) : (
        orders.map((order) => (
          <article className="card" key={order.id}>
            <h3>Order #{order.id}</h3>

            <p className="muted">{order.date}</p>

            <h3>Order Status</h3>

            <p className="price">
              {order.status || 'Order Placed'}
            </p>

            <h3>Order Items</h3>

            {order.items.map((item, index) => (
              <div key={item.cartKey || `${order.id}-${item.id}-${index}`}>
                <p className="muted">
                  {item.vendorName || item.vendorId || 'CampusEats Vendor'}
                </p>

                <p>
                  {item.name} × {item.quantity}
                </p>
              </div>
            ))}

            <h3>
              Total: RM {order.total.toFixed(2)}
            </h3>
          </article>
        ))
      )}
    </main>
  )
}

export default OrdersPage
