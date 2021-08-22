import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

export default function PokeList() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState()
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.data
        setPokemon(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPokemon()
  }, [id])

  const formatTypes = (types) => {
    return types.map((type, i) => (i !== types.length - 1 ? type.type.name + ', ' : type.type.name))
  }

  const displayTypes = (types) => {
    return (
      <ListGroupItem>
        <div>{`${types.length > 1 ? 'Types are: ' : ' Type is '}`}</div>
        <strong className='text-capitalize'>{formatTypes(types)}</strong>
      </ListGroupItem>
    )
  }

  return (
    <Card style={{ width: '18rem' }}>
      {
        // const { name, height, weight, types } = pokemon && pokemon
        pokemon && (
          <ListGroup variant='flush'>
            <ListGroupItem className='text-uppercase'>
              <strong>{pokemon.name}</strong>
            </ListGroupItem>
            <ListGroupItem>
              ID is <strong className='text-capitalize '>{id}</strong>
            </ListGroupItem>
            <ListGroupItem>
              Heigth is <strong className='text-capitalize'>{pokemon.height}</strong>
            </ListGroupItem>
            <ListGroupItem>
              Weight is <strong className='text-capitalize'>{pokemon.weight}</strong>
            </ListGroupItem>
            <ListGroupItem>
              Weight is <strong className='text-capitalize'>{pokemon.weight}</strong>
            </ListGroupItem>
            {displayTypes(pokemon.types)}
          </ListGroup>
        )
      }
    </Card>
  )
}
