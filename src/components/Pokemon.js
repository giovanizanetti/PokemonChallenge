import { BASE_URL } from '../config/constants'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getTypes } from '../helpers/formating'

export default function PokeList() {
  const { id } = useParams()
  const [pokemon: data, loading, error] = useFetch(BASE_URL + id)
  const { name, height, weight, types, sprites } = pokemon !== undefined && pokemon
  const itemClass = 'text-nowrap text-capitalize float-end'

  if (loading) {
    return <div className='text-ligth'>Loading...</div>
  }
  if (error) {
    return <div className='text-ligth'>An error occurred!</div>
  }

  return (
    <>
      {pokemon && (
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem className='text-uppercase'>
              <span
                style={{ marginLeft: '2rem' }}
                className='d-flex align-items-center justify-content-around text-nowrap'
              >
                <strong>{name}</strong>
                <img alt={name} className='h-2' src={`${sprites.front_shiny}`} />
              </span>
            </ListGroupItem>
            <ListGroupItem>
              ID
              <strong className={itemClass}>{id}</strong>
            </ListGroupItem>
            <ListGroupItem>
              Height
              <strong className={itemClass}>{height}</strong>
            </ListGroupItem>
            <ListGroupItem>
              Weight
              <strong className={itemClass}>{weight}</strong>
            </ListGroupItem>
            <ListGroupItem>
              <span>{`${types.length > 1 ? 'Types: ' : 'Type: '}`}</span>
              <strong className={itemClass} style={{ float: 'right' }}>
                {getTypes(types)}
              </strong>
            </ListGroupItem>
          </ListGroup>
        </Card>
      )}
    </>
  )
}
