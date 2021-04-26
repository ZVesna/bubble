import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import Footer from './components/Footer'

import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/bubble" component={Home}/>
      <Route path="/bubble/register" component={Register}/>
      <Route path="/bubble/auth/local" component={Login}/>
      <Route path="/bubble/user" component={UserProfile}/>
    </Switch>
    <Footer />
  </BrowserRouter>
)

export default App