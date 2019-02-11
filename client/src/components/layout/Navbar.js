// if you're gonna type "rfc" if you installed snippets, 
// it'll return "React Functional Component"
// import React from 'react'

// export default () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// but in this case because it needs to add lifecycle method later,
// type "rcc" instead, to return "React Class Component"
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      // react is returning JSX. so we need to have className instead of class
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;