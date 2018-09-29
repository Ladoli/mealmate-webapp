import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import { map, isEmpty  } from 'lodash';



class RestoContainer extends Component {


  renderImages(){
    let images = this.props.images;
    console.log(images)

    if(!isEmpty(images)){
      return(
        <Card.Content centered>
          <div style={{textAlign: "center"}}>
            <Image centered size='small' src={images[0]} />
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
        <div style={{position: "absolute"}}>
          <Card className={this.props.cardClass}>
            {this.renderImages()}
            <div style={{textAlign: "center"}}>
              {this.props.name}
            </div>
          </Card>
        </div>
      );
    // }
  }
}

export default RestoContainer;
