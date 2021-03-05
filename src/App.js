import dotenv from 'dotenv'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './assets/sass/_style.scss'
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom'

import * as ROUTES from './constants/routes'
import Navigation from './components/Navigation'
import HomePage from './components/pages/HomePage'
import Cart from './components/Cart/Cart'

dotenv.config()

const axiosDefaultHeader = {
  cookie:
    '__cfduid=dcd347b02bcc50c89e42c29e4a994e5391613329627; __cf_bm=023c6721868a22d5c5513539a3d408a0eb806000-1613411630-1800-AekJ2f5aDRV68O4WDMaxfItoNS1uS89rRUN%2BbxORuThnJQsngbHkBGYe2uEiuzhIkIEmgQ1Gz4XsyZTXL8MbP00%3D',
  Authorization: process.env.REACT_APP_PRINTFUL_KEY,
  'Content-Type': 'application/json',
}

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})

  const fetchProducts = async () => {
    const {
      data,
    } = await axios.get(
      `${process.env.REACT_APP_API_URL}/sync/products/216065088`,
      { headers: axiosDefaultHeader }
    )
    setProducts(data.result)
  }
  const handleAddToCart = (product, size) => {
    console.log('cart', cart)
    // concat data for look up of product variant
    // Snail Pace - Heather Blue / S
    const lookUpValue = `${product.name} / ${size}`
    products.sync_variants.forEach((p) => {
      if (p.name.includes(lookUpValue)) {
        if (cart.totalItems) {
          const exists = cart.totalItems.findIndex((item) => item.id === p.id)
          console.log('exists', exists)
          if (exists > -1) {
            const newCart = cart
            let updatedItem = newCart.totalItems[exists]
            updatedItem = { ...updatedItem, quantity: updatedItem.quantity + 1 }
            newCart.totalItems[exists] = updatedItem
            setCart(newCart)
          } else {
            const newItem = { ...p, quantity: 1 }
            const newTotal = [...cart.totalItems, newItem]
            setCart({ ...cart, totalItems: newTotal })
          }
        } else {
          const newItem = { ...p, quantity: 1 }
          setCart({ ...cart, totalItems: [newItem] })
        }
      }
    })
  }

  const handleRemoveFromCart = (product) => {
    const newTotalItems = cart.totalItems.filter(
      (item) => item.id !== product.id
    )
    setCart({ ...cart, totalItems: newTotalItems })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Router>
      <Navigation cart={cart} />
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <HomePage onAddToCart={handleAddToCart} products={products} />
        </Route>
        <Route exact path="/cart">
          <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
        </Route>
      </Switch>
    </Router>
  )
}
export default App
