
import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage(
    'campuseats-cart',
    []
  )

  const [orders, setOrders] = useLocalStorage(
    'campuseats-orders',
    []
  )

  // Add an item using both vendor ID and menu item ID.
  function addToCart(item) {
    const cartKey = `${item.vendorId}-${item.id}`

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.cartKey === cartKey
      )

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.cartKey === cartKey
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      }

      return [
        ...currentItems,
        {
          ...item,
          cartKey,
          quantity: 1,
        },
      ]
    })
  }

  // Remove an item using its unique cart key.
  function removeFromCart(cartKey) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.cartKey !== cartKey
      )
    )
  }

  // Update the quantity of a specific cart item.
  function updateQuantity(cartKey, quantity) {
    if (quantity < 1) {
      removeFromCart(cartKey)
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity }
          : item
      )
    )
  }

  // Empty the shopping cart.
  function clearCart() {
    setCartItems([])
  }

  // Calculate total number of items.
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // Calculate the total price.
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // Save a new order.
  function placeOrder(customerDetails) {
    if (cartItems.length === 0) {
      return
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      customer: customerDetails,
      status: 'Order Placed',
      date: new Date().toLocaleString(),
    }

    setOrders((currentOrders) => [
      ...currentOrders,
      newOrder,
    ])

    clearCart()
  }

  // Update an order's status.
  function updateOrderStatus(orderId, newStatus) {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        updateOrderStatus,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
