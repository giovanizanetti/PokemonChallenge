import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

export default function PokeList() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
      const data = await response.data.results
      await console.log(response)
      setPokemons(data)
    }
    fetchPokemon()
  }, [])

  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>URL</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon, i) => {
          return (
            <tr>
              <td>{i + 1}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.url}</td>
              <td>@mdo</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
