import React from 'react';
import { withRouter } from 'react-router';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
class bottomNav extends React.Component {
  state = {
    value: ''
  };
  componentDidUpdate() {
    this.checkUrl();
  }
  componentDidMount() {
    this.checkUrl();
  }
  checkUrl() {
    this.props.approutes.forEach(element => {
      if (this.props.location.pathname === element.path) {
        if (this.props.location.pathname !== this.state.value) {
          this.setState({ value: element.path });
        }
      }
    });
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.props.approutes.forEach(element => {
      if (element.path === value) {
        this.props.history.push(element.path);
      }
    });
  };
  render() {
    const { value } = this.state;
    const tabs = this.props.approutes.map((x, i) => {
      return (
        <BottomNavigationAction
          key={i}
          label={x.label}
          value={x.path}
          icon={<Icon>{x.icon}</Icon>}
        />
      );
    });
    return (
      <BottomNavigation
        value={value}
        style={{
          flexBasis:'10%',
          marginBottom: 16,
          width: '100%',
          justifyContent: 'space-around'
        }}
        onChange={this.handleChange}
      >
        {tabs}
      </BottomNavigation>
    );
  }
}
export default withRouter(bottomNav);
