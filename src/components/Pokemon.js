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
        console.log(data)
        setPokemon(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchPokemon()
  }, [])

  return (
    <Card style={{ width: '18rem' }}>
      {pokemon && (
        <ListGroup variant='flush'>
          <ListGroupItem className='text-uppercase'>{pokemon.name}</ListGroupItem>
          <ListGroupItem>
            Heigth is <span className='text-capitalize'>{pokemon.height}</span>
          </ListGroupItem>
          <ListGroupItem>
            Weight is <span className='text-capitalize'>{pokemon.weight}</span>
          </ListGroupItem>
        </ListGroup>
      )}
    </Card>
  )
}
