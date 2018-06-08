import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import TextInput from '../../../components/Form/TextInput/TextInput';
import { required } from '../../../components/Form/FieldLevelValidationForm';
import './CategoryForm.css';
class CategoryForm extends React.Component {
  componentDidMount() {
    if (this.props.obj) {
      this.handleInitialize();
    }
  }
  handleInitialize() {
    const initData = {
      Category: this.props.obj.Category,
      _id: this.props.obj._id
    };
    this.props.initialize(initData);
  }
  render() {
    const { handleSubmit, pristine, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit} className="FormContainer">
        <div className="FormRow">
          <label>Category: </label>
          <Field
            component={TextInput}
            name="_id"
            type="hidden"
            style={{ height: 0 }}
          />
          <Field
            name="Category"
            validate={required}
            component={TextInput}
            type="text"
          />
        </div>
        <div className="FormRow">
          <Button type="submit" disabled={pristine || invalid}>
            Save
          </Button>
        </div>
      </form>
    );
  }
}

const categoryForm = reduxForm({
  // a unique name for the form
  form: 'category'
})(CategoryForm);
export default categoryForm;
