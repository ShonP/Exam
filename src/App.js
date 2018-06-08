import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as categoryActions from './shared/reducers/category/category.actions';
import * as locationActions from './shared/reducers/location/location.actions';
import { Route, Switch, Redirect } from 'react-router-dom';
import { appRoutes } from './shared/app.routes';
import BottomNav from './components/BottomNav/BottomNav';
import './App.css';
class App extends Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchLocations();
  }
  render() {
    const routes = appRoutes.map((x, i) => {
      return <Route path={x.path} key={i} component={x.component} />;
    });
    return (
      <div className="App">
        <Switch style={{'flexBasis':'90%'}}>
          {routes}
          <Redirect from="/" to="category" />
        </Switch>
        <BottomNav approutes={appRoutes} />
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
export default withRouter(connect(this.props, mapDispatchToProps)(App));
