import React, { Component } from 'react';
// because wanna use BrowserRouter as Router here 
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Footer from './components/layout/Footer';
import './App.css';

// A component placed router should be the kind of home page
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          {/* exact needs to add, otherwise multiple routes will invoke */}
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
