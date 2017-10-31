import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button, TouchableHighlight, Text } from 'react-native';
import TaskDatePicker from './DatePicker.js';
import LocationPicker from './LocationPicker.js';
import CategoryPicker from './CategoryPicker.js';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: 'Does not repeat.',
      taskName: null,
      description: null,
      start: null,
      end: null,
      readyToRender: false,
      currentColor: '#ffffff'
    }
  }

  componentWillUnmount() {
    this.props.tasks = "";
  }

  componentWillMount() {
    this.setState({
      userID: this.props.userID
    })
  }

  componentWillReceiveProps(oldone, newone) {
    this.setState({ frequency: oldone.task.Frequency })
  }

  renderReady() {
    this.setState({readyToRender: true})
  }

  currentColor(currentColor) {
    this.setState({currentColor})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(title) => this.props.handleTaskTitleChange(title)}
          placeholder={this.props.task.Task_Title ? this.props.task.Task_Title : "Name of Task"}
          style={styles.input}
        />
        <TextInput
          onChangeText={(description) => this.props.handleDescriptionChange(description)}
          placeholder={this.props.task.Task_Description ? this.props.task.Task_Description :"Description"}
          style={styles.input}
        />
        <TaskDatePicker placeholder={this.props.task.Start ? this.props.task.Start : "Start"} onSelect={(startTime) => this.props.handleStartChange(startTime)} />
        <TaskDatePicker placeholder={this.props.task.End ? this.props.task.End : "End"} onSelect={(endTime) => this.props.handleEndChange(endTime)} />
        <LocationPicker style={styles.picker} task={this.props.task} handleSelect={this.props.handleLocationChange} userID={this.state.userID}/>
        <View style={{backgroundColor: this.state.currentColor, margin: 10, width: 25, height: 25, borderRadius: 25, position: 'absolute', left:200, top: 270}}/>
        <CategoryPicker style={styles.picker} task={this.props.task} onSelect={this.props.handleCategoryChange} userID={this.state.userID} reRender={this.props.reRender} renderReady={this.renderReady.bind(this)} currentColor={this.currentColor.bind(this)}/>
        <Picker
          style={[styles.onePicker]} itemStyle={styles.onePickerItem}
          selectedValue={this.props.frequency}
          onValueChange={(itemValue) =>  this.props.handleFrequencyChange(itemValue)}
        >
          <Picker.Item label="Does not repeat" value="no-repeat" />
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" /> 
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
        <TextInput 
          onChangeText={(multiples) => {this.props.handleMultipleTasks(multiples)}}
          placeholder='Number of reoccurrences?'
          style={styles.input}
          keyboardType='numeric'/>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableHighlight onPress={() => {this.props.saveTask()}}><Text style={{fontSize: 30, textAlign: 'right'}}>&#x2714;</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => {this.props.cancel()}}><Text style={{fontSize: 30, textAlign: 'right'}}>&#x274c;</Text></TouchableHighlight>
        </View>
      </View>
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
  }
});

export default TaskForm;
