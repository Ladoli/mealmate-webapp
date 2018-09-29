import React, { Component } from "react";
import { connect } from "react-redux";
import history from '../History';


export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (this.props.authenticated === null) {
        history.push("/");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        history.push("/");
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}
