import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Image, Dimensions, Button, TouchableOpacity, Alert } from "react-native";
import { Components, MapView, Permissions, Constants, AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import Location from './AddLocation.js';
import GetCurrentLocation from './GetCurrentLocation';
import TaskModal from '../TaskView/TaskModal.js';

const { width, height } = Dimensions.get("window");

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
  };

  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      markerIDs: [],
      userID: null,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      currentLocation: {},
      render: false,
      iconLoaded: false,
      modalVisible: false,
      currentPress: [],
      specifiedLocation: undefined,
      friends: [],
      fakeWalk: false,
      walkTo: null,
      count: 0
    };
    this.editTask = this.editTask.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.startWalking = this.startWalking.bind(this)
  }

  getMarkers() {
    axios.get('http://10.16.1.152:3000/mapMarkers', {params: {userID: this.state.userID}})
     .then(markers => {
       this.setState({markers: markers.data})
     })
     .then(res => {
       this.setState({markerIDs: []});
       let allMarkers = this.state.markers
       for(let i = 0; i < allMarkers.length; i++) {
         this.state.markerIDs.push(allMarkers[i].Marker_Title)
       }
     })
     .then(res => this.updateCurrentLocation())
     .then(res => setTimeout(this.startRender, 350))
     .then(res => this.getFriends())
     .then(res => setTimeout(() => {this.animateMap()}, 1550))
     .catch(err => console.error('error getting markers',err))
  }

  getFriends() {
    axios.get(`http://10.16.1.152:3000/friendLocations`, { params: { user: this.state.userID }})
    .then(friends => {
      this.setState({ friends: friends.data || [] })
    })
    .catch(err => console.error(error))
  }

  componentDidMount() {
    this.setState({
      userID: this.props.screenProps.userID
    }, () => this.getMarkers())
  }

  startRender = () => {
    this.setState({
      render: true
    })
  }

  editTask(task) {
    this.props.navigation.navigate('TaskBuilder', { specificTask: task });
  }

  animateMap() {
    this.state.markerIDs.length > 0 ?
    this.map.fitToSuppliedMarkers(this.state.markerIDs, true) :
    this.animateToRegion()
  }

  animateToRegion() {
    this.map.animateToRegion(
      {
        ...this.state.currentLocation.coordinate,
        latitudeDelta: 0.0084,
        longitudeDelta: 0.0034,
      }
    )
  }

  updateCurrentLocation() {
    GetCurrentLocation(this.state.userID)
    .then(location => {
      this.setState({
        currentLocation: {
          coordinate: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          title: "Current Location",
          description: "Me"
        }
      })
    })
    .then(res => {
      if (this.state.render) {
        this.animateToRegion()
      }
    })
    .catch(err => {
      console.error('error in updateCurrentLocation', err);
    })
  }

  toggleModal(marker) {
    if(marker.tasks) {
      this.setState({
        modalVisible: true,
        currentPress: marker.tasks
      })
    }
  }

  toggleHide() {
    this.setState({
      modalVisible: false
    })
  }

  zoom(marker) {
    this.map.animateToRegion(
      {
        latitude: marker.Latitude,
        longitude: marker.Longitude,
        latitudeDelta: 0.000984,
        longitudeDelta: 0.000834,
      })
    this.setState({
      specifiedLocation: marker
    })

  }

  alertAtLocation() {
    var locations = this.state.markers.map((curr, idx, arr) => {
      return {
        title: curr.Marker_Title,
        longitude: curr.Longitude,
        latitude: curr.Latitude
      }
    })
    var currentLocation = {
      title: this.state.currentLocation.title,
      longitude: this.state.currentLocation.coordinate.longitude,
      latitude: this.state.currentLocation.coordinate.latitude
    }
    locations.forEach((location) => {
      if (Math.abs((location.longitude - currentLocation.longitude) + (location.latitude - currentLocation.latitude)) < .0001) {
        Alert.alert(
          'You are at ' + location.title,
          'Want to see what you need to do?',
          [
            {text: 'Yes', onPress: () => console.log('go to tasks later')},
            {text: 'No', onPress: () => console.log('just close this thing')}
          ],
          {cancelable: true}
        )
      }
    })
  }

  fakeWalk(region) {
    if (!region) {
      console.log('show icon')
      this.setState({fakeWalk: !this.state.fakeWalk})
    } else {
      console.log('is walking?')
      this.setState({ walkTo: region}, () => setTimeout(this.startWalking, 300))
    }
  }

  startWalking() {
    // console.log(this.state.currentLocation.coordinate, this.state.walkTo)
    let x = this.state.walkTo.latitude - this.state.currentLocation.coordinate.latitude;
    let y = this.state.walkTo.longitude - this.state.currentLocation.coordinate.longitude;

    let dx = x/20;
    let dy = y/20;

    let convolutedMagic = () => {
      let x = this.state.walkTo.latitude - this.state.currentLocation.coordinate.latitude;
      let y = this.state.walkTo.longitude - this.state.currentLocation.coordinate.longitude;
      console.log(x, y)
      if (Math.abs(x) < 0.0001 || Math.abs(y) < 0.0001) return;
      this.setState({
        currentLocation: {
          coordinate: {
            latitude: this.state.currentLocation.coordinate.latitude + dx,
            longitude: this.state.currentLocation.coordinate.longitude + dy,
          },
          title: "Current Location",
          description: "Me"
        }
      }, () => setTimeout(convolutedMagic, 300))
    }

    convolutedMagic()
  }

  onRegionChange(region) {
    this.setState({region})
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return this.state.render ? (
      <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
            style={{position: 'absolute', backgroundColor:'transparent', zIndex: 2}}
          >
            <Text>&#9776;</Text>
          </TouchableOpacity>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
          onRegionChange={this.onRegionChange}
        >
          <MapView.Marker
            key={this.state.iconLoaded ? 'markerLoaded' : 'marker'}
            coordinate={this.state.currentLocation.coordinate}
            title={this.state.currentLocation.title}
            description={this.state.currentLocation.description}
            >
            <Image style={{width: 20, height: 20}} source={require("../assets/Ecosystem/currentlocation.png")} onLoadEnd={() => {if (!this.state.iconLoaded) this.setState({iconLoaded: true});}}/>
          </MapView.Marker>
          {this.state.markers ? (
            this.state.markers.map((marker, index) => {
              return (
                <MapView.Marker
                  key={index}
                  coordinate={{latitude: marker.Latitude, longitude: marker.Longitude}}
                  title={marker.Marker_Title}
                  description={marker.Marker_Description}
                  identifier={marker.Marker_Title}
                  onPress={() => this.toggleModal(marker)}
                  >
                  <Image source={images[marker.Avatar][1]} style={styles.marker} />
                </MapView.Marker>
              );
            })
          ) : null}
          {this.state.friends.map((friend, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={{latitude: friend.Latitude, longitude: friend.Longitude}}
                title={friend.Friend_Name}
                >
                <Image source={{uri: friend.Pic}} style={styles.friends}/>
              </MapView.Marker>
            );
          })}
          {this.state.specifiedLocation ? (
            <MapView.Circle
              radius={25}
              center={{latitude: this.state.specifiedLocation.Latitude, longitude: this.state.specifiedLocation.Longitude}}
            />
          ) : null}
          {this.state.fakeWalk ? (
            <MapView.Marker coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}} title="walk here" onPress={() => this.fakeWalk(this.state.region)}>
              <Image source={require("../assets/pin.png")} style={{width: 50, height: 50}} />
            </MapView.Marker>
          ) : null}
        </MapView>
        <Animated.ScrollView
          vertical
          scrollEventThrottle={1}
          snapToInterval={CARD_WIDTH}
          style={styles.scrollView}
        >
          {this.state.markers ? (
            this.state.markers.map((marker, index) => (
              <TouchableOpacity key={index} onPress={() => this.zoom(marker)} style={styles.cardContainer}>
                <Text style={styles.cardtitle}>
                  {marker.Marker_Title}
                </Text>
                <Image source={images[marker.Avatar][1]} style={styles.cardImage}/>
              </TouchableOpacity>
            ))
          ) : null}
          <TouchableOpacity onPress={() => navigate('Avatar')} style={styles.cardContainer}>
            <Image source={require("../assets/plus.png")} style={styles.cardImage}/>
          </TouchableOpacity>
        </Animated.ScrollView>
        <TouchableOpacity style={styles.recenter} onPress={() => this.updateCurrentLocation()}>
          <Image source={require("../assets/Ecosystem/currentlocation.png")} style={{width: 50, height: 50}} />
        </TouchableOpacity>
        <TouchableOpacity style={{position: "absolute", bottom: 60, left: 30}} onPress={() => this.fakeWalk()}>
          <Image source={require("../assets/walking.png")} style={{width: 50, height: 50}}/>
        </TouchableOpacity>
        {this.state.modalVisible ? (
          <TaskModal userID={this.state.userID} editTask={this.editTask} tasks={this.state.currentPress} modalVisible={this.state.modalVisible} toggleHide={this.toggleHide.bind(this)}/>
        ) : null }
      </View>
    ) :  (
        <View style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require("../assets/loading.gif")} style={{width: 200, height: 200}}/>
        </View>
    )
  }
}

const images = [
  [0, require("../assets/Ecosystem/home.png")],
  [1, require("../assets/Ecosystem/work.png")],
  [2, require("../assets/Ecosystem/gym.png")],
  [3, require("../assets/Ecosystem/currentlocation.png")]
]

const CARD_HEIGHT = height / 5;
const CARD_WIDTH = CARD_HEIGHT - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    position: "absolute",
    top: 30,
    bottom: 30,
    left: width - 60,
    width: 100,
    height: height / 2
  },
  cardContainer: {
    height: 60,
    width: 90,
  },
  cardImage: {
    width: 30,
    height: 30
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  marker: {
    maxWidth: 60,
    maxHeight: 60
  },
  recenter: {
    flex: 1,
    position: "absolute",
    bottom: 60,
    right: 30
  },
  ecoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ecoBuds: {
    width: 100,
    height: 100
  },
  friends: {
    borderRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 3,
    width: 30,
    height: 30
  }
});
