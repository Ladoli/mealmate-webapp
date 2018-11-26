import React, { PureComponent } from 'react';

import ActionsTab from './ActionsTab';

class Tabs extends PureComponent {
    //Set the direction paramters for Googlemaps
    setDirectionParams = (location, destination) => {
        let middlePoint = {Lat: (destination.Lat + location.Lat)/2, Long: (destination.Long + location.Long)/2};
        return location.Lat+",+"+location.Long+"/"+destination.Lat+",+"+destination.Long+"/@"+middlePoint.Lat+",+"+middlePoint.Long;
    }

    render(){
        let { restoData, type } = this.props;
        if(type === 3){
            let { currentLocation, destination, favourites } = this.props;
            if(!currentLocation || !destination){
              return <div>
                Location Not Provided.
              </div>;
            }
            let link = "https://www.google.ca/maps/dir/"+ this.setDirectionParams(currentLocation,destination);
            return (
                <ActionsTab 
                    directionsLink = {link}
                    restoData={restoData}
                    favourites={favourites}
                    />
            )
          }else{
              return <div></div>
          }
    }
}

export default Tabs;