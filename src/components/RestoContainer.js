import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';


class RestoContainer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    if(this.props.cardClass === "cardRight"){
      return (
        <div className={this.props.cardClass} style={{position: "absolute", minWidth: "50vw", minHeight: "50vh"}}>
          <Card className={this.props.cardClass}>
            <Card.Content>
              {this.props.name}
            </Card.Content>
          </Card>
        </div>
      )
    }else{
      return (
        <div style={{position: "absolute"}}>
          <Card className={this.props.cardClass}>
            <Card.Content>
              {this.props.name}
            </Card.Content>
          </Card>
        </div>
      );
    }
  }
}

export default RestoContainer;
