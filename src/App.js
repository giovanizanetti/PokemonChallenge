import './App.css'
import PokeList from './components/PokeList.js'

import Router from './router'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Router />
        {/* <PokeList /> */}
      </header>
    </div>
  )
}

export default App
