"use client"

import Navigation from '@/components/Navigation/Navigation';

import Header from './header'

const Layout = ({  }) => {
  return (
   
<div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%' }}>

        <Header />
      </div>
      <div style={{ width: '100%' }}>
        <Navigation />
      </div>
  
    </div>

  )
}

export default Layout
