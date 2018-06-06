import React from 'react';
import { withRouter } from 'react-router';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MapIcon from '@material-ui/icons/Map';
import ContactIcon from '@material-ui/icons/ContentCopy';
import './BottomNav.css';
class bottomNav extends React.Component {
  state = {
    value: 0
  };
  componentDidUpdate() {
    this.checkUrl();
  }
  componentDidMount() {
    this.checkUrl();
  }
  checkUrl() {
    switch (this.props.location.pathname) {
      case '/location': {
        if (this.state.value !== 0) return this.setState({ value: 0 });
        return;
      }
      case '/category': {
        if (this.state.value !== 1) return this.setState({ value: 1 });
        return;
      }
    }
  }
  handleChange = (event, value) => {
    this.setState({ value });
    switch (value) {
      case 0:
        return this.props.history.push('/location');
      case 1:
        return this.props.history.push('/category');
    }
  };
  render() {
    return (
      <Paper style={{ width: '100%' }}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<MapIcon />} />
          <Tab icon={<ContactIcon />} />
        </Tabs>
      </Paper>
    );
  }
}
export default withRouter(bottomNav);
