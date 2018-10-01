import React, { Component } from 'react';
import { Card, Button, Icon, Image } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getRestoData, setRestoData, resetRestoData } from "../actions";
import { MdStore, MdRestaurantMenu, MdLocationOn } from 'react-icons/md';






class RestoData extends Component {

  constructor(props){
    super(props);
    this.props.getRestoData();
    this.state = {
      setRestoData: this.props.setRestoData,
      contentType: 1
    };
    this.swipeLeft = this.swipeLeft.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.goToGoogleMaps = this.goToGoogleMaps.bind(this);
  }

  goToGoogleMaps(link){
    window.location.href = link;
  }

  swipeLeft(){
    // const { setRestoData } = this.state;
    // setRestoData(null);
    this.props.resetRestoData();
  }

  renderContent(){
    let that = this;
    let type = this.state.contentType;
    let menuImage = that.props.restoData.MenuImages;
    // let location = that.props.restoData.Location.Lat + ", " + that.props.restoData.Location.Long;
    if(type === 3){
      let currentLocation = that.props.currentLocation;
      let destination = that.props.restoData.Location;
      if(!currentLocation || !destination){
        return <div>
          Location Not Provided.
        </div>;
      }
      let middlePoint = {Lat: (destination.Lat + currentLocation.Lat)/2, Long: (destination.Long + currentLocation.Long)/2};
      let directionParams = destination.Lat+",+"+destination.Long+"/"+currentLocation.Lat+",+"+currentLocation.Long+"/@"+middlePoint.Lat+",+"+middlePoint.Long;
      let link = "https://www.google.ca/maps/dir/"+directionParams;
      return (
        <div>

            <Button primary onClick={()=>this.goToGoogleMaps(link)}>
              Directions
            </Button>
        </div>
      )
    }else if(type === 2){
      return (
        <Image src={menuImage}/>
      )
    }else{
      return (
        <Image src={this.props.restoData.StoreFront}/>
      )
    }
  }

  setContentType(contentType){
    this.setState({
      contentType
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
              <Button circular className='circleButton restoDataMenuTab' onClick={()=>this.setContentType(1)}>
                <MdStore color="#21ba45" />
              </Button>
              <Button circular className='circleButton restoDataMenuTab' onClick={()=>this.setContentType(2)}>
                <MdRestaurantMenu color='#EC0101'/>
              </Button>
              <Button circular className='circleButton restoDataMenuTab' onClick={()=>this.setContentType(3)}>
                <MdLocationOn color='#2185d0'/>
              </Button>
            </Button.Group>

            </Card.Header>
            <Card.Content className="restoDataContent">
              {this.renderContent()}
              {/* {this.props.restoData.desc} */}
            </Card.Content>
            <Card.Content extra className="restoDataContent">
              <Button onClick={this.swipeLeft}  className="circleButton">
                <Icon name='arrow circle left' color='red'/>
              </Button>
            </Card.Content>
          </Card>
        // </div>
      );

  }
}

const mapStateToProps = ({ restoData, auth }) => {
  return {
    restoData,
    auth
  };
};

export default connect(mapStateToProps, { getRestoData, setRestoData, resetRestoData })(RestoData);
