import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import './index.css';
import App from './App';

import RestoList from './components/RestoList';




ReactDOM.render(
    // <Provider >
      <Router>
        <Route path={process.env.PUBLIC_URL+"/"} component={RestoList}/>
      </Router>
    // </Provider>
    , document.getElementById('root')
  );
