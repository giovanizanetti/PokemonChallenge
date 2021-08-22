import './App.css'
import Router from './router'
import Nav from 'react-bootstrap/Nav'

function App() {
  return (
    <div>
      <Nav className='bg-warning w-100' activeKey='/home' onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
        <Nav.Item>
          <Nav.Link href='/home'>Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='container'>
        <Router />
      </div>
    </div>
  )
}

export default App
