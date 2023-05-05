import React from 'react'
import ProductsList from './ProductsList'
import { ShoppingCartProvider } from './ShoppingCartContext';


function Home() {
  return (
    <div>
      <ShoppingCartProvider>
        <ProductsList />    
      </ShoppingCartProvider>
    </div>
  )
}

export default Home