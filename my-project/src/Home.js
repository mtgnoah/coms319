import React from 'react'
import ProductsList from './ProductsList'
import NavBar from './NavBar'

import { ShoppingCartProvider } from './ShoppingCartContext';


function Home() {
  return (
    <div>
      <ShoppingCartProvider>
        <NavBar />
        <ProductsList />    
      </ShoppingCartProvider>
    </div>
  )
}

export default Home