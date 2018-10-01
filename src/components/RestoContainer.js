import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { isEmpty  } from 'lodash';




class RestoContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentImage: 0,
      currentImageLink: this.props.images[0]
    }
    this.renderImages = this.renderImages.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
  }

  componentDidMount(){
  }

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

  prevImage(){
    let nextImage = this.state.currentImage - 1;
    if(nextImage < 0){
      nextImage = this.props.images.length - 1;
    }
    this.setState({
      currentImage: nextImage,
      currentImageLink: this.props.images[nextImage]
    });
  }

  nextImage(){
    let maxLength = this.props.images.length - 1;
    let nextImage = this.state.currentImage + 1;
    if(nextImage > maxLength){
      nextImage = 0;
    }
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({
                currentImage: nextImage,
                currentImageLink: this.props.images[nextImage]
            });
        });
    });
  }

  renderImages(){
    let image = this.state.currentImageLink;
    let renderArrows = (
      <div style={{display: "inline-block",overflow: "hidden", position: "relative"}}>
        <Image centered={true} rounded={true} className="imagePics" src={image} />
      </div>
    )

    if(this.props.images.length > 1){
      renderArrows = (
        <div style={{display: "inline-block",overflow: "hidden", position: "relative"}}>
          <Image centered={true} rounded={true} className="imagePics" src={image} />
          <div onClick={this.prevImage} className="foodImageArrows">
          </div>
          <div onClick={this.nextImage} className="foodImageArrows" style={{ right: "0px"}}>
          </div>
        </div>
      )
    }
    if(!isEmpty(this.props.images)){
      return(
        <Card.Content fluid="true" centered="true" className="noSidePadding">
          <div style={{textAlign: "center", overflow: "hidden"}}>
            {renderArrows}
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
