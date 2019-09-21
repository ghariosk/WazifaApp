import React from 'react';
import {
	StyleSheet,
	Image
	
} from 'react-native'
import {StatusBar, Picker,  Switch} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
var moment = require('moment');
import DurationPicker from '../components/react-native-modal-duration-picker'
import DateTimePicker from "react-native-modal-datetime-picker";
import {View, Button,Text, Container, Header, Content, Item, Input, Icon } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Auth, Storage } from 'aws-amplify';


export default class ServicesScreen extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			category: this.props.navigation.getParam('type', null),
			plumbing: {
				options: [ 
					{
						label: 'Drain Blocked',
						value: 'Drain Blocked'
				},
				 {
					label:'Heater Not Working',
					value: 'Heater Not Working'
				},
					
				{

				label:'Water Pressure Low',
				value: 'Water Pressure Low'
				}]
			},
			chosenOption: null,
			date: new Date(Math.ceil((new Date).getTime() / (1000*60*5)) * (1000*60*5)),
			wantSpecificDuration: false,
			durationPickerItem: [{'label': 'Yes', value: true},{label: 'No', value: false}],
			isDateTimePickerVisible: false,
			durationMinutes: [...Array(12).keys()].map(function(element){return element*5}),
			durationHours: [...Array(7).keys()],
			minutes: "00",
			hours: "02",
			isDurationPickerVisible: false,
			now: true,
			image: null


		}
		this.handleSubmit = this.handleSubmit.bind(this)
		
	}




		showDateTimePicker = () => {
			this.setState({ isDateTimePickerVisible: true });

		};

		hideDateTimePicker = () => {
			this.setState({ isDateTimePickerVisible: false });
		};

		handleDatePicked = date => {
			console.log("A date has been picked: ", date);
			this.setState({date: date})
			this.hideDateTimePicker();

		};

		handleDurationPicker = () => {
			this.hideDurationPicker()
			
		}

		hideDurationPicker = () => {
			this.setState({isDurationPickerVisible: false})
		}


		 componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);



    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };



	

	handleSubmit = async () => {

		let jwt
      	await Auth.currentSession().then(res=>{
      	let idToken = res.idToken
      	jwt = idToken.getJwtToken()
      	//You can print them to see the full objects
      	})
      	let type
      	let username
      	await Auth.currentUserInfo()
      	.then((res)=>{
        	type = res.attributes["custom:type"]
        	})
      		.catch((err)=>{
        		console.log(err)
        	})

		const rawResponse = await fetch('https://urbj1ulno3.execute-api.us-east-1.amazonaws.com/Dev/requestJob', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorizationToken': jwt

        },
        body: JSON.stringify(
          {
            category: this.state.category,
            subcategory: this.state.chosenOption,
            schedule_date: this.state.date,
            duration: this.state.duration,
            hasDuration: false,
            asap: false
        }),

      });
        const content = await rawResponse.json();

        // this.uploadToStorage

        console.log(content);

        this.uploadToStorage(content.body, this.state.image)

       
	}

	uploadToStorage = async (id,pathToImageFile) => {
		try {
		const response = await fetch(pathToImageFile)

		const blob = await response.blob()

		Storage.put(`${id}/1.jpeg`, blob, {
		contentType: 'image/jpeg',
		level: 'protected'
		})
		} catch (err) {
		console.log(err)
		}
		}

	showDurationModal = () => {
		this.setState({isDurationPickerVisible: true})
	}
	

	

	render () {
		var options = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute:"2-digit" };
		 let { image } = this.state;
		
		var Test = () => {
			if (this.state.wantSpecificDuration) {
				return (
					<View style={{flexDirection: 'row', alignItems:'center'}}>
					<Button  rounded onPress={this.showDurationModal}>
        			<Text> Pick a duration 
        			</Text>

        		</Button>
        		<Text> {this.state.hours + ":" + this.state.minutes} </Text>
        		
          		</View>
				)
			} else {
				return null
			}
		}
		return (
			<View style={styles.container}>
			<StatusBar/>
			
				<View>
				<Text> {this.state.subcategory} </Text>
				</View>
				<View>
				<RNPickerSelect
				placeholder={
					{
						label: "Pick a service",
						value : this.state.chosenOption
					}
				}
            	onValueChange={(value) => this.setState({'chosenOption': value})}
            	items={this.state.plumbing.options}
        		/>
        		</View>

        		<View style={{flexDirection: 'row'}}>
        		<Text> When </Text>
				<Button transparent onPress={()=> this.setState({'isDateTimePickerVisible':true})}>
					
					 	{
					 	this.state.now?
					 		<Text> Now </Text>
					 		:
					 		<Text>
					 		this.state.date.toLocaleString("en-US", options)
					 		</Text>

					 	}
					 
	
				 </Button>
				 <Text>  </Text>
				 </View>
				 <DateTimePicker
				
          		isVisible={this.state.isDateTimePickerVisible}
          		onConfirm={this.handleDatePicked}
          		onCancel={this.hideDateTimePicker}
          		mode="datetime"
         		is24Hour={true}
         		minuteInterval={10}
        		/>


        		<Item>
           			<Text> Do you want to pick a specific duration ? </Text>
        			<Switch onChange={async (event)=> {await this.setState({wantSpecificDuration: event.nativeEvent.value}); console.log(this.state.wantSpecificDuration)}} value={this.state.wantSpecificDuration}/>
        		

        			<Icon style={{color:this.state.wantSpecificDuration? 'green': 'red'}} name={this.state.wantSpecificDuration? 'checkmark-circle':'close-circle'} />
        		</Item>

        		<Test/>


        		<DurationPicker
        			isVisible={this.state.isDurationPickerVisible}
        			onConfirm={this.handleDurationPicker}
          			onCancel={this.hideDurationPicker}
          			onMinuteChange={(event)=> this.setState({minutes:event})}
          			onHourChange={(event)=> this.setState({hours:event})}
          		/>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Button
			
				onPress={this._pickImage}
				>
				<Text> Pick an Image </Text>
				</Button>
				{image &&
				<Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
				</View>


				<Button onPress={() => this.uploadToStorage(this.state.image)}> 
					<Text> 
						Upload to S3
					</Text>
				</Button>
			


				

			



        	
 
				 

				<Button rounded onPress={this.handleSubmit}>
					<Text>Submit</Text>
				</Button>
			</View>
		)
	}
}




const styles = StyleSheet.create({
  container: {
  	flex:1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  duration: {
  	flex: 1,
  	flexDirection: 'row'
  }
});

