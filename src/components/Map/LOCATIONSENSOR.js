import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Image, Dimensions, TextInput, Button} from "react-native";
import { StackNavigator, NavigationActions } from 'react-navigation';



export default class LocationSensor extends React.Component {
  static navigationOptions = {
    title: 'Give your ecosystem a name!'
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    let avatar = this.props.navigation.state.params.avatar;
    let eco = this.props.navigation.state.params.eco;
    return (
      <View style={styles.container}>
        <Image source={images[avatar][1]} style={styles.ecobuds}/>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 100}}
          onChangeText={(e) => this.setState({title: e})}
          value={this.state.title}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200}}
          onChangeText={(e) => this.setState({description: e})}
          value={this.state.description}
        />
        <Button
          onPress={() => navigate('Location', {eco: eco, avatar: avatar, title: this.state.title, description: this.state.description})}
          title="Next"
          color="#841584"
        />
      </View>
    );
  }
}
const sprites = [
  [0, require("../assets/Ecosystem/toast1.png")],
  [1, require("../assets/Ecosystem/tree1.png")]
]

const images = [
  [0, require("../assets/Ecosystem/home.png")],
  [1, require("../assets/Ecosystem/work.png")],
  [2, require("../assets/Ecosystem/gym.png")]
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ecobuds: {
    width: 100,
    height: 100
  }
})
