import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignOut extends Component {
  // As soon as the component is rendered
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return(
      <div>
        <p>See you next time! Hope you had a great experience.</p>
      </div>
    );
  }
}

export default connect(null, actions)(SignOut);