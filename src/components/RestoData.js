import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getRestoData, setRestoData } from "../actions";




class RestoData extends Component {

  constructor(props){
    super(props);
    this.props.getRestoData();
    this.state = {
      setRestoData: this.props.setRestoData
    };
    this.swipeLeft = this.swipeLeft.bind(this);
  }

  swipeLeft(){
    const { setRestoData } = this.state;
    setRestoData(null);
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
        // <div className="flexCenterAll" style={{backgroundColor: "red",
        //   background: "webkit-linear-gradient(-50deg, #f12711, #f5af19)",
        //   background: "linear-gradient(-50deg, #f12711, #f5af19)",
        //   display: "flex", height: "100%", minHeight: "100vh"}}>
          <Card className="flexCenterAll restoDisplay restoDataInfo">
            <Card.Content>
              {this.props.restoData.name}
            </Card.Content>
            <Card.Content>
              <Button color='orange'>Store Front</Button>
              <Button color='red'>Menu</Button>
              <Button color='blue'>Location</Button>
            </Card.Content>
            <Card.Content>
              {this.props.restoData.desc}
            </Card.Content>
            <Card.Content>
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

export default connect(mapStateToProps, { getRestoData, setRestoData })(RestoData);
