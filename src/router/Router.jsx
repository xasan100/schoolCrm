import React from 'react'
import Sigin from '../components/login/sigin/index.jsx'

export default function Router() {
  return (
    <div>
      {<Sigin /> ? true : ''}
    </div>
  )
}
