import { BASE_URL } from '../config/constants'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { getTypes } from '../helpers/formating'
import { useTranslation } from 'react-i18next'

export default function PokeList() {
  const { id } = useParams()
  const [pokemon: data, loading, error] = useFetch(BASE_URL + id)
  const { name, height, weight, types, sprites } = pokemon !== undefined && pokemon
  const itemClass = 'text-nowrap text-capitalize float-end'
  const { t } = useTranslation()

  if (loading) {
    return <div className='text-ligth'>{t('loading')}</div>
  }
  if (error) {
    return <div className='text-ligth'>{t('generic_error')}</div>
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
              {t('pokemon_card_items.id')}
              <strong className={itemClass}>{id}</strong>
            </ListGroupItem>
            <ListGroupItem>
              {t('pokemon_card_items.height')}
              <strong className={itemClass}>{height}</strong>
            </ListGroupItem>
            <ListGroupItem>
              {t('pokemon_card_items.weight')}
              <strong className={itemClass}>{weight}</strong>
            </ListGroupItem>
            <ListGroupItem>
              <span>{`${
                types.length > 1 ? t('pokemon_card_items.type.plural') : t('pokemon_card_items.type.singular')
              }`}</span>
              <strong className={itemClass}>{getTypes(types)}</strong>
            </ListGroupItem>
          </ListGroup>
        </Card>
      )}
    </>
  )
}
