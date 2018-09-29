import React, { Component } from 'react';
import { Input, Label } from 'semantic-ui-react';
import Menu from 'react-burger-menu/lib/menus/push';


export default class VerticalMenu extends Component {
  showSettings (event) {
      event.preventDefault();

    }


  render() {

    return (
      <Menu width={ 200 } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    )
  }
}
