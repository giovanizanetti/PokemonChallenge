import { Suspense } from 'react'
import './App.css'
import Route from './router'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()
  return (
    <div>
      <Router>
        <Nav
          className='bg-warning w-100 d-flex justify-content-end p-4 align-items-center h-30'
          activeKey='/home'
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
          <NavLink to='/'>
            <span className='m-5'>{t('nav_links.home')}</span>
          </NavLink>
        </Nav>

        <div className='App-body'>
          <Route />
        </div>
      </Router>
    </div>
  )
}

export default App
