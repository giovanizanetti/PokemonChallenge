import { useEffect } from 'react'
import { BASE_URL } from '../config/constants'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'

export default function PokeList() {
  const { id } = useParams()
  const [data, loading, error] = useFetch(BASE_URL + id)

  const formatTypes = (types) => {
    return types.map((type, i) => (i !== types.length - 1 ? type.type.name + ', ' : type.type.name))
  }

  const displayTypes = (types) => {
    return (
      <ListGroupItem>
        <span className='text-nowrap'>{`${types.length > 1 ? 'Types: ' : 'Type: '}`}</span>
        <strong style={{ float: 'right' }} className='text-capitalize'>
          {formatTypes(types)}
        </strong>
      </ListGroupItem>
    )
  }

  const { name, height, weight, types, sprites } = data !== undefined && data

  return (
    <>
      {error && 'an error occurred'}
      {loading && 'loading'}
      {data && (
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem className='text-uppercase'>
              <span style={{ marginLeft: '2rem' }} className='d-flex align-items-center justify-content-around'>
                <strong>{name}</strong>
                <img className='h-2' src={`${sprites.front_shiny}`} />
              </span>
            </ListGroupItem>
            <ListGroupItem>
              ID
              <strong style={{ float: 'right' }} className='text-capitalize '>
                {id}
              </strong>
            </ListGroupItem>
            <ListGroupItem>
              Heigth
              <strong style={{ float: 'right' }} className='text-capitalize'>
                {height}
              </strong>
            </ListGroupItem>
            <ListGroupItem>
              Weight
              <strong style={{ float: 'right' }} className='text-capitalize'>
                {weight}
              </strong>
            </ListGroupItem>
            <ListGroupItem>
              Weight
              <strong style={{ float: 'right' }} className='text-capitalize'>
                {weight}
              </strong>
            </ListGroupItem>
            {displayTypes(types)}
          </ListGroup>
        </Card>
      )}
    </>
  )
}
