
import { useEffect, useRef, useState } from 'react'

const HOURS = Array.from({ length: 16 }, (_, index) =>
  String(index + 7).padStart(2, '0')
)

const MINUTES = Array.from({ length: 60 }, (_, index) =>
  String(index).padStart(2, '0')
)

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

function WheelColumn({ label, options, value, onChange }) {
  const wheelRef = useRef(null)

  useEffect(() => {
    const index = options.indexOf(value)

    if (wheelRef.current && index >= 0) {
      wheelRef.current.scrollTop = index * 40
    }
  }, [value, options])

  function handleScroll() {
    if (!wheelRef.current) return

    const index = Math.round(wheelRef.current.scrollTop / 40)
    const selected = options[index]

    if (selected && selected !== value) {
      onChange(selected)
    }
  }

  function selectOption(option, index) {
    onChange(option)

    wheelRef.current?.scrollTo({
      top: index * 40,
      behavior: 'smooth',
    })
  }

  return (
    <div className="wheel-column-wrap">
      <span className="wheel-label">{label}</span>

      <div
        className="time-wheel-column"
        ref={wheelRef}
        onScroll={handleScroll}
      >
        {options.map((option, index) => (
          <button
            type="button"
            key={option}
            className={value === option ? 'selected' : ''}
            onClick={() => selectOption(option, index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

function CheckoutForm({ onSubmit }) {
  const [name, setName] = useState('')
  const [mahallah, setMahallah] = useState('')
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('00')
  const [error, setError] = useState('')

  const pickupTime = `${hour}:${minute}`

  function handleSubmit(event) {
    event.preventDefault()

    if (name.trim().length < 3) {
      setError('Please enter your full name.')
      return
    }

    if (!mahallah) {
      setError('Please select your mahallah.')
      return
    }

    setError('')

    onSubmit({
      name: name.trim(),
      mahallah,
      pickupTime,
    })
  }

  return (
    <section className="card checkout-form">
      <h3>Pickup Details</h3>

      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Mahallah
          <select
            value={mahallah}
            onChange={(event) => setMahallah(event.target.value)}
          >
            <option value="">Select your mahallah</option>
            {MAHALLAHS.map((item) => (
              <option key={item} value={item}>
                Mahallah {item}
              </option>
            ))}
          </select>
        </label>

        <div className="pickup-time-section">
          <label>Pickup Time</label>

          <p className="muted">
            Scroll to choose your preferred pickup time.
          </p>

          <div className="time-picker">
            <WheelColumn
              label="HOUR"
              options={HOURS}
              value={hour}
              onChange={setHour}
            />

            <span className="time-wheel-colon">:</span>

            <WheelColumn
              label="MINUTE"
              options={MINUTES}
              value={minute}
              onChange={setMinute}
            />
          </div>

          <p className="selected-pickup-time">
            Your pickup time: {pickupTime}
          </p>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="btn">
          Place Order
        </button>
      </form>
    </section>
  )
}

export default CheckoutForm
