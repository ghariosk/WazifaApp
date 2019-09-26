import React, {Component} from 'react'
import {
	StyleSheet,
	TouchableOpacity,
	Image
} from 'react-native'
import {Body, Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Thumbnail } from 'native-base';
import {Auth} from 'aws-amplify'
import allIcons from '../assets/icons/allIcons'
import { getJobs } from '../Actions/jobsActions'
import ActivityIndicatorExample from '../components/ActivityIndicatorExample';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class JobsScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			jobs: {},
			isLoading: true
		}
	}

	async componentDidMount() {

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
			{this.props.loading?
				<ActivityIndicatorExample/>
				 :
				 this.props.jobs.map((row)=> 
				 	Item({ key: row.idjobs, require_picture: this.Test, navigation: this.props.navigation, category: row.category, subcategory: row.subcategory, schedule_date: row.schedule_date})
				 )
			}
			</List>
			
			</Content>
			</Container>

		)
	}
}

var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: "numeric", minute:"2-digit" };
const Item = ({ key, require_picture, category,subcategory,schedule_date,navigation}) => (
 	
	 <ListItem button onPress={() => navigation.navigate('Job' , {id: key} )}  large key={key} avatar>
	
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

const mapStateToProps = (state) => ({
	jobs: state.jobs.jobs,
	loading: state.jobs.loading,
	error: state.jobs.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
	getJobs: () => dispatch(getJobs())
})


export default connect(mapStateToProps, mapDispatchToProps)(JobsScreen)










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