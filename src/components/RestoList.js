import React, { Component } from 'react';
import { map, isEmpty  } from 'lodash';
import RestoContainer from './RestoContainer';
import RestoData from './RestoData';
import { Card, Button, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import * as actions from "../actions";




class RestoList extends Component {

  constructor(props){
    super(props);
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.resetRestos = this.resetRestos.bind(this);
    this.props.getRestoList();
    let restoList = [];
    if(this.props.firebase_restoList){
      restoList = this.props.firebase_restoList;
    }
    this.state = {
      restoList: restoList,
      currentResto: null,
      lastAction: "",
      Location: null
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
    let that = this;
    function getPosition(position) {
        that.setState({
          Location: {Lat: position.coords.latitude, Long: position.coords.longitude}
        })
    }
  }



  renderRestos(){
    let that = this;
    let restos = map(that.props.firebase_restoList, (value,key)=>{
      let cR = that.state.currentResto;
      if(cR === null){
        cR = that.props.firebase_restoList.length - 1;
      }
      if(key > cR+1){
        return <div key={key}></div>
      }else if(key === cR+1){
        if(this.state.lastAction === "right"){
          return (
            <RestoContainer position="absolute" cardClass="cardRight" currentLocation = {this.state.Location} restoInfo={value} images={value.FoodImages} name={value.Name} key={key} />
          )
        }else{
          return (
            <RestoContainer  position="absolute" cardClass="cardLeft" currentLocation = {this.state.Location} restoInfo={value}  images={value.FoodImages} name={value.Name} key={key} />
          )
        }
      }else if(key === cR){
        return (
          <RestoContainer  position="relative" cardClass="cardTest currentCard" currentLocation = {this.state.Location} restoInfo={value}  images={value.FoodImages} name={value.Name} key={key} />
        )
      }else {
        return (
          <RestoContainer  position="absolute" cardClass="cardTest" currentLocation = {this.state.Location} restoInfo={value} images={value.FoodImages} name={value.Name} key={key} />
        )
      }
    });

    if (!isEmpty(restos)) {
      return (
        <div className="restoImagesCont" style={{display: "block", minHeight: "35vh", position: "relative", minWidth: "40vw"}}>
          {restos}
        </div>
      )
    }else{
      return (<div>
      </div>)
    }
  }

  clickYes(){
    let { firebase_restoList } = this.props;
    let restoListLength = firebase_restoList.length;
    let selectedRestoData = firebase_restoList[this.state.currentResto];
    let topCard;
    if(this.state.currentResto !== null){
      topCard = this.state.currentResto - 1;
    }else{
      selectedRestoData = firebase_restoList[restoListLength-1];
      topCard = restoListLength - 2;
    }
    this.setState({
      currentResto: topCard,
      lastAction: "right"
    });
    const { setRestoData } = this.props;
    setRestoData(selectedRestoData);
  }

  clickNo(){
    let { firebase_restoList } = this.props;
    let restoListLength = firebase_restoList.length;
    let topCard;
    if(this.state.currentResto !== null){
      topCard = this.state.currentResto - 1;
    }else{
      topCard = restoListLength - 2;
    }
    this.setState({
      currentResto: topCard,
      lastAction: "left"
    });
  }

  resetRestos(){
    let resetNumber = this.props.firebase_restoList.length - 1;
    this.setState({
      currentResto: resetNumber
    });
  }



  render() {
    return (
      <div className="flexCenterAll restoBackground" style={{
        display: "flex", height: "100%", minHeight: "100vh"}}>
        <Card fluid className="flexCenterAll restoDisplay">
          <Card.Content className="noSidePadding">
            {this.renderRestos()}
          </Card.Content>
          <Card.Content extra style={{width: "100%", textAlign: "center"}}>
            {/* <Button.Group> */}
              <Button onClick={this.clickNo}  className="circleButton" >
                <Icon name='x' color='red'/>
              </Button>
              {/* <Button.Or /> */}
              <Button onClick={this.clickYes} className="circleButton" >
                <Icon name='check' color='green'/>
              </Button>
              <Button onClick={this.resetRestos} className="circleButton">
                <Icon name='redo' color='blue' />
              </Button>
            {/* </Button.Group> */}
          </Card.Content>
        </Card>
        <RestoData/>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase_restoList,restoData, auth }) => {
  return {
    firebase_restoList,
    restoData,
    auth
  };
};

export default connect(mapStateToProps, actions)(RestoList);
