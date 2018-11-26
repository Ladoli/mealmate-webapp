import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Card, Button, Icon } from 'semantic-ui-react';
import { MdLocationOn } from 'react-icons/md';
import swal from 'sweetalert2';

import { fetchUser, addToUserFavourite } from '../../../../actions';

// import { MdStore, MdRestaurantMenu, MdLocationOn } from 'react-icons/md';
class ActionsTab extends PureComponent{

    goToGoogleMaps = (link) => {
        window.open(link, '_blank');
    }

    addToFavourites = () => {
        this.props.addToUserFavourite(
            this.props.auth.uid, 
            this.props.restoData.id, 
            this.props.restoData.Name);
        swal({
          title: "Restaurant has been saved!",
          text: "You can now access this restaurant anytime from the menu on the left!"
        });
      }

    render(){
        let { favourites, directionsLink, restoData } = this.props;
        let restoID = restoData.id;
        return (
            <div style={{width: "270px", height: "270px", textAlign: "center"}} className="flexCenterAll">
                <Card>
                <Card.Content>
                    <Button primary onClick={()=>this.goToGoogleMaps(directionsLink)}>
                    <MdLocationOn /> DIRECTIONS
                    </Button>
                </Card.Content>
                {
                (!favourites || (favourites && !favourites[restoID])) && (
                    <Card.Content>
                        <Button color='yellow' onClick={()=>this.addToFavourites()}>
                        <Icon name='star' /> FAVOURITE
                        </Button>
                    </Card.Content>
                    )
                }
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    };
};

export default connect(mapStateToProps, { fetchUser, addToUserFavourite })(ActionsTab);