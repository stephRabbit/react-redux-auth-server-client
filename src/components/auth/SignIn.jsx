import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component {
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
      </div>
    );
  }

  handleFormSubmit({ email, password }) {
    //console.log(email, password);
    this.props.signinUser({ email, password });
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
    //console.log(this.props);
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
        {this.renderAlert()}
        <button
          type="submit"
          className="btn btn-primary"
        >
          Sign In
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'SignInForm'
})
(connect(mapStateToProps, actions)(SignIn));

