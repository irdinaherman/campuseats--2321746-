import { useEffect, useRef, useState } from 'react'

const MAHALLAHS = [
  'Ali',
  'Aminah',
  'Faruq',
  'Asiah',
  'Bilal',
  'Hafsa',
  'Uthman',
  'Zubair',
]

const HOURS = Array.from({ length: 16 }, (_, i) =>
  String(i + 7).padStart(2, '0')
)

const MINUTES = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, '0')
)

function WheelColumn({ options, value, onChange, label }) {
  const wheelRef = useRef(null)
  const itemHeight = 40

  useEffect(() => {
    const index = options.indexOf(value)

    if (wheelRef.current && index !== -1) {
      wheelRef.current.scrollTop = index * itemHeight
    }
  }, [options, value])

  function handleScroll() {
    if (!wheelRef.current) return

    const index = Math.round(
      wheelRef.current.scrollTop / itemHeight
    )

    const selected = options[index]

    if (selected !== undefined && selected !== value) {
      onChange(selected)
    }
  }

  return (
    <div className="time-wheel-column">
      <span className="time-wheel-label">{label}</span>

      <div className="time-wheel">
        <div
          className="time-wheel-list"
          ref={wheelRef}
          onScroll={handleScroll}
        >
          {options.map((option) => (
            <button
              type="button"
              key={option}
              className={`time-wheel-option ${
                option === value ? 'selected' : ''
              }`}
              onClick={() => {
                onChange(option)
                const index = options.indexOf(option)
                wheelRef.current?.scrollTo({
                  top: index * itemHeight,
                  behavior: 'smooth',
                })
              }}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="time-wheel-highlight" />
      </div>
    </div>
  )
}

function CheckoutForm({ onSubmit }) {
  const [customer, setCustomer] = useState({
    name: '',
    mahallah: '',
    pickupTime: '',
  })

  const [errors, setErrors] = useState({})

  const [selectedHour, setSelectedHour] = useState('12')
  const [selectedMinute, setSelectedMinute] = useState('00')

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

    const pickupTime = `${selectedHour}:${selectedMinute}`

    const newErrors = {}

    if (customer.name.trim().length < 3) {
      newErrors.name =
        'Please enter a name with at least 3 characters.'
    }

    if (!customer.mahallah) {
      newErrors.mahallah = 'Please choose your mahallah.'
    }

    if (
      pickupTime < '07:00' ||
      pickupTime > '22:00'
    ) {
      newErrors.pickupTime =
        'Pickup time must be between 07:00 and 22:00.'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      name: customer.name.trim(),
      mahallah: customer.mahallah,
      pickupTime,
    })
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Checkout</h2>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Enter your name"
        value={customer.name}
        onChange={handleChange}
        aria-invalid={Boolean(errors.name)}
      />
      {errors.name && <p role="alert">{errors.name}</p>}

      <label htmlFor="mahallah">Mahallah</label>
      <select
        id="mahallah"
        name="mahallah"
        value={customer.mahallah}
        onChange={handleChange}
        aria-invalid={Boolean(errors.mahallah)}
      >
        <option value="">Select your mahallah</option>
        {MAHALLAHS.map((mahallah) => (
          <option key={mahallah} value={mahallah}>
            {mahallah}
          </option>
        ))}
      </select>
      {errors.mahallah && (
        <p role="alert">{errors.mahallah}</p>
      )}

      <label>Pickup time</label>

      <div className="time-wheel-picker">
        <WheelColumn
          label="Hour"
          options={HOURS}
          value={selectedHour}
          onChange={(value) => {
            setSelectedHour(value)
            setErrors((current) => ({
              ...current,
              pickupTime: '',
            }))
          }}
        />

        <span className="time-wheel-colon">:</span>

        <WheelColumn
          label="Minute"
          options={MINUTES}
          value={selectedMinute}
          onChange={(value) => {
            setSelectedMinute(value)
            setErrors((current) => ({
              ...current,
              pickupTime: '',
            }))
          }}
        />
      </div>

      <p className="muted">
        Selected pickup time: {selectedHour}:{selectedMinute}
      </p>

      {errors.pickupTime && (
        <p role="alert">{errors.pickupTime}</p>
      )}

      <button type="submit" className="btn">
        Place Order
      </button>
    </form>
  )
}

export default CheckoutForm