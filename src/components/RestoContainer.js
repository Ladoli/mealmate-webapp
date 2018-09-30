import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { isEmpty  } from 'lodash';



class RestoContainer extends Component {


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
    // if(this.props.cardClass === "cardRight"){
    //   return (
    //     <div className={this.props.cardClass} style={{position: "absolute", minWidth: "50vw", minHeight: "50vh"}}>
    //       <Card className={this.props.cardClass}>
    //         <Card.Content>
    //           <div style={{textAlign: "center"}}>
    //             {this.props.name}
    //           </div>
    //         </Card.Content>
    //       </Card>
    //     </div>
    //   )
    // }else{
      return (
        <div style={{position: this.props.position}} className={this.props.cardClass}>
          <Card fluid={true} centered={true} className={this.props.cardClass + " shadowLess"} >
            {this.renderImages()}
            <div style={{textAlign: "center", fontSize: "4vh", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white"}}>
                {this.props.name}
            </div>
          </Card>
        </div>
      );
    // }
  }
}

export default RestoContainer;
