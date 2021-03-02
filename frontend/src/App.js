
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
        <Footer />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path="/me" component={Profile} exact />

      </div>
    </Router>
  );
}

export default App;
