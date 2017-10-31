import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image, Animated, Easing } from 'react-native';

export default class EcosystemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value
    }
    // this.animatedValue = new Animated.Value(0)

  }

  animate(easing) {
    this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 1000,
          easing
        }
    ).start()
  }

  render() {

    let location = this.props.location;
    let upgradeImageNumber = Math.floor(location.PositivePoints/10);
    let positiveImageNumber = location.PositivePoints%10;
    let downgradeImageNumber = Math.floor(location.NegativePoints/4);
    let negativeImageNumber = location.NegativePoints%4;
    upgradeImages = new Array(upgradeImageNumber);
    upgradeImages.fill(1);
    posImages = new Array(positiveImageNumber);
    posImages.fill(2)
    downgradeImages = new Array(downgradeImageNumber);
    downgradeImages.fill(3);
    negImages = new Array(negativeImageNumber);
    negImages.fill(0);
    return (
      <Image style={{height: '60%', width: '100%'}} source={{uri: 'https://www.nature.org/cs/groups/webcontent/@web/@westvirginia/documents/media/panther-knob-1500x879.jpg'}}>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Animated.View
            style={{
              opacity: this.state.fadeAnim, // Binds directly
              transform: [{
                translateY: this.state.fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                }),
              }],
            }}
          />
            {this.props.location.tasks ? (
              this.props.location.tasks.map((task, i) => (
                <Image
                  easing="sin"
                  key={i}
                  source={toast[1][1]}
                  style={{width: 50, height: 50}}
                />
              ))
            ) : null}
            {upgradeImageNumber > 0 ? 
              upgradeImages.map((img, i) => (
                  <Image
                    key={ i }
                    source={toast[2][1]}
                    style={{width: 100, height: 100}}
                  />
                ))
            : null}
            {this.props.location.PositivePoints ? 
              posImages.map((img, i) => (
                  <Image 
                    key={ i }
                    source={toast[2][1]}
                    style={{width: 50, height: 50}}
                  />
                ))
            : null}
            {downgradeImageNumber > 0 ? 
              downgradeImages.map((img, i) => (
                  <Image
                    key={ i }
                    source={toast[0][1]}
                    style={{width: 100, height: 100}}
                  />
                ))
            : null}
            {this.props.location.NegativePoints ? 
              negImages.map((img, i) => (
                  <Image 
                    key={ i }
                    source={toast[0][1]}
                    style={{width: 50, height: 50}}
                  />
                ))
            : null}
        </View>
     </Image>)
  }
}

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