import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

export default class TaskFromGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      selectedMarker: 0,
      selectedCategory: 0,
      index: this.props.eachIndex,
      imported: false
    }
  }

  componentDidMount() {
    let checkExists = this.props.task;
    axios.get('http://10.16.1.152:3000/checkGoogle', { params: { task: checkExists }})
      .then(existence => {
        if (existence.data.length > 0) {
          this.setState({
            imported: true
          })
        } else {
          let { task } = this.props;
          task.Marker_ID = this.props.markers[this.state.selectedMarker].Marker_ID;    
          task.Category_ID = this.props.categories[this.state.selectedCategory].id;
          task.userID = this.props.userID;
          task.frequency = 'Does not repeat';
        }
      })
  }

  pickLocation(marker) {
    this.setState({ selectedMarker: marker })
    let { task } = this.props;
    task.Marker_ID = this.props.markers[marker].Marker_ID;
  }

  pickCategory(category) {
    this.setState({ selectedCategory: category });
    let { task } = this.props;
    task.Category_ID = this.props.categories[category].id;
  }

  notImport(index) {
    this.props.notImport(index);
  }


  render() {

    return (
      <View style={{ justifyContent: 'center', marginTop: 15, display: 'flex', alignItems: 'center' }}>
        <Text style={styles.title}>{this.props.task.title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          {this.state.imported ? (<View style={{ flex: 9, marginLeft: 10 }}><Text style={styles.imported}>Already Imported!</Text></View>) : (
            <View style={{ flex: 9, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>    
                <Picker onValueChange={(marker) => this.pickLocation(marker)} selectedValue={this.state.selectedMarker}
                  style={{ width: 100, height: 50 }} itemStyle={{ height: 50 }}>
                {this.props.markers ? this.props.markers.map((marker, i) => {
                  return <Picker.Item label={marker.Marker_Title} value={i} key={i} />
                }) : null}
                </Picker>
                <Image source={images[this.state.selectedMarker][1]} style={{ height: 35, width: 35 }} />  

                <Picker onValueChange={(category) => this.pickCategory(category)} selectedValue={this.state.selectedCategory}
                  style={{ width: 100, height: 50 }} itemStyle={{ height: 50 }}>
                  {this.props.categories ? this.props.categories.map((category, i) => {
                    return <Picker.Item label={category.Category} value={i} key={i} />
                  }) : null}
                </Picker>
                  <View style={{ backgroundColor: this.props.categories[this.state.selectedCategory].Color, margin: 10, width: 25, height: 25, borderRadius: 25}} >
                  </View>
              </View>
            </View>
          )}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
              <TouchableOpacity onPress={() => this.notImport(this.props.eachIndex)}>
                <Image source={require('../assets/cross-out.png')} style={{ height: 30, width: 30 }}/>
              </TouchableOpacity>
            </View>
          </View>
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

const styles = StyleSheet.create({
	image: {
    width: 35,
    height: 35
  },
  title: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold",
    alignSelf: 'center'
  },
  imported: {
    alignSelf: 'center',
  }
})
