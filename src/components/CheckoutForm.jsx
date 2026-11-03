
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

  function validateAddress(address) {
    const parts = address
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)

    const postcodeAndCity =
      /\b\d{5}\s+[A-Za-z][A-Za-z\s-]*\b/.test(address)

    const states = [
      'johor',
      'kedah',
      'kelantan',
      'melaka',
      'negeri sembilan',
      'pahang',
      'penang',
      'pulau pinang',
      'perak',
      'perlis',
      'sabah',
      'sarawak',
      'selangor',
      'terengganu',
      'kuala lumpur',
      'labuan',
      'putrajaya',
    ]

    const hasState = states.some((state) =>
      parts.some((part) =>
        part.toLowerCase() === state
      )
    )

    const hasMalaysia = parts.some(
      (part) => part.toLowerCase() === 'malaysia'
    )

    return (
      parts.length >= 5 &&
      parts[0].length >= 3 &&
      parts[1].length >= 3 &&
      postcodeAndCity &&
      hasState &&
      hasMalaysia
    )
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newErrors = {}

    if (!customer.name.trim()) {
      newErrors.name = 'Please enter your full name.'
    }

    if (!customer.phone.trim()) {
      newErrors.phone = 'Please enter your phone number.'
    } else if (!/^01[0-9]-?[0-9]{7,8}$/.test(customer.phone.trim())) {
      newErrors.phone = 'Please enter a valid Malaysian mobile number.'
    }

    if (!customer.address.trim()) {
      newErrors.address = 'Please enter your delivery address.'
    } else if (!validateAddress(customer.address.trim())) {
      newErrors.address =
        'Please enter a complete address: building or location, street, postcode and city, state, and Malaysia.'
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

      {errors.name && <p role="alert">{errors.name}</p>}

      <label>
        Phone Number
        <input
          type="tel"
          name="phone"
          placeholder="0123456789"
          value={customer.phone}
          onChange={handleChange}
          aria-invalid={Boolean(errors.phone)}
        />
      </label>

      {errors.phone && <p role="alert">{errors.phone}</p>}

      <label>
        Complete Delivery Address
        <textarea
          name="address"
          placeholder="Mahallah Bilal, Jalan Sungai Pusu, 53100 Gombak, Selangor, Malaysia"
          value={customer.address}
          onChange={handleChange}
          aria-invalid={Boolean(errors.address)}
        />
      </label>

      {errors.address && <p role="alert">{errors.address}</p>}

      <button type="submit" className="btn">
        Place Order
      </button>
    </form>
  )
}

export default CheckoutForm
