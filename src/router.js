import React from 'react'
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import PokeList from './components/PokeList'
import Pokemon from './components/Pokemon'
import Nav from 'react-bootstrap/Nav'

export default function BasicExample() {
  return (
    <Switch>
      <Route exact path='/'>
        <PokeList />
      </Route>
      <Route path='/:id'>
        <Pokemon />
      </Route>
    </Switch>
  )
}
