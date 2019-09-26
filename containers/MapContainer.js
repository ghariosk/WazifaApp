import React from 'react';
import { View, Modal } from 'react-native';
import MapInput from '../components/MapInput';
import MyMapView from '../components/MapView';
import { getLocation, geocodeLocationByName, geocodeLocationByCoords } from '../services/location-service';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

class MapContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        region: {},
        isLocationSearchVisible: false
    };
    }
   

    componentDidMount() {
        this.getInitialState();
    }

    async getInitialState ()  {
        await getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.025,
                        longitudeDelta: 0.025
                    }
                });
            }
        );

        // console.log(this.state.region)

        // var test = await geocodeLocationByCoords(this.state.region.latitude, this.state.region.longitude)
        // this.setState({address: test})

        // console.log(test)
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.025,
                longitudeDelta: 0.025
            }
        });
        // console.log(this.state.region)
        this.setState({isLocationSearchVisible: false})
    }

    onMapRegionChange(region) {
        this.setState({ region });
        // console.log(region)
    }


    render() {
        return (
            
            <View style={{ flex: 1 }}>
             <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' onPress={this.props.onMapPressBack} />
            </Button>
          </Left>
          <Body>
            <Title>Location
            </Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search'  onPress={()=> this.setState({isLocationSearchVisible: true})}/>
            </Button>
          </Right>
        </Header>
            <Modal visible={this.state.isLocationSearchVisible}>
                <View style={{ flex: 1}}>
                    <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)}
                    />
                </View>
                </Modal>

                {
                   this.state.region['latitude']?
                        <View style={{ flex: 1 }}>
                            <MyMapView
                                onConfirm={() => this.props.onConfirm(this.state.region)}
                                region={this.state.region}
                                onRegionChange={(reg) => this.onMapRegionChange(reg)} 
                                onPressSearch={() => this.setState({isLocationSearchVisible: true})}/>
                        </View> : null}
            </View>
        );
    }
}

export default MapContainer;