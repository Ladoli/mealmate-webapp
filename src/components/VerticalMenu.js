import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUser, resetUserBlockList, getUserData, getRestoData } from "../actions";
import { Button, List, Header, Icon } from 'semantic-ui-react';
import { map } from 'lodash';
import Menu from 'react-burger-menu/lib/menus/push';


class VerticalMenu extends Component {

  constructor(props){
    super(props)
    this.props.getUserData(this.props.authenticated.uid);
    this.getSelectedRestoData = this.getSelectedRestoData.bind(this);
    this.resetBlockHander = this.resetBlockHander.bind(this);
  }

  resetBlockHander(){
    this.props.resetUserBlockList(this.props.authenticated.uid);
  }

  getSelectedRestoData(id){
    this.props.getRestoData(id)
  }

  render() {
    let favourites = this.props.userData ? this.props.userData.favourites : null;
    return (
      <Menu width={ 200 } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Button color='green' onClick={this.resetBlockHander}>
          Reset Blocklist
        </Button>
            { favourites && (
                <List>
                  <Header textAlign='center' attached="top" as='h3'>
                    <Icon name='star' color='yellow'/>
                  </Header>
                  <Button.Group fluid vertical>
                    {
                    map(favourites, (value,key) =>{
                      return (
                          <Button color='blue' fluid key={key} onClick={()=>this.getSelectedRestoData(key)}>{value}</Button>
                      )
                    })}
                    </Button.Group>
                </List>
              )
            }
      </Menu>
    )
  }
}

const mapStateToProps = ({ userData }) => {
  return {
    userData
  };
};

export default connect(mapStateToProps, { fetchUser, resetUserBlockList, getUserData, getRestoData} )(VerticalMenu);
