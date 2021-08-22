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
  const [baseUrl, setBaseUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
  const [currentPageUrl, setCurrentPageUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?limit=10`)
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
    const goToSelectedPage = (pageNumber) => {
      /* When the user clicks on the curret page 'current' is appended to the active page state.
       Therefore I check if current page I do not change page the page.
       At the same time is necessery to remove the current string and reassing the state without 
      the word 'current', so active state is still applied to the page button
    */
      if (pageNumber.includes('current')) {
        return setActive(pageNumber[0])
      }

      const startIndex = pageNumber * itemsPerPage - itemsPerPage
      setCurrentPageUrl(`${baseUrl}&offset=${startIndex}`)
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
  }, [active, itemsPerPage, nextPageUrl, baseUrl])

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
    setItemsPerPage(e.target.text)
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/?limit=${e.target.text}`)
    setBaseUrl(`https://pokeapi.co/api/v2/pokemon/?limit=${e.target.text}`)
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

      <div className='d-flex justify-content-around w-80'>
        <DropdownButton onClick={(e) => e.target.blur()} id={`dropdown-variants-warning`} title='item per page'>
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
      </div>
    </>
  )
}
