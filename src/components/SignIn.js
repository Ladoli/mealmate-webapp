import React, { Component } from "react";
import { Card, Button, Icon } from 'semantic-ui-react';

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
      <div className="row social-signin-container flexCenterAll" style={{minWidth: "100vw", minHeight: "100vh"}}>
        <div style={{textAlign: "center"}}>
          <h3>Sign In to start</h3>
          <a onClick={this.props.signIn}>
            <Button primary >
              <Icon name='google' />
              Sign In With Google
            </Button>
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
