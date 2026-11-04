
import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

function MenuItemCard({ item, vendorId, vendorName }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAddToCart() {
    addToCart({
      ...item,
      vendorId,
      vendorName,
    })

    setAdded(true)
  }

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>

      <div className="menu-title-row">
        <h3>{item.name}</h3>

        {item.popular && (
          <span className="popular-badge">
            POPULAR
          </span>
        )}
      </div>

      <p className="muted">
        {item.description}
      </p>

      {vendorName && (
        <p className="muted">
          From: {vendorName}
        </p>
      )}

      {item.dietaryTags?.length > 0 && (
        <div className="dietary-tags">
          {item.dietaryTags.map((tag) => (
            <span className="dietary-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="price">
        RM {item.price.toFixed(2)}
      </p>

      <button
        type="button"
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
