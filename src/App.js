import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from "./components/auth/requireAuth";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import history from './components/History';

import * as routes from './config/routes'
import RestoData from './components/RestoData';
import RestoList from './components/RestoList';
import SignIn from './components/SignIn';
import logo from './logo.svg';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
    <Router history={history}>
      <div>
        {/* <Navigation /> */}
        {/* <Route exact path={process.env.PUBLIC_URL+routes.SIGN_UP} component={SignUp}/>
        <Route exact path={process.env.PUBLIC_URL+routes.SIGN_IN} component={SignIn}/> */}
        <Route exact path={process.env.PUBLIC_URL+"/"} component={SignIn} />
        <Route path={process.env.PUBLIC_URL+"/app"} component={requireAuth(RestoData)} />
        <Route path={process.env.PUBLIC_URL+"/app"} component={requireAuth(RestoList)} />
      </div>
    </Router>
    );
  }
}

export default connect(null, { fetchUser })(App);
