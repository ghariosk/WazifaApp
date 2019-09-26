import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MapInput extends React.Component {

    render() {
        return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key 
                listViewDisplayed={false}    // true/false/undefined
                fetchDetails={true}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    this.props.notifyChange(details.geometry.location);
                }
                }

                query={{
                    key: 'AIzaSyCk2p4uNqQiUV2oi0Ll3xfGO42e6Ry4WSI',
                    language: 'en'
                }}

                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={300}
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      minLength={4} // minimum length of text to search
      autoFocus={false}
            />
        );
    }
}
export default MapInput;