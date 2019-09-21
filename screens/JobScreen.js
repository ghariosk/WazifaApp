import React, {Component} from 'react'
import {Text} from 'native-base'





export default class JobScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: this.props.navigation.getParam('data' , null)
		}
	}

	componentDidMount() {
		console.log(this.state.data)
	}


	render () {
		return (
			<Text> Hello </Text>
		)
	}
}