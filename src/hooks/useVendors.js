
import { useEffect, useState } from 'react'

function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchVendors() {
      try {
        const response = await fetch('/api/vendors.json')

        if (!response.ok) {
          throw new Error('Failed to load vendors.')
        }

        const data = await response.json()
        setVendors(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  return { vendors, loading, error }
}

export default useVendors
