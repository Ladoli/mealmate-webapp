import React, { Component } from 'react';
import { map, isEmpty, filter  } from 'lodash';
import RestoContainer from './RestoContainer';
import RestoData from './RestoData';
import { Card, Button, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import * as actions from "../actions";




class RestoList extends Component {

  constructor(props){
    super(props);
    this.props.getUserData(this.props.auth.uid);
    this.props.getRestoList();
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.resetRestos = this.resetRestos.bind(this);
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

  componentWillReceiveProps(nextProps){
    let that = this;
    let filteredRestoList = this.props.firebase_restoList;
    this.setState({
      filteredRestoList
    });
    if(this.props.userData && this.props.userData.blocklist && this.props.firebase_restoList){
        let blocklist = this.props.userData.blocklist;
        filteredRestoList = filter(that.props.firebase_restoList,(value)=>{
          return !blocklist[value.id]
        });
        filteredRestoList = map(filteredRestoList, (value,key)=>{
          return value;
        });
        this.setState({
          filteredRestoList
        });
    }
  }


  renderRestos(){
    let that = this;
    let restos = map(that.state.filteredRestoList, (value,key)=>{
      let cR = that.state.currentResto;
      if(cR === null){
        cR = that.state.filteredRestoList.length - 1;
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
          <div style={{position: "absolute"}} className="cardTest currentCard">
            <Card fluid={true} centered={true} className="cardTest currentCard shadowLess" >
              <Card.Content fluid="true" centered="true" className="noSidePadding flexCenterAll">
                <div style={{textAlign: "center", overflow: "hidden"}}>
                  <img className="imagePics" alt="Sad girl" src="https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/noFood.png?alt=media&token=e6be89d7-b5e7-4c91-b10f-c68f2ad3770e"/>
                  <div style={{textAlign: "center", fontSize: "4vh", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white"}}>
                    Sorry!
                    <div style={{color: "rgb(150,150,150)", fontSize: "3vh", paddingTop: "10px", backgroundColor: "white"}}>
                      There's no new restaurants around you
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
          {restos}
        </div>
      )
    }else{
      return (<div>
      </div>)
    }
  }

  clickYes(){
    let { filteredRestoList } = this.state;
    let restoListLength = filteredRestoList.length;
    let selectedRestoData = filteredRestoList[this.state.currentResto];
    let topCard;
    if(this.state.currentResto !== null){
      topCard = this.state.currentResto - 1;
    }else{
      selectedRestoData = filteredRestoList[restoListLength-1];
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
    let { filteredRestoList } = this.state;
    let restoListLength = filteredRestoList.length;
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
    let resetNumber = this.state.filteredRestoList.length - 1;
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
            <Button.Group fluid>
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
            </Button.Group>
          </Card.Content>
        </Card>
        <RestoData currentLocation = {this.state.Location}/>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase_restoList,restoData, auth,userData }) => {
  return {
    firebase_restoList,
    restoData,
    auth,
    userData
  };
};

export default connect(mapStateToProps, actions)(RestoList);
