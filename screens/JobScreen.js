import React  from 'react'
import {Text, Image} from 'react-native'
import { connect } from 'react-redux'
import { getJobs } from '../Actions/jobsActions'

class JobScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null
		}
		this.Hello = this.Hello.bind(this)
	}

	// var test = function (element) {
	// 	  return element.idjobs = this.props.navigation.getParam('id')
	// }


	Hello = (element) => {
		return element.idjobs = this.props.navigation.getParam('id')
	}

	componentDidMount() {
		console.log("This data is " , this.state.data)

		var found = this.props.jobs.find(this.Hello)

		console.log(found)
		this.setState({data: found})

		 
	}

	
	


	render () {
		const {category, duration, idjobs, image_uri} = this.state.data
		return (
			<View>
			<Text> {category} </Text>
			<Text> {duration} </Text>
			<Image source={{uri: image_uri}}/>

			</View>
		)
	}
}



const mapStateToProps = (state) => ({
	jobs: state.jobs.jobs,
	loading: state.jobs.loading,
	error: state.jobs.errorMessage
})

const mapDispatchToProps = (dispatch) => ({
	getJobs: () => dispatch(getJobs())
})

export default connect(mapStateToProps, mapDispatchToProps)(JobScreen)

