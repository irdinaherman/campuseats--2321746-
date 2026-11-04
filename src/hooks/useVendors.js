
import { useEffect, useState } from 'react'

function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to load vendors.')
        }

        const data = await response.json()
        setVendors(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchVendors()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  function reload() {
    setRetryCount((count) => count + 1)
  }

  return { vendors, loading, error, reload }
}

export default useVendors
