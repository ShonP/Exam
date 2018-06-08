import React from 'react';
import TextField from '@material-ui/core/TextField';

/**
 * to be wrapped with redux-form Field component
 */
const textInput = props => {
  const {
    input,
    meta: { error },
    ...inputProps
  } = props;
  return (
    <TextField
      {...inputProps}
      onChange={input.onChange}
      label={input.label}
      value={input.value}
      error={error ? true : false}
    />
  );
};
export default textInput;
