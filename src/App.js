import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import requireAuth from "./components/auth/requireAuth";
import { connect } from "react-redux";
import { fetchUser } from "./actions";
import history from './components/History';
// import * as routes from './config/routes'
// import RestoData from './components/RestoData';
import RestoList from './components/RestoList';
import SignIn from './components/SignIn';
// import VerticalMenu from './components/VerticalMenu';
// import logo from './logo.svg';

class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="restoBackground" id="outer-container">
        {/* <VerticalMenu/> */}
        <Router history={history}>
          <div id="page-wrap">
            {/* <Route path={process.env.PUBLIC_URL+"/"} component={VerticalMenu} /> */}
            {/* <Navigation /> */}
            {/* <Route exact path={process.env.PUBLIC_URL+routes.SIGN_UP} component={SignUp}/>
            <Route exact path={process.env.PUBLIC_URL+routes.SIGN_IN} component={SignIn}/> */}
            <Route exact path={process.env.PUBLIC_URL+"/"} component={SignIn} />
            {/* <Route path={process.env.PUBLIC_URL+"/app"} component={requireAuth(RestoData)} /> */}
            <Route path={process.env.PUBLIC_URL+"/app"} component={requireAuth(RestoList)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, { fetchUser })(App);
