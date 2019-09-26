import React, { Component } from 'react';
import { View, TextInput, Image, Animated, Keyboard } from 'react-native';
class Demo extends Component {
  constructor(props) {
    super(props);

    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    console.log('it fired')
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
      })
  .start();

  console.log(event)
  console.log(this.keyboardHeight)
  };

  keyboardWillHide = (event) => {
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0,
      })
   .start();
  };

  render() {
    return (
      <Animated.View  contentContainerStyle={[this.props.contentContainerStyle,{ marginBottom: 100}]} style={{ bottom: this.keyboardHeight }}>
        {this.props.children}
       <Animated.View style={{ marginTop: 200}}/>
      </Animated.View>
    );
  }
};

export default Demo;