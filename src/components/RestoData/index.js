import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import { connect } from "react-redux";
import { fetchUser, getUserData, resetRestoData, setRestoData } from "../../actions";
import { MdStore, MdRestaurantMenu, MdLocationOn } from 'react-icons/md';

import Tabs from './Tabs';





class RestoData extends Component {

  constructor(props){
    super(props);
    this.state = {
      setRestoData: this.props.setRestoData,
      contentType: 1,
      buttonStore: "activeIcon",
      buttonMenu: "",
      buttonLocation: ""
    };
    this.props.getUserData(this.props.auth.uid);
  }

  backToRestoList = ()=> {
    this.props.resetRestoData();
  }

  renderContent = ()=> {
    let that = this;
    let type = this.state.contentType;
    let { StoreFront, MenuImages } = that.props.restoData;
    if(type === 3){
       return (
        <Tabs 
            type = {that.state.contentType}
            currentLocation = {that.props.currentLocation} 
            destination = {that.props.restoData.Location}
            favourites = {that.props.userData ? that.props.userData.favourites : null}
            restoData = {that.props.restoData}
            />
       )
    }else if(type === 2){
      return (
        <Image className="imagePics" src={MenuImages}/>
      )
    }else{
      return (
        <Image className="imagePics" src={StoreFront}/>
      )
    }
  }

  setContentType = (contentType) =>{
    let buttonStore = "";
    let buttonMenu = "";
    let buttonLocation = "";
    if(contentType === 3){
      buttonLocation = "activeIcon";
    }else if(contentType === 2){
      buttonMenu = "activeIcon";
    }else{
      buttonStore = "activeIcon";
    }
    this.setState({
      contentType,
      buttonStore,
      buttonMenu,
      buttonLocation
    });
  }


  render() {
    if(!this.props.restoData){
      return (
        <Card className="restoDataInfo-NoInfo">
        </Card>
      );
    }
      return (
        <Card className="flexCenterAll restoDisplay restoDataInfo">
          <Card.Header className="restoDataContent" style={{textAlign: "center"}}>
              <div style={{display: "inline-block", maxWidth: "270px", textAlign: "center", fontSize: "4vh", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white"}}>
                {this.props.restoData.Name}
              </div>
              <Button.Group size='large' className="restoDataContent">
              <Button circular className={'circleButton restoDataMenuTab ' + this.state.buttonStore} onClick={()=>this.setContentType(1)}>
                <MdStore color="#21ba45" />
              </Button>
              <Button circular className={'circleButton restoDataMenuTab ' + this.state.buttonMenu} onClick={()=>this.setContentType(2)}>
                <MdRestaurantMenu color='#EC0101'/>
              </Button>
              <Button circular className={'circleButton restoDataMenuTab ' + this.state.buttonLocation} onClick={()=>this.setContentType(3)}>
                <MdLocationOn color='#2185d0'/>
              </Button>
            </Button.Group>
          </Card.Header>
          <Card.Content className="restoDataContent">
            { 
                this.renderContent()
            }
          </Card.Content>
          <Card.Content extra className="restoDataContent" style={{paddingBottom:"20px", paddingTop: "5px"}}>
            <Button onClick={this.backToRestoList}  className="circleButton">
              <Icon name='arrow circle left' color='red'/>
            </Button>
          </Card.Content>
        </Card>
      );
  }
}

const mapStateToProps = ({ restoData, auth, userData }) => {
  return {
    restoData,
    auth,
    userData
  };
};

export default connect(mapStateToProps, { fetchUser, getUserData, resetRestoData, setRestoData })(RestoData);
