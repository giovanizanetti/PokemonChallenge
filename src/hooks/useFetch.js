import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = (url) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    axios
      .get(url)
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        console.error(err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [url])

  return [data, loading, error]
}
