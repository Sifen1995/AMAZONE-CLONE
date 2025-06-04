import React from 'react';
import Home from './pages/home/Home';
import Signup from './pages/auth/Signup';
import Cart from './pages/cart/cart';
import Payment from './pages/payment/Payment';
import Orders from './pages/orders/Orders';
import Result from './pages/results/Result';
import ProductDetail from './pages/productDetail/ProductDetail';
import {CheckoutProvider, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/protectedRoute';


 export const stripePromise=loadStripe(" pk_test_51RUz36PtCXBKj5EZAyznycFgi49p8bxsvoZaxNHQg5nI6Ca1g2T3neuv76LLE2NniFFQzCVhYq0DjvsiNPJitaPM00vwIbfIXI")
export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/payment' element={<ProtectedRoute msg={"you must login to pay"} redirect={"/payment"}> <Elements stripe={stripePromise}><Payment /></Elements></ProtectedRoute> }/>
        <Route path='/auth' element={<Signup/>}/>
        <Route path='/Orders' element={<ProtectedRoute msg={"you must login to your see orders"} redirect={"/Orders"}> <Orders /></ProtectedRoute> }/>
        <Route path='/category/:categoryName' element={<Result/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
      </Routes>
    </Router>
  )
}
