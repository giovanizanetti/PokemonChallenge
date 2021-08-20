import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PokeList() {
  useEffect(
    axios
      .get('https://pokeapi.co/api/v2/', {
        params: {
          offset: 20,
          limit: 20,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err)),
    []
  )

  return <div>hello</div>
}
