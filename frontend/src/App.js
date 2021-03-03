
import React, { useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { loadUser } from './actions/userActions'
import store from './store'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from "./components/Home"
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'






function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])


  return (
    <Router>
      <Header />
      <div className="App">

        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} exact />
        <Route path="/product/:id" component={ProductDetails} exact />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedRoute path="/me" component={Profile} exact />
        <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
        <Route path="/password/forgot" component={ForgotPassword} exact />
        <Route path="/password/reset/:token" component={NewPassword} exact />
        <Route path="/cart" component={Cart} exact />
        <ProtectedRoute path="/shipping" component={Shipping} exact />

      </div>

      <Footer />

    </Router>
  );
}

export default App;
