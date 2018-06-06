import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as categoryActions from './shared/reducers/category/category.actions';
import * as locationActions from './shared/reducers/location/location.actions';
import { Route, Switch, Redirect } from 'react-router-dom';
import Category from './containers/Category/Category';
import Location from './containers/Location/Location';
import BottomNav from './components/BottomNav/BottomNav';
import './App.css';
class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchLocations();
  }
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
const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(categoryActions.fetch()),
    fetchLocations: () => dispatch(locationActions.fetch())
  };
};
export default connect(
  null,
  mapDispatchToProps
)(App);
