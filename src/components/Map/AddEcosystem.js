import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

export default class AddEcosystem extends Component {
  static navaigationOptions = {
    title: 'Choose your Ecosystem!'
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }} >
        {sprites.map((ele, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => {navigate('Title', { 
              avatar: this.props.navigation.state.params.avatar,
              eco: ele[0]
            })}}>
              <Image source={sprites[i][1]} style={{ height: 100, width: 100 }} />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

const sprites = [
  [0, require("../assets/Ecosystem/toast1.png")],
  [1, require("../assets/Ecosystem/tree1.png")]
]