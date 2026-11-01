
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

function MenuItemCard({ item }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart(item)
    setAdded(true)
  }

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>

      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        className="btn"
        disabled={!item.available}
        onClick={handleAddToCart}
      >
        {!item.available
          ? 'Sold out'
          : added
            ? 'Added!'
            : 'Add to cart'}
      </button>
    </article>
  )
}

export default MenuItemCard
