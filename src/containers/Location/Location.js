import React from 'react';
import LocationForm from './LocationForm/LocationForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as actionCreators from '../../shared/reducers/location/location.actions';
import { connect } from 'react-redux';
import LocationList from './LocationList/LocationList';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GoogleMap from '../../components/Map/GoogleMap';
import './Location.css';
class Location extends React.Component {
  state = {
    open: false,
    grouped: false,
    selectedItem: null,
    selectedCategory: '',
    showMap: false,
    view: null
  };
  createItem = Location => {
    this.props.createLocation({
      Name: Location.Name,
      Address: Location.Address,
      Coordinates: { Lat: Location.Lat, Lon: Location.Lon },
      Category: Location.Category
    });
    this.setState({ open: false });
  };
  deleteItem = Location => {
    this.props.removeLocation(Location);
  };
  updateItem = Location => {
    this.props.updateLocation({
      _id: Location._id,
      Name: Location.Name,
      Address: Location.Address,
      Coordinates: { Lat: Location.Lat, Lon: Location.Lon },
      Category: Location.Category
    });
    this.setState({ selectedItem: null, open: false });
  };
  selectItem = Location => {
    this.setState({ selectedItem: Location, open: true });
  };
  onSelected = Event => {
    this.setState({ selectedCategory: Event.target.value });
  };
  showMap = Location => {
    this.setState({ selectedItem: Location, showMap: true });
  };
  getCategory = CategoryId => {
    return this.props.category.find(x => x._id == CategoryId);
  };
  render() {
    const renderOptions = this.props.category.map(x => {
      return (
        <MenuItem key={x._id} value={x._id}>
          {x.Category}
        </MenuItem>
      );
    });
    const viewMap = () => {
      if (this.state.view === null) {
        return (
          <div>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ view: true });
              }}
            >
              Map
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ view: false });
              }}
            >
              Properties
            </Button>
          </div>
        );
      }
      if (this.state.view === true) {
        return (
          <GoogleMap
            lat={
              this.state.selectedItem
                ? this.state.selectedItem.Coordinates.Lat
                : null
            }
            lon={
              this.state.selectedItem
                ? this.state.selectedItem.Coordinates.Lat
                : null
            }
          />
        );
      }
      if (this.state.view === false) {
        return (
          <div>
            Name: {this.state.selectedItem.Name}
            <br />
            Address: {this.state.selectedItem.Address}
            <br />
            Latitude: {this.state.selectedItem.Coordinates.Lat}
            <br />
            Longtitude: {this.state.selectedItem.Coordinates.Lon}
            <br />
            Category:
            {this.getCategory(this.state.selectedItem.Category).Category}
          </div>
        );
      }
    };
    return (
      <div className="LocationContainer">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className="flex">
              Location
            </Typography>
            <Select
              style={{ color: 'white' }}
              onChange={this.onSelected}
              value={this.state.selectedCategory}
            >
              <MenuItem value="">NoFilter</MenuItem>
              {renderOptions}
            </Select>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ grouped: !this.state.grouped });
              }}
            >
              {this.state.grouped ? 'UnGroup' : 'Group'}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                this.props.sortLocation();
              }}
            >
              Sort
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                this.setState({ open: true });
              }}
            >
              Create
            </Button>
          </Toolbar>
        </AppBar>
        <div className="LocationContent">
          <LocationList
            grouped={this.state.grouped}
            categories={this.props.category}
            data={this.props.location}
            deleteItem={this.deleteItem}
            selectItem={this.selectItem}
            openMap={this.showMap}
            filter={this.state.selectedCategory}
          />
        </div>
        <Dialog
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false, selectedItem: null });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.selectedItem ? 'Update' : 'Create'}
          </DialogTitle>
          <DialogContent>
            <LocationForm
              obj={this.state.selectedItem ? this.state.selectedItem : null}
              onSubmit={
                this.state.selectedItem ? this.updateItem : this.createItem
              }
            />
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.showMap}
          onClose={() => {
            this.setState({ showMap: false, selectedItem: null, view: null });
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.selectedItem ? this.state.selectedItem.Name : ''}
          </DialogTitle>

          <DialogContent style={{ height: '400px', width: '400px' }}>
            {viewMap()}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    category: state.categoryReducer.Categories,
    location: state.locationReducer.Locations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLocation: item => dispatch(actionCreators.add(item)),
    removeLocation: item => dispatch(actionCreators.remove(item)),
    updateLocation: item => dispatch(actionCreators.update(item)),
    sortLocation: item => dispatch(actionCreators.sort())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location);
