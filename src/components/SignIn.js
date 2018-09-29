import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../actions";
import history from './History';


class SignIn extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.auth) {
      history.push('/app');
    }
  }

  render() {
    return (
      <div className="row social-signin-container">
        <div className="col s10 offset-s1 center-align">
          <h4 id="sign-in-header">Sign In to start</h4>
          <a className="social-signin" onClick={this.props.signIn}>
            <i className="fa fa-google social-signin-icon" />
            Sign In With Google
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { signIn })(SignIn);
