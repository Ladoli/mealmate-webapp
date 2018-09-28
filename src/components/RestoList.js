import React, { Component } from 'react';
import { map, isEmpty  } from 'lodash';
import RestoContainer from './RestoContainer';
import { Card, Button } from 'semantic-ui-react';


class RestoList extends Component {



  constructor(props){
    super(props);
    this.clickYes = this.clickYes.bind(this);
    this.clickNo = this.clickNo.bind(this);
    this.resetRestos = this.resetRestos.bind(this);
    let restoList = ["KFC", "Spudshack", "Captain's Boil", "Tanagram Creamery"];

    this.state = {
      restoList: restoList,
      currentResto: restoList.length,
      lastAction: ""
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
            <RestoContainer  cardClass="cardRight" name={value} key={key} />
          )
        }else{
          return (
            <RestoContainer  cardClass="cardLeft" name={value} key={key} />
          )
        }
      }else {
        console.log(key)
        return (
          <RestoContainer  cardClass="cardTest" name={value} key={key} />
        )
      }
    });

    if (!isEmpty(restos)) {
      console.log(restos)
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
    let topCard = this.state.currentResto - 1;
    this.setState({
      currentResto: topCard,
      lastAction: "right"
    });
  }

  clickNo(){
    let topCard = this.state.currentResto - 1;
    this.setState({
      currentResto: topCard,
      lastAction: "left"
    });
  }

  resetRestos(){
    this.setState({
      currentResto: 3
    });
  }



  render() {
    return (
      <div className="flexCenterAll" style={{backgroundColor: "red", display: "flex", height: "100%", minHeight: "100vh"}}>
        <Card className="flexCenterAll restoList">
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

export default RestoList;
