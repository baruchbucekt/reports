
import React, { Component } from 'react';
import './App.css';
import { Menubar } from 'primereact/menubar';
import { Router, Route } from "react-router";

import createBrowserHistory from 'history/createBrowserHistory';

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

let History = createBrowserHistory();
class App extends Component {

  constructor() {
    super();
    this.state = {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          command: () => { History.push('/'); }
        }, {
          label: 'Usuarios',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: "Usuarios Vtex",
              icon: "pi pi-fw pi-users",
              command: () => { History.push('/users'); },
            }
          ]
        }, {
          label: 'Información',
          icon: 'pi pi-plus',
          command: () => { History.push('/about'); }
        }
      ]
    };
  }

  render() {
    return (
      <Router history={History}>
        <div>
          <Menubar model={this.state.items} />
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={Users} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}
export default App;
