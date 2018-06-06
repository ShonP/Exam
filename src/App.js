import React, { Component } from 'react';
// import logo from './logo.svg';
import { Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import Category from './containers/Category/Category';
import Location from './containers/Location/Location';
import BottomNav from './components/BottomNav/BottomNav';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/category" component={Category} />
          <Route path="/location" component={Location} />
          <Redirect from="/" to="category" />
        </Switch>
        <BottomNav />
      </div>
    );
  }
}

export default App;
