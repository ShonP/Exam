import React, { Component } from 'react';
import CategoryForm from './CategoryForm/CategoryForm';
import CategoryList from './CategoryList/CategoryList';
import * as actionCreators from '../../shared/reducers/category/category.actions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
class Category extends Component {
  state = {
    open: false,
    selectedItem: null
  };
  createItem = newCategory => {
    this.props.createCategory(newCategory);
    this.setState({ open: false });
  };
  deleteItem = Category => {
    this.props.removeCategory(Category);
  };
  updateItem = Category => {
    this.props.updateCategory(Category);
    this.setState({ selectedItem: null, open: false });
  };
  selectItem = Category => {
    this.setState({ selectedItem: Category, open: true });
  };
  render() {
    return (
      <div className="Container">
        <AppBar position="static">
          <Toolbar className="appBar">
            <Typography variant="title" color="inherit" className="flex">
              Category
            </Typography>
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
        <div className="Content">
          <CategoryList
            data={this.props.category}
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
            <CategoryForm
              obj={this.state.selectedItem ? this.state.selectedItem : null}
              onSubmit={
                this.state.selectedItem ? this.updateItem : this.createItem
              }
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.categoryReducer.Categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createCategory: item => dispatch(actionCreators.add(item)),
    removeCategory: item => dispatch(actionCreators.remove(item)),
    updateCategory: item => dispatch(actionCreators.update(item))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
