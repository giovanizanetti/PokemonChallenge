import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'

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

  return <div>Pokemon</div>
}
