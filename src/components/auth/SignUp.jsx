import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { validateEmail } from '../../utils';

class SignUp extends Component {
  renderField(field) {
    // field.meta.pristine,
    // field.meta.touched,
    // field.meta.invalid - input states
    const { meta: { touched, error }, type } = field;
    const className = `form-group${touched && error ? ' has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          {...field.input}
          type={type}
        />
        <div className="text-help">
          {
            // If user focused and an error is present
            // on blur show error
            touched && error
              ? error
              : ''
          }
        </div>
      </div>
    );
  }

  handleFormSubmit(fromProps) {
    //console.log(email, password, passwordConfirm);
    this.props.signupUser(fromProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    // Redux form props
    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          type="text"
          component={this.renderField}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Comfirm password"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button
          type="submit"
          className="btn btn-primary"
        >
          Sign Up
        </button>
      </form>
    );
  }
}

// Values user input form fields
function validate(values) {
  const errors = {};

  // Validate errors from values

  if (! validateEmail(values.email)) {
    errors.email = 'Please enter a valid email!';
  }

  if (! values.password) {
    errors.password = 'Please enter password!';
  }

  if (! values.passwordConfirm) {
    errors.passwordConfirm = 'Please enter password comfirmation  !';
  }

  if (values.password !== values.passwordConfirm) {
    errors.password = 'Passwords must match!';
  }

  // if errors is empty, form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'SignUpForm',
  validate
})
(connect(mapStateToProps, actions)(SignUp));