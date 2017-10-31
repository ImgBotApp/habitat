import React, { Component } from 'react';
import { StyleSheet, View, Text, Separator, Dimensions, ScrollView, Button, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { StackNavigator, NavigationActions } from 'react-navigation';

class TutorialView extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={{marginTop: 40}}>
        <Swiper
          /* index={this.state.index} */
          horizontal={true}
          onIndexChanged={() => console.log('hi')}
          loop={false}
          style={{marginTop: 40}}
        >
          <View>
            <Text>One ScreenSchot</Text>
          </View>
          <View>
            <Text>Two ScreenSchot</Text>
          </View>
          <View>
            <Text>Three ScreenSchot</Text>
          </View>
        </Swiper>
        <Button
          title="Start Adding Locations"
          onPress={() => navigate('Map')}
        />
      </View>
    )
  }
}

export default TutorialView;
