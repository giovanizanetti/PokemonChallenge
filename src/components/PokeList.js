import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Pagination, Dropdown, DropdownButton } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function PokeList() {
  const [pokemons, setPokemons] = useState([])
  const history = useHistory()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [active, setActive] = useState(1)
  const [paginationItems, setPaginationItems] = useState([])
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon/?limit=${itemsPerPage}`
  const [currentPageUrl, setCurrentPageUrl] = useState(BASE_URL)
  const [nextPageUrl, setNextPageUrl] = useState()
  const [previousPageUrl, setPreviousPageUrl] = useState()

  //Handle API request
  useEffect(() => {
    const fetchPokeDetails = (data) => {
      const list = []
      data.forEach((poke) =>
        axios
          .get(poke.url)
          .then((res) => setPokemons((list) => list.concat([res.data])))
          .catch((err) => console.log(err))
      )
      setPokemons(list)
    }

    const fetchPokemon = () => {
      axios
        .get(currentPageUrl)
        .then((res) => {
          setNextPageUrl(res.data.next)
          setPreviousPageUrl(res.data.previous)
          return res.data.results
        })
        .then((data) => fetchPokeDetails(data))
        .catch((err) => console.log(err))
    }
    fetchPokemon()
  }, [itemsPerPage, currentPageUrl])

  // If more them one type add comma between
  const formatTypes = (types) => {
    return types.map((type, i) => (i !== types.length - 1 ? type.type.name + ', ' : type.type.name))
  }

  //Handle pagination
  useEffect(() => {
    // const goToSelectedPage = (pageNumber) => {
    //   if (pageNumber == 1) {
    //     return setCurrentPageUrl(BASE_URL)
    //   }
    //   setCurrentPageUrl(`${BASE_URL}&offset=${pageNumber}0`)
    // }

    const goToSelectedPage = (pageNumber) => {
      const startIndex = pageNumber * itemsPerPage - itemsPerPage
      const endIndex = startIndex + itemsPerPage
      setCurrentPageUrl(`${BASE_URL}&offset=${startIndex}`)
      // return pokemons.slice(startIndex, endIndex)
    }

    const displayPageButtons = () => {
      let items = []
      //hardcoded total number of buttuns
      for (let number = 1; number <= 10; number++) {
        items.push(
          <Pagination.Item
            key={number}
            onClick={(e) => {
              setActive(e.target.innerText)
              goToSelectedPage(e.target.innerText)
            }}
            active={number == active}
          >
            {number}
          </Pagination.Item>
        )
      }
      setPaginationItems(items)
      return items
    }

    displayPageButtons()
  }, [active, itemsPerPage, nextPageUrl, BASE_URL])

  const displayPokemons = () => {
    return pokemons
      .sort((a, b) => a.id - b.id)
      .map((poke) => {
        const { id, name, height, weight, types } = poke
        return (
          <tr style={{ cursor: 'pointer' }} onClick={() => history.push(`/${id}`)} key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{height}</td>
            <td>{weight}</td>
            <td>{formatTypes(types)}</td>
          </tr>
        )
      })
  }

  const handleItemsPerPage = (e) => {
    e.target.blur()
    setItemsPerPage(e.target.text)
    console.log(e.target.text)
  }

  return (
    <>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>{displayPokemons()}</tbody>
      </Table>

      <DropdownButton id={`dropdown-variants-warning`} title='item per page'>
        <Dropdown.Item onClick={handleItemsPerPage} eventKey='1' active={itemsPerPage == 5}>
          5
        </Dropdown.Item>
        <Dropdown.Item onClick={handleItemsPerPage} eventKey='2' active={itemsPerPage == 10}>
          10
        </Dropdown.Item>
        <Dropdown.Item onClick={handleItemsPerPage} eventKey='3' active={itemsPerPage == 50}>
          50
        </Dropdown.Item>
      </DropdownButton>

      <Pagination size='md'>
        <Pagination.Prev
          disabled={active <= 1 && true}
          onClick={() => {
            setCurrentPageUrl(previousPageUrl)
            setActive((prevState) => Number(prevState) - 1)
          }}
        />
        {paginationItems}
        <Pagination.Next
          disabled={active >= paginationItems.length}
          onClick={(e) => {
            setCurrentPageUrl(nextPageUrl)
            setActive((prevState) => Number(prevState) + 1)
          }}
        />
      </Pagination>
    </>
  )
}
