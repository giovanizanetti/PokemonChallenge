import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

export default function PokeList() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    if (!pokemons.length) {
      const fetchPokeDetails = (data) => {
        const list = []

        data.forEach((poke) =>
          axios
            .get(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
            .then((res) => {
              const { id, name, height, weight, types } = res.data

              return {
                id,
                name,
                height,
                weight,
                types,
              }
            })
            .then((poke) => {
              list.push(poke)
              setPokemons(list)
            })
            .catch((err) => console.log(err))
        )
      }

      const fetchPokemon = async () => {
        try {
          const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
          const data = await response.data.results
          fetchPokeDetails(data)
        } catch (err) {
          console.log(err)
        }
      }

      fetchPokemon()
    }
  }, [pokemons])

  const displayPokemons = () => {
    return pokemons
      .sort(function (a, b) {
        return a.id - b.id
      })
      .map((poke) => {
        const { id, name, height, weight, types } = poke
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{height}</td>
            <td>{weight}</td>
            <td></td>
          </tr>
        )
      })
  }

  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Height</th>
          <th>Weight</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>{displayPokemons()}</tbody>
    </Table>
  )
}
