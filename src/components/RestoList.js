import React, { Component } from 'react';
import { map, isEmpty  } from 'lodash';
import RestoContainer from './RestoContainer';
import { Card, Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import * as actions from "../actions";




class RestoList extends Component {



  constructor(props){
    super(props);
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.resetRestos = this.resetRestos.bind(this);
    let restoList = [{name: "KFC", desc: "Finger Lickin Chicken"}, {name: "Spudshack", desc: "Poutine. Nuff said."},{name: "Captain's Boil", desc: "Spicy Seafood"}, {name: "Tanagram Creamery", desc: "Best Icecream"}];
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
            <RestoContainer cardClass="cardRight" name={value.name} key={key} />
          )
        }else{
          return (
            <RestoContainer  cardClass="cardLeft" name={value.name} key={key} />
          )
        }
      }else {
        return (
          <RestoContainer  cardClass="cardTest" name={value.name} key={key} />
        )
      }
    });

    if (!isEmpty(restos)) {
      return (
        <div style={{display: "block", minHeight: "35vh", position: "relative", minWidth: "40vw"}}>
          {restos}
        </div>
      )
    }else{
      return (<div>
        Fuck
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
      <div className="flexCenterAll" style={{backgroundColor: "red", display: "flex", height: "100%", minHeight: "100vh"}}>
        <Card className="flexCenterAll restoDisplay">
          <Card.Content>
            {this.renderRestos()}
          </Card.Content>
          <Card.Content>
            <Button onClick={this.clickNo}>
              Left
            </Button>
            <Button onClick={this.clickYes}>
              Right
            </Button>
            <br/>
            <div style={{textAlign: "center", paddingTop: "20px"}}>
              <Button onClick={this.resetRestos}>
                Reset
              </Button>
            </div>

          </Card.Content>
        </Card>
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
