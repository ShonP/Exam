import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Delete, Edit } from '@material-ui/icons';
import ListSubheader from '@material-ui/core/ListSubheader';
const Location = props => {
  const { location, deleteItem, selectItem } = props;
  return (
    <ListItem>
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            deleteItem(location);
          }}
        >
          <Delete />
        </IconButton>
        <IconButton
          onClick={() => {
            selectItem(location);
          }}
        >
          <Edit />
        </IconButton>
      </ListItemSecondaryAction>
      <ListItemText inset primary={location.Name} />
    </ListItem>
  );
};
class LocationList extends React.Component {
  render() {
    const { deleteItem, selectItem, categories, data, grouped } = this.props;
    const Locations = data.map(x => {
      return (
        <Location
          key={x._id}
          deleteItem={deleteItem}
          selectItem={selectItem}
          location={x}
        />
      );
    });
    const Grouped = categories.map(x => {
      return (
        <List
          key={x._id}
          subheader={<ListSubheader>{x.Category}</ListSubheader>}
        >
          {data.filter(y => y.Category === x._id).map(y => {
            return (
              <Location
                key={y._id}
                deleteItem={deleteItem}
                selectItem={selectItem}
                location={y}
              />
            );
          })}
        </List>
      );
    });
    const unGrouped = <List component="nav">{Locations}</List>;

    return grouped ? Grouped : unGrouped;
  }
}
export default LocationList;
