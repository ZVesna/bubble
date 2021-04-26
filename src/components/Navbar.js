import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  
  return <div className='navbar'>
    <ul>
      <li>
        <Link to={'/bubble'}>Home</Link>
      </li>
      <li>
        <Link to={'/bubble/user'}>My Profile</Link>
      </li>
      <li>
        <Link to={'/bubble/register'}>Register</Link>
      </li>
      <li>
        <Link to={'/bubble/auth/local'}>Login</Link>
      </li>
    </ul>
  </div>
}