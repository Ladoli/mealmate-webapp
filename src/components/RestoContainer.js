import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';


class RestoContainer extends Component {

  constructor(props){
    super(props);
  }

  render() {
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

export default RestoContainer;
