import { getTypes } from '../helpers/formating'
import { useHistory } from 'react-router-dom'

const DisplayPokemons = ({ pokemons }) => {
  const history = useHistory()
  return pokemons
    .sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id)
    .map((poke) => {
      const { id, name, height, weight, types } = poke
      return (
        <tr key={name} style={{ cursor: 'pointer' }} onClick={() => history.push(`/${id}`)}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{height}</td>
          <td>{weight}</td>
          <td>{getTypes(types)}</td>
        </tr>
      )
    })
}

export default DisplayPokemons
