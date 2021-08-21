import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router-dom'

export default function PokeList() {
  const [pokemons, setPokemons] = useState([])
  const history = useHistory()
  const [shouldUpdate, setShouldUpdate] = useState(true)

  useEffect(() => {
    // if (shouldUpdate) {
    const fetchPokeDetails = (data) => {
      const list = []
      data.forEach((poke) =>
        axios
          .get(poke.url)
          .then((res) => {
            setPokemons((prevState) => prevState.concat([res.data]))
          })
          .catch((err) => console.log(err))
      )
    }

    const fetchPokemon = () => {
      axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then((res) => res.data.results)
        .then((data) => fetchPokeDetails(data))
        .catch((err) => console.log(err))
    }

    fetchPokemon()
    setShouldUpdate(false)
    // }
  }, [])

  //TODO: push id to router
  const handleClick = (id) => history.push(`/${id}`)

  // If more them one type add comma between
  const formatTypes = (types) => {
    return types.map((type, i) => (i !== types.length - 1 ? type.type.name + ', ' : type.type.name))
  }

  const displayPokemons = () => {
    return (
      pokemons !== null &&
      pokemons.map((poke) => {
        const { id, name, height, weight, types } = poke
        return (
          <tr onClick={() => handleClick(id)} key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{height}</td>
            <td>{weight}</td>
            <td>{formatTypes(types)}</td>
          </tr>
        )
      })
    )
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
