import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUser, resetUserBlockList, getUserData, getRestoData, removeUserFavourite } from "../actions";
import { Button, List, Header, Icon, Segment } from 'semantic-ui-react';
import { map } from 'lodash';
import Menu from 'react-burger-menu/lib/menus/push';
import './VerticalMenu.css';


class VerticalMenu extends Component {

  constructor(props){
    super(props)
    if(this.props.auth){
      this.props.getUserData(this.props.auth.uid);
    }
    this.getSelectedRestoData = this.getSelectedRestoData.bind(this);
    this.resetBlockHander = this.resetBlockHander.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
  }

  componentWillMount(){
    if(this.props.auth){
      this.props.getUserData(this.props.auth.uid);
    }
  }

  resetBlockHander(){
    this.props.resetUserBlockList(this.props.auth.uid);
  }

  getSelectedRestoData(id){
    this.props.getRestoData(id)
  }

  removeFavourite(id){
    this.props.removeUserFavourite(this.props.auth.uid, id);
  }

  render() {
    let favourites = this.props.userData ? this.props.userData.favourites : null;
    if(!this.props.auth){
      return <div></div>
    }
    return (
      <Menu width={ 200 } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>

      { this.props.auth && (
        <Button color='green' onClick={this.resetBlockHander}>
          Reset Blocklist
        </Button>
        )
      }
            { favourites && (
                <List>
                  <Header textAlign='center' attached="top" as='h3'>
                    <Icon name='star' color='yellow'/>
                  </Header>
                  <Button.Group fluid vertical>
                    {
                    map(favourites, (value,key) =>{
                      return (
                        <Segment className="noPadding flexCenterAll" style={{margin: "0px"}} key={key}>
                          <Button primary 
                            className="faveOption flexCenterAll ui button"
                            onClick={()=>this.getSelectedRestoData(key)}>
                            {value}
                          </Button>
                          <Button compact
                            color='red' 
                            icon='trash alternate'  
                            className="deleteMenuButton"
                            onClick={()=>this.removeFavourite(key)}/>
                        </Segment>
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

export default connect(mapStateToProps, { fetchUser, resetUserBlockList, getUserData, getRestoData, removeUserFavourite} )(VerticalMenu);
