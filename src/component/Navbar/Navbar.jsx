
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({user,logOut}) {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">F-Store</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav w-100">
        <li className="nav-item">
          <Link className="nav-link active" to="">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="About">About</Link>
        </li>
        {user?
        <> 
        <li className="nav-item">
          <Link className="nav-link" to="Card">Card</Link>
        </li>
        </>: ''
        }
        {
          user? '' : 
          <>
          <li className="nav-item ms-auto">
            <Link className="nav-link" to="Login">Log in</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Register">Register</Link>
          </li>
          </>
        }
        {
          user?<>
          <li className="nav-item ms-auto">
            <p className="nav-link " onClick={logOut} style={{cursor:" pointer"}} >LogOut</p>
          </li>
        </>:''
        }
      </ul>
    </div>
  </div>
</nav>

  )
}
