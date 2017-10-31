import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button } from 'react-native';
import axios from 'axios';

class LocationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      newLocation: '',
      location: 'Attach a Location',
      created: '',
      MarkerID: '',
      isEdit: false
    }

    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
    axios.get('http://10.16.1.152:3000/markers', {params: {userID: this.props.userID}})
      .then((response) => {
        let markers = response.data;
        this.setState({markers});
        this.props.handleSelect(markers[0].Marker_ID);
      })
      .catch((err) => {console.error('locationpickers', err)})
  }

  changeLocation(markerID) {
    this.props.handleSelect(markerID, this.state.taskID);
    this.setState({
      location: markerID
    })
  }

  componentWillReceiveProps(oldone, newone){
    if (oldone.task.Marker_ID && !this.state.isEdit) {
      this.setState({
        location: oldone.task.Marker_ID,
        isEdit: true,
        taskID: oldone.task.Task_ID
      })
      setTimeout(() => {this.changeLocation(oldone.task.Marker_ID)}, 2000)
    }
  }

  render() {
    return(
        <Picker
          style={styles.onePicker} itemStyle={styles.onePickerItem}
          selectedValue={this.state.location}
          onValueChange={(location) => this.changeLocation(location)}
        >
        {this.state.markers ?
          this.state.markers.map((location, i) => {
            return (
              <Picker.Item key={i} label={location.Marker_Title} value={location.Marker_ID} />
            )
          }) : ''
        }
        </Picker>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    height: 30,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#8A7D80',
    borderColor: '#8A7D80',
    borderWidth: 1
  },
  picker: {
    width: 200,
  },
  pickerItem: {
    color: '#8A7D80'
  },
  onePicker: {
    width: 200,
    height: 88,
  },
  onePickerItem: {
    height: 88,
    color: '#8A7D80'
  },
});

export default LocationPicker;
