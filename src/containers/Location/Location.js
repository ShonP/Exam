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
import './Location.css';
// import { compose, withProps } from 'recompose';
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from 'react-google-maps';
// const key = 'AIzaSyCUpSURd8THx7maUBM-WgzUD5YCDzlahSI';
// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => (
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     onRightClick={logme}
//   >
//     <Marker
//       position={{ lat: -34.397, lng: 150.644 }}
//       onClick={props.onMarkerClick}
//     />
//   </GoogleMap>
// ));
// const logme = () => {
//   console.log('clicked');
// };
// const Location = props => (
//   <div style={{ width: '100%' }}>
//     <MyMapComponent key={key} />
//   </div>
// );
class Location extends React.Component {
  state = {
    open: false,
    grouped: false,
    selectedItem: null
  };
  createItem = Location => {
    this.props.createLocation({
      Name: Location.Name,
      Address: Location.Address,
      Coordinates: { Lat: Location.Lat, Lon: Location.Lon },
      Category: Location.Category
    });
    this.setState({ open: false });
    //   this.props.createCategory(newCategory);
    //   this.setState({ open: false });
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
  selectItem = Category => {
    this.setState({ selectedItem: Category, open: true });
  };
  render() {
    return (
      <div className="LocationContainer">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className="flex">
              Location
            </Typography>
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
        </Dialog>;
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
