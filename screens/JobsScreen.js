import React, {Component} from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native'
import {Body, Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Thumbnail } from 'native-base';
import {Auth} from 'aws-amplify'
import allIcons from '../assets/icons/allIcons'


export default class JobsScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			jobs: {},
			isLoading: true
		}
	}

	async componentDidMount() {
		let jwt
		await Auth.currentSession().then(res=>{
		let idToken = res.idToken
		jwt = idToken.getJwtToken()
		}).catch((err) => console.log(err))

		console.log(jwt)

		const rawResponse = await fetch('https://urbj1ulno3.execute-api.us-east-1.amazonaws.com/Dev/listJobs', {
			headers: {
				'Accept': 'application/json',
				'authorizationToken': jwt
			}
		})

		const data = await rawResponse.json()

		this.setState({jobs:data.results})
		this.setState({isLoading: false})

		console.log(data)


	}

	Test = (category) => {
		if(category == "Plumbing") {
			return require('../assets/icons/icons8-plumbing-100.png')

		} else {
			return false
		}
	

	} 



	render () {
		return (
			<Container>
			<Content>
			<List>
			{this.state.isLoading?
				null
				 :
				 this.state.jobs.map((row)=> 
				 	Item({data: row, key: row.idjobs, require_picture: this.Test, navigation: this.props.navigation, category: row.category, subcategory: row.subcategory, schedule_date: row.schedule_date})
				 )
			}
			</List>
			
			</Content>
			</Container>

		)
	}
}

var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute:"2-digit" };
const Item = ({data, key, require_picture, category,subcategory,schedule_date,navigation}) => (
 	
	 <ListItem button onPress={() => navigation.navigate('Job' , {data: data} )}  large key={key} avatar>
	
              <Left>
                <Thumbnail small square source={allIcons.Plumbing}/>
              </Left>
              <Body>
                <Text>{category}</Text>
                <Text note>{subcategory}</Text>
              </Body>
              <Right>
                <Text note> {new Date(schedule_date).toLocaleString("en-US", options)}</Text>
              </Right>
           
         </ListItem>



)










const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	alignItems: 'center',
  	justifyContent: 'center'
  },
  touch: {
  	zIndex: 1
  }
});