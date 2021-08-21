import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function PokeList() {
  useEffect(() => {
    // const fetchPokemon = async () => {
    //   const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
    //   const data = await response.data.results
    //   await console.log(response)
    //   setPokemons(data)
    // }
    // fetchPokemon()
  }, [])

  return (
    <Card style={{ width: '18rem' }}>
      <ListGroup variant='flush'>
        <ListGroupItem>Cras justo odio</ListGroupItem>
        <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
        <ListGroupItem>Vestibulum at eros</ListGroupItem>
      </ListGroup>
    </Card>
  )
}
