
import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import Users from './views/users/';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

class App extends Component {
  


  render() {
    return (
      <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route path="/about" component={About} />
    </div>
  </Router>
    );
  }
}

export default App;
