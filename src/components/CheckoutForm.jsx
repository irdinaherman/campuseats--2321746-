
import { useState } from 'react'

function CheckoutForm({ onSubmit }) {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
  })

  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!customer.name.trim()) {
      newErrors.name = 'Please enter your full name.'
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.'
    }

    if (!customer.address.trim()) {
      newErrors.address = 'Please enter your delivery address.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: customer.name.trim(),
      phone: customer.phone.trim(),
      address: customer.address.trim(),
    })
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Checkout Details</h2>

      <label>
        Full Name
        <input
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
        />
      </label>

      {errors.name && (
        <p role="alert">{errors.name}</p>
      )}

      <label>
        Phone Number
        <input
          type="tel"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          aria-invalid={Boolean(errors.phone)}
        />
      </label>

      {errors.phone && (
        <p role="alert">{errors.phone}</p>
      )}

      <label>
        Delivery Address
        <textarea
          name="address"
          value={customer.address}
          onChange={handleChange}
          aria-invalid={Boolean(errors.address)}
        />
      </label>

      {errors.address && (
        <p role="alert">{errors.address}</p>
      )}

      <button type="submit" className="btn">
        Place Order
      </button>
    </form>
  )
}

export default CheckoutForm
