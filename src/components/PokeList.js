import { useState } from 'react'
import { Table, Dropdown, DropdownButton } from 'react-bootstrap'
import { useFetchPokemons } from '../hooks/useFetchPokemons'
import { useTranslation } from 'react-i18next'

import ReactPaginate from 'react-paginate'
import DisplayPokemons from './DisplayPokemons'

export default function PokeList() {
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [data, loading, error, dataCount] = useFetchPokemons(itemsPerPage, offset)
  const { t } = useTranslation()

  const pages = Math.floor(dataCount / itemsPerPage)

  const handleItemsPerPage = (e) => {
    const perPage = e.target.text
    const offset = Math.ceil(currentPage * perPage)
    setOffset(offset)
    setItemsPerPage(perPage)
  }

  const handlePageClick = (e) => {
    const selected = e.selected
    const offset = Math.ceil(selected * itemsPerPage)
    setCurrentPage(selected)
    setOffset(offset)
  }

  const tableColums = [
    'ID',
    t('pokemon_table_headings.name'),
    t('pokemon_table_headings.height'),
    t('pokemon_table_headings.weight'),
    t('pokemon_table_headings.type'),
  ]

  const dropDownItemsLabel = [5, 10, 50]

  if (loading) {
    return <div className='text-ligth'>{t('loading')}</div>
  }
  if (error) {
    return <div className='text-ligth'>{t('generic_error')}</div>
  }

  return (
    <>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>{tableColums && tableColums.map((colName) => <th key={colName}>{colName}</th>)}</tr>
        </thead>
        <tbody>
          <DisplayPokemons pokemons={data} />
        </tbody>
      </Table>

      <div className='d-flex justify-content-around w-100'>
        <DropdownButton onClick={(e) => e.target.blur()} id={`dropdown-variants-warning`} title='item per page'>
          {dropDownItemsLabel.map((label, index) => (
            <Dropdown.Item
              key={label}
              onClick={handleItemsPerPage}
              eventKey={index + 1}
              active={itemsPerPage === Number(label)}
            >
              {label}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <ReactPaginate
          nextLabel='>'
          previousLabel='<'
          previousClassName='page-link'
          nextClassName='page-link'
          disabledClassName='page-item disabled'
          activeLinkClassName='sr-only'
          pageLinkClassName='page-link'
          activeClassName='page-item active'
          pageCount={pages}
          onPageChange={handlePageClick}
          initialPage={currentPage}
          containerClassName='pagination'
        />
      </div>
    </>
  )
}
