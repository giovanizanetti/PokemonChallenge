import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/constants'

export const useFetchPokemons = (itemsPerPage, offset) => {
  const url = `${BASE_URL}?limit=${itemsPerPage}&offset=${offset}`

  const [data, setData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const fetchPokeDetails = (data) => {
      let pageData = []
      data.forEach((item) =>
        axios
          .get(item.url)
          .then((res) => {
            pageData = pageData.concat([res.data])
            setData(pageData)
          })
          .catch((err) => console.error(err))
      )
    }

    axios
      .get(url)
      .then((response) => {
        const { count, results } = response.data
        setDataCount(count)
        fetchPokeDetails(results)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [url])

  return [data, loading, error, dataCount]
}
