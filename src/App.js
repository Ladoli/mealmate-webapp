import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import requireAuth from "./components/auth/requireAuth";
import { connect } from "react-redux";
import { fetchUser, getRestoList } from "./actions";
import history from './components/History';
import RestoList from './components/RestoList';
import SignIn from './components/SignIn';
// import VerticalMenu from './components/VerticalMenu';


class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
    this.props.getRestoList();
  }

  render() {
    return (
      <div className="restoBackground" id="outer-container">
        {/* <VerticalMenu/> */}
        <Router history={history}>
          <div id="page-wrap">
            {/* <Route path={process.env.PUBLIC_URL+"/"} component={VerticalMenu} /> */}
            <Route exact path={process.env.PUBLIC_URL+"/"} component={SignIn} />
            <Route path={process.env.PUBLIC_URL+"/app"} component={requireAuth(RestoList)} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}


export default connect(mapStateToProps, { fetchUser, getRestoList })(App);
