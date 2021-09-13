import { useEffect, useState } from 'react'
import axios from 'axios'
// import { useHistory } from 'react-router-dom'

export const useFetchPokemons = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const fetchPokeDetails = (data) => {
      data.forEach((item) =>
        axios
          .get(item.url)
          .then((res) => setData((list) => list.concat([res.data])))
          .catch((err) => console.log(err))
      )
    }

    axios
      .get(url)
      .then((response) => {
        const results = response.data.results
        fetchPokeDetails(results)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [url])

  return [data, loading, error]
}
