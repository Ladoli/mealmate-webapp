import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { isEmpty  } from 'lodash';



class RestoContainer extends Component {

  calculateDistance(location1, location2){
    const R = 6371e3; // value for meters
    if(location1 && location2){
      let φ1 = radConvert(location1.Lat);
      let φ2 = radConvert(location2.Lat);
      let Δφ = radConvert(location2.Lat-location1.Lat);
      let Δλ = radConvert(location2.Long-location1.Long);

      let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      let distance = R * c;

      return Math.round(distance/1000);
    }else{
      return "Undefined"
    }


    function radConvert(num) {
        return num * Math.PI / 180;
    }
  }



  renderImages(){
    let images = this.props.images;
    if(!isEmpty(images)){
      return(
        <Card.Content fluid="true" centered="true" className="noSidePadding">
          <div style={{textAlign: "center"}}>
            <Image centered={true} rounded={true} className="imagePics" src={images[0]} />
          </div>
        </Card.Content>
      )
      // let imagesMap = map(images, (value,key)=>{
      //
      // });
      // return (
      //   <div className="flexCenterAll">
      //     {imagesMap}
      //   </div>
      // )
    }else{
      return <div></div>
    }
  }

  render() {
    this.renderImages = this.renderImages.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);

    let distance = this.calculateDistance(this.props.restoInfo.Location, this.props.currentLocation);

      return (
        <div style={{position: this.props.position}} className={this.props.cardClass}>
          <Card fluid={true} centered={true} className={this.props.cardClass + " shadowLess"} >
            {this.renderImages()}
            <div style={{textAlign: "center", fontSize: "4vh", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white"}}>
                {this.props.name}
                <div style={{color: "rgb(150,150,150)", fontSize: "3vh", paddingTop: "10px", backgroundColor: "white"}}>
                    {distance + " km"}
                </div>
            </div>
          </Card>
        </div>
      );
    // }
  }
}

export default RestoContainer;
