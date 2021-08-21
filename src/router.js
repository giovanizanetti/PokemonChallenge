import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PokeList from './components/PokeList'
import Pokemon from './components/Pokemon'

export default function BasicExample() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <PokeList />
        </Route>
        <Route path='/:id'>
          <Pokemon />
        </Route>
      </Switch>
    </Router>
  )
}
