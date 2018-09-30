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
    let restoList = [{Name: "KFC", desc: "Finger Lickin Chicken", FoodImages: [
      "https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/93ae44fa-fb79-48f6-b7d4-6c7b3f330b62.png?alt=media"
    ], StoreFront: "https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/kfcFront.jpg?alt=media"},
    {Name: "Spudshack", desc: "Poutine. Nuff said.", FoodImages: [
      "https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/spudshack.jpg?alt=media"
    ]},
    {Name: "Captain's Boil", desc: "Spicy Seafood", FoodImages: [
      "https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/cb.jpg?alt=media"
    ]},
    {Name: "Tangram Creamery", desc: "Best Icecream", FoodImages: [
      "https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/tangram.jpeg?alt=media"
    ], StoreFront: "https://firebasestorage.googleapis.com/v0/b/meal-mate-da7f4.appspot.com/o/tangramFront.jpg?alt=media"}];
    let resetCount = restoList.length -1;
    this.state = {
      restoList: restoList,
      currentResto: restoList.length-1,
      lastAction: "",
      resetResto: resetCount
    }
  }

  renderRestos(){
    let that = this;
    let restos = map(this.state.restoList, (value,key)=>{
      let cR = that.state.currentResto;
      if(key > cR+1){
        return <div key={key}></div>
      }else if(key === cR+1){
        if(this.state.lastAction === "right"){
          return (
            <RestoContainer position="absolute" cardClass="cardRight" images={value.FoodImages} name={value.Name} key={key} />
          )
        }else{
          return (
            <RestoContainer  position="absolute" cardClass="cardLeft" images={value.FoodImages} name={value.Name} key={key} />
          )
        }
      }else if(key === cR){
        return (
          <RestoContainer  position="relative" cardClass="cardTest currentCard" images={value.FoodImages} name={value.Name} key={key} />
        )
      }else {
        return (
          <RestoContainer  position="absolute" cardClass="cardTest" images={value.FoodImages} name={value.Name} key={key} />
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
    let selectedRestoData = this.state.restoList[this.state.currentResto];
    let topCard = this.state.currentResto - 1;
    this.setState({
      currentResto: topCard,
      lastAction: "right"
    });
    const { setRestoData } = this.props;
    setRestoData(selectedRestoData);

  }

  clickNo(){
    let topCard = this.state.currentResto - 1;
    this.setState({
      currentResto: topCard,
      lastAction: "left"
    });
  }

  resetRestos(){
    let resetCount = this.state.resetResto;
    this.setState({
      currentResto: resetCount
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
            {/* </Button.Group> */}
            <br/>
            <div style={{textAlign: "center", paddingTop: "20px"}}>
              <Button onClick={this.resetRestos} primary>
                <Icon name='redo' />
                Reset
              </Button>
            </div>

          </Card.Content>
        </Card>
        <RestoData/>
      </div>
    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(RestoList);
