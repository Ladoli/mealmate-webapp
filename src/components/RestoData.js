import React, { Component } from 'react';
import { map, isEmpty  } from 'lodash';
import { Card, Button } from 'semantic-ui-react';
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
    if(!this.props.restoData){
      return (
        <div>
        </div>
      );
    }
      return (
        <div className="flexCenterAll" style={{backgroundColor: "red", display: "flex", height: "100%", minHeight: "100vh"}}>
          <Card className="flexCenterAll restoDisplay">
            <Card.Content>
              {this.props.restoData.name}
            </Card.Content>
            <Card.Content>
              {this.props.restoData.desc}
            </Card.Content>
            <Card.Content>
              <Button onClick={this.swipeLeft}>
                Left Swipe
              </Button>
            </Card.Content>
          </Card>
        </div>
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
