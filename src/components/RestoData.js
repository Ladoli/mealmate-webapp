import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import { connect } from "react-redux";
import * as actions from "../actions";
import { MdStore, MdRestaurantMenu, MdLocationOn } from 'react-icons/md';
import swal from "sweetalert2";





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
    this.swipeLeft = this.swipeLeft.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.goToGoogleMaps = this.goToGoogleMaps.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
  }

  addToFavourites(){
    this.props.addToUserFavourite(this.props.auth.uid, this.props.restoData.id, this.props.restoData.Name);
    swal({
      title: "Restaurant has been saved!",
      text: "You can now access this restaurant anytime from the menu on the left!"
    });
  }

  goToGoogleMaps(link){
    window.open(link, '_blank');
  }addToBlockList

  swipeLeft(){
    this.props.resetRestoData();
  }

  renderContent(){
    let that = this;
    let type = this.state.contentType;
    let menuImage = that.props.restoData.MenuImages;
    if(type === 3){
      let currentLocation = that.props.currentLocation;
      let destination = that.props.restoData.Location;
      if(!currentLocation || !destination){
        return <div>
          Location Not Provided.
        </div>;
      }
      let middlePoint = {Lat: (destination.Lat + currentLocation.Lat)/2, Long: (destination.Long + currentLocation.Long)/2};
      let directionParams = currentLocation.Lat+",+"+currentLocation.Long+"/"+destination.Lat+",+"+destination.Long+"/@"+middlePoint.Lat+",+"+middlePoint.Long;
      let link = "https://www.google.ca/maps/dir/"+directionParams;
      let favourites = that.props.userData ? that.props.userData.favourites : null;
      let restoID = that.props.restoData.id;
      return (
        <div style={{width: "270px", height: "270px", textAlign: "center"}} className="flexCenterAll">
            <Card>
              <Card.Content>
                <Button primary onClick={()=>this.goToGoogleMaps(link)}>
                  <MdLocationOn /> DIRECTIONS
                </Button>
              </Card.Content>
             {
              (!favourites || (favourites && !favourites[restoID])) && (
                  <Card.Content>
                    <Button color='yellow' onClick={()=>this.addToFavourites()}>
                      <Icon name='star' /> FAVOURITE
                    </Button>
                  </Card.Content>
                )
              }
            </Card>
        </div>
      )
    }else if(type === 2){
      return (
        <Image className="imagePics" src={menuImage}/>
      )
    }else{
      return (
        <Image className="imagePics" src={this.props.restoData.StoreFront}/>
      )
    }
  }

  setContentType(contentType){
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
    if(this.props.restoData === "initial"){
      return (
        <div>
        </div>
      );
    }
    else if(!this.props.restoData){
      return (
        <Card className="restoDataInfo-NoInfo">
        </Card>
      );
    }
      return (
        <Card fluid className="flexCenterAll restoDisplay restoDataInfo">
          <Card.Header className="restoDataContent">
              <div style={{textAlign: "center", fontSize: "4vh", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white"}}>
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
            {this.renderContent()}
          </Card.Content>
          <Card.Content extra className="restoDataContent">
            <Button onClick={this.swipeLeft}  className="circleButton">
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

export default connect(mapStateToProps, actions)(RestoData);
