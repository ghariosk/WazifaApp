import Geocoder from 'react-native-geocoding';
import {googleAPIKey} from '../constants/Google'

Geocoder.init(googleAPIKey);

export const getLocation = () => {
    return new Promise(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (data) => resolve(data.coords),
                (err) => {console.log(err) ; eject(err)}
            );
        }
    );
}

export const geocodeLocationByName = (locationName) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(locationName)
                .then(json => {
                    const addressComponent = json.results[0].address_components[0];
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

export const geocodeLocationByCoords = (lat, long) => {
    return new Promise(
        (resolve, reject) => {
            Geocoder.from(lat, long)
                .then(json => {

                    const addressComponent = json.results[0].address_components[0].short_name + ", " + json.results[0].address_components[1].long_name;
                    console.log(addressComponent)
                    resolve(addressComponent);
                })
                .catch(error => reject(error));
        }
    );
}

