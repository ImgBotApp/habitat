import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, TouchableOpacity } from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';


export default class AddAvatar extends React.Component {
  static navigationOptions = {
    title: 'Choose your ecobuddy!'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {images.map((pic, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => navigate('Eco', {avatar: pic[0]})}>
              <Image
                source={pic[1]}
                style={styles.ecobuds}
              />
            </TouchableOpacity>
          )
        })}
      </View>
    );
  }
}

const images = [
  [0, require("../assets/Ecosystem/home.png")],
  [1, require("../assets/Ecosystem/work.png")],
  [2, require("../assets/Ecosystem/gym.png")]
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecobuds: {
    width: 100,
    height: 100
  }
})
