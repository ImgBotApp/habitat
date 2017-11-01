import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TouchableOpacity, Animated, Image } from 'react-native'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

export default class App extends Component {

  state = {height: new Animated.Value(50)}

  startAnimation = () => {
    const {height} = this.state

    // Reset the value if needed
    height.setValue(50)

    // Start a spring animation
    Animated.spring(height, {toValue: 110, friction: 0.8}).start()
    setTimeout(this.startAnimation, 3000);
  }

  componentDidMount() {
    this.startAnimation()
  }

  render() {
    const {height} = this.state

    return (
      
      <Animated.Image

        source={toast[0][1]} 
        style={[{width: 100, borderColor: 'black'}, {height}]}
      >
      </Animated.Image>
    )
  }
}

const styles = StyleSheet.create({

})

const ecobuddies = [
  [
    [0, require("../assets/habit@/starfish-gray.png")],
    [1, require("../assets/habit@/starfish-sm.png")],
    [2, require("../assets/habit@/starfish-md.png")],
    [3, require("../assets/habit@/starfish-lg.png")]
  ],
  [
    [0, require("../assets/habit@/butterfly-gray.png")],
    [1, require("../assets/habit@/butterfly-sm.png")],
    [2, require("../assets/habit@/butterfly-md.png")],
    [3, require("../assets/habit@/butterfly-lg.png")]
  ],
  [
    [0, require("../assets/habit@/ladybug-gray.png")],
    [1, require("../assets/habit@/ladybug-sm.png")],
    [2, require("../assets/habit@/ladybug-md.png")],
    [3, require("../assets/habit@/ladybug-lg.png")]
  ]
]
const toast = [
  [0, require("../assets/Ecosystem/toast0.png")],
  [1, require("../assets/Ecosystem/toast1.png")],
  [2, require("../assets/Ecosystem/toast2.png")]
];

const tree = [
  [0, require("../assets/Ecosystem/tree0.png")],
  [1, require("../assets/Ecosystem/tree1.png")],
  [2, require("../assets/Ecosystem/tree2.png")]
];