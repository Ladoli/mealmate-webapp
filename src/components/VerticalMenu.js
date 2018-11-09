import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchUser, resetUserBlockList, getUserData, getRestoData, removeUserFavourite, removeUserBlockList, signOut } from "../actions";
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
    this.state = { showBlocklist: false }
    this.getSelectedRestoData = this.getSelectedRestoData.bind(this);
    this.resetBlockHander = this.resetBlockHander.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.toggleBlocklist = this.toggleBlocklist.bind(this);
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

  removeBlock = (id) => {
    this.props.removeUserBlockList(this.props.auth.uid, id);
  }

  toggleBlocklist(){
    let newState = this.state.showBlocklist ? false : true;
    this.setState({showBlocklist: newState});
  }

  render() {
    if(!this.props.auth){
      return <div></div>
    }
    let { favourites, blocklist } = this.props.userData ? this.props.userData : { favourites: null, blocklist: null };
    let blockListText = this.state.showBlocklist ? "Hide" : "Show";
    return (
      <Menu width={ 200 } pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
        <Button primary fluid onClick={this.props.signOut}>Signout</Button>  
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
                          className="userSpecOption flexCenterAll"
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
                  })
                }
                </Button.Group>
            </List>
          )
        }
        { blocklist && (
          <Button fluid 
            color='red' 
            onClick={this.toggleBlocklist}>
            {blockListText}<br/> Blocklist
          </Button>
          )
        }
        {
          this.state.showBlocklist && (
            <Button.Group fluid vertical>
              {     
                map(blocklist, (value,key) =>{
                  return (
                    <Segment className="noPadding flexCenterAll burgerMenuFader" style={{margin: "0px"}} key={key}>
                      <Button
                        color='orange'  
                        className="userSpecOption flexCenterAll"
                        onClick={()=>this.getSelectedRestoData(key)}>
                        {value.toString()}
                      </Button>
                      <Button compact
                        color='red' 
                        icon='trash alternate'  
                        className="deleteMenuButton"
                        onClick={()=>this.removeBlock(key)}/>
                    </Segment>
                  )
                })
              }
            </Button.Group>
          )
        }
        <Button fluid 
            color='green'
            style={{marginTop: '1em'}} 
            onClick={this.resetBlockHander}>
            Reset Blocklist
          </Button>
      </Menu>
    )
  }
}

const mapStateToProps = ({ userData }) => {
  return {
    userData
  };
};

export default connect(mapStateToProps, { fetchUser, resetUserBlockList, getUserData, getRestoData, removeUserFavourite, removeUserBlockList, signOut } )(VerticalMenu);
