
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

  function addToCart(item) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id
      )

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }

      return [...currentItems, { ...item, quantity: 1 }]
    })
  }

  function removeFromCart(itemId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    )
  }

  function updateQuantity(itemId, quantity) {
    if (quantity < 1) {
      removeFromCart(itemId)
      return
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  function placeOrder(customerDetails) {
    if (cartItems.length === 0) {
      return
    }

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      total: cartTotal,
      customer: customerDetails,
      date: new Date().toLocaleString(),
    }

    setOrders((currentOrders) => [...currentOrders, newOrder])
    clearCart()
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
