import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableWithoutFeedback, Button, Picker, ScrollView, Alert, AsyncStorage } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import axios from 'axios';

export default class Friends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.screenProps.userID,
      giftPoints: this.props.screenProps.giftPoints,
      friends: [],
      userToken: null,
      selectedFriend: null,
      selectedLocationId: null,
      locationIsClicked: false,
      loadingEcosystem: false,
      selectedLocations: [],
      upgradeImages: [],
      posImages: [],
      downgradeImages: [],
      negImages: [],
      normalImages: []
    }
    this.giveGift = this.giveGift.bind(this);
  }

  componentDidMount() {
    // this.checkAsyncStorage();
    axios.get(`http://10.16.1.152:3000/friends`, { params: { user: this.state.userId }})
    .then(friends => {
      this.setState({ friends: friends.data })
    })
  }

  selectFriend(friend, key) {
    this.setState({
      selectedLocations: [],
      upgradeImages: [],
      posImages: [],
      downgradeImages: [],
      negImages: [],
      normalImages: [],
      selectedFriend: friend.Friend
    })
    axios.get(`http://10.16.1.152:3000/mapMarkers`, { params: { userID: friend.Friend}})
    .then(res => {
      this.setState({
        selectedLocations: res.data || [],
      })
    })
    .catch(err => console.error(err));
  }

  showEcosystem(location) {
    let upgradeImageNumber = Math.floor(location.PositivePoints/10);
    let positiveImageNumber = location.PositivePoints%10;
    let downgradeImageNumber = Math.floor(location.NegativePoints/4);
    let negativeImageNumber = location.NegativePoints%4;
    upgradeImages = new Array(upgradeImageNumber);
    upgradeImages.fill(location.Ecosystem);
    posImages = new Array(positiveImageNumber);
    posImages.fill(location.Ecosystem)
    downgradeImages = new Array(downgradeImageNumber);
    downgradeImages.fill(location.Ecosystem);
    negImages = new Array(negativeImageNumber);
    negImages.fill(location.Ecosystem);
    this.setState({
      selectedLocation: location.Marker_ID,
      locationIsClicked: true,
      upgradeImages: upgradeImages || [],
      posImages: posImages || [],
      downgradeImages: downgradeImages || [],
      negImages: negImages || [],
      normalImages: location.tasks || []
    })
  }

  giveGift() {
    if (this.state.giftPoints <= 0) {
      Alert.alert(`you don't have any giftpoints to give out. Please wait till tomorrow`);
      return;
    }
    this.setState({
      giftPoints: this.state.giftPoints - 1
    })
    axios.put('http://10.16.1.131:3000/gift', {
      userId: this.state.userId,
      friendEcosystem: this.state.selectedLocation
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
  }

  checkAsyncStorage = async () => {
    const tokenInPhone = await AsyncStorage.getItem(`user_token`)
    this.setState({tokenInPhone});
  }

  render() {
    return (
      <View>
        <ScrollView horizontal={true} style={{borderBottomWidth: 1, borderColor: "black"}}>
          {this.state.friends.map((friend, key) => {
            return (
              <View key={key} style={styles.friends}>
                <TouchableWithoutFeedback onPress={() => this.selectFriend(friend, key)}>
                  <Image source={{uri: friend.Pic}} style={styles.photo}/>
                </TouchableWithoutFeedback>
                <Text style={styles.name}>
                  {friend.Friend_Name.split(' ')[0]}
                </Text>
              </View>
            )
          })}
        </ScrollView>
        <View>
          <Text>Current Amount of GiftPoints: {this.state.giftPoints}</Text>
          {this.state.loadingEcosystem ? (
            <View>
              <Image source={require('../assets/loading.gif')} style={{width: 200, height: 200}}/>
            </View>
          ) : (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <ScrollView horizontal={true}>
                  {this.state.selectedLocations.map((location, i) => {
                    return i === 0 ? (
                      <Text style={{margin: 10}} key={i} onPress={() => this.showEcosystem(location)}>
                        {location.Marker_Title}
                      </Text>
                    ) :
                    (
                      <Text style={{margin: 10}} key={i} onPress={() => this.showEcosystem(location)}>
                        {location.Marker_Title}
                      </Text>
                    )
                  })}
                </ScrollView>
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {this.state.normalImages.map((task, i) => {
                  return (
                    <Image
                      key={i}
                      source={ecobuddies[task.Ecosystem][1][1]}
                      style={{width: 50, height: 50}}
                    />
                  )
                })}
                {this.state.upgradeImages.map((img, i) => {
                  return (
                    <Image
                      key={i}
                      source={ecobuddies[img][2][1]}
                      style={{width: 100, height: 100}}
                    />
                  )
                })}
                {this.state.posImages.map((img, i) => {
                  return (
                    <Image
                      key={i}
                      source={ecobuddies[img][2][1]}
                      style={{width: 100, height: 100}}
                    />
                  )
                })}
                {this.state.downgradeImages.map((img, i) => {
                  return (
                    <Image
                      key={i}
                      source={ecobuddies[img][0][1]}
                      style={{width: 100, height: 100}}
                    />
                  )
                })}
                {this.state.negImages.map((img, i) => {
                  return (
                    <Image
                      key={i}
                      source={ecobuddies[img][0][1]}
                      style={{width: 100, height: 100}}
                    />
                  )
                })}
              </View>
              <View style={styles.giftbutton}>
                {this.state.locationIsClicked ? <Button
                  title="Give Gift"
                  onPress={this.giveGift}
                  /> : null}
              </View>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const ecobuddies = [
  [
    [0, require("../assets/Ecosystem/toast0.png")],
    [1, require("../assets/Ecosystem/toast1.png")],
    [2, require("../assets/Ecosystem/toast2.png")]
  ],
  [
    [0, require("../assets/Ecosystem/tree0.png")],
    [1, require("../assets/Ecosystem/tree1.png")],
    [2, require("../assets/Ecosystem/tree2.png")]
  ]
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    bottom: 50,
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    borderRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 3,
    width: 100,
    height: 100
  },
  selected: {
    borderRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: 3,
    width: 100,
    height: 100
  },
  name: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "bold",
  },
  backgroundName: {
    fontSize: 14,
    marginTop: 5,
  },
  friends: {
    margin: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
