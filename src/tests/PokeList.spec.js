import { render, screen } from '@testing-library/react'
import PokeList from '../components/PokeList'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'

describe('testSuite', () => {
  // beforeEach(() => {

  // })
  test('should component display a table containing ten pokemon raws', async () => {
    render(<PokeList />)

    await screen.debug()
  })
})
