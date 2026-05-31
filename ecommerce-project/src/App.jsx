import axios from 'axios'
import { useState, useEffect } from 'react'
import{Routes, Route} from 'react-router'
import {HomePage} from './pages/home/HomePage'
import {CheckoutPage} from './pages/checkout/CheckoutPage'
import {OrdersPage} from './pages/orders/OrdersPage'
import {TrackingPage} from './pages/TrackingPage'
import {ProductPage} from './pages/product/ProductPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const loadCart = async()=>{
      const response = await axios.get('/api/cart-items?expand=product')
       setCart(response.data)
    }
  useEffect(() => {
    loadCart()
  }, [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} /> 
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} /> 
      <Route path="orders" element={<OrdersPage cart={cart}  />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
      <Route path="products/:productId" element={<ProductPage cart={cart} loadCart={loadCart} />} />
    </Routes>
    
  )
}

export default App
