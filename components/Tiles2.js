import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get("window");
import { withNavigation } from 'react-navigation';

 class Tiles extends Component {
  render() {
    const tileDimensions = calcTileDimensions(width, this.props.rows)  // -> change this number and see!
    const tiles = this.props.dataSource
    return (
      <View style={styles.container}>
        {tiles.map((row) => Item({...tileDimensions, text:row.text, key:row.id, image:row.image, navigation: this.props.navigation}))}     
      </View>
    );
  }
}

const Item = ({size, margin, text, key, image, subcategory,navigation}) => (
  
  <TouchableOpacity key={key} style={[styles.item, {width: size, height: size, marginHorizontal: margin}]} onPress={()=> navigation.navigate('Settings')}>
    <View style={[styles.image, {height:"100%", width: "100%", marginBottom:5}]}>
    <Image resizeMode='contain' source={image} style={{height: "70%", width: "70%"}}/>
    </View>
    <Text style={styles.itemText}>{text}</Text>
  </TouchableOpacity>
  
)

const calcTileDimensions = (deviceWidth, tpr) => {
  const margin = deviceWidth / (tpr * 10);
  const size = (deviceWidth - margin * (tpr * 2)) / tpr;
  return { size, margin };
};

const styles = StyleSheet.create({
  container: {
     justifyContent: "flex-start",
      flexDirection: "row",
       flexWrap: "wrap",
        marginTop: 30
  },
  item: {
    alignSelf: "flex-start",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
    
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor : "white",
    borderRadius: 20

  },
  itemText: {
    fontSize: 10
  },
});

export default withNavigation(Tiles)