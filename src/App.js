import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import requireAuth from "./components/auth/requireAuth";
import { connect } from "react-redux";
import { fetchUser, getRestoList } from "./actions";
import history from './components/History';
import RestoList from './components/RestoList';
import SignIn from './components/SignIn';
import VerticalMenu from './components/VerticalMenu';


class App extends Component {
  componentWillMount() {
    this.props.fetchUser();
    this.props.getRestoList();
  }



  render() {
    let VerticalMenuWithProps = (props) => {
      return (
        <VerticalMenu
          auth={this.props.auth}
          {...props}
        />
      );
    }
    return (
      <div className="restoBackground" id="outer-container">
        <Router history={history}>
          <div>
            <Route path={process.env.PUBLIC_URL+"/"} component={VerticalMenuWithProps} />
            <div id="page-wrap">
              <Route exact path={process.env.PUBLIC_URL+"/"} component={SignIn} />
              <Route path={process.env.PUBLIC_URL+"/app"} component={requireAuth(RestoList)} />
            </div>
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
