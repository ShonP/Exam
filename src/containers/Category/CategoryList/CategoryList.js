import React from 'react';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Delete, Edit } from '@material-ui/icons';

const CategoryList = props => {
  const { deleteItem, selectItem, data } = props;
  const items = data.map((x, i) => {
    return (
      <ListItem key={x._id}>
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => {
              deleteItem(x);
            }}
          >
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => {
              selectItem(x);
            }}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
        <ListItemText inset primary={x.Category} />
      </ListItem>
    );
  });
  return <List component="nav">{items}</List>;
};

export default CategoryList;
