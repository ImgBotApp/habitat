import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity, Button, Picker, ScrollView, Alert } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import TaskForm from './TaskForm.js';
import axios from 'axios';

class TaskBuilder extends Component {
  // static navigationOptions = {
  //   title: 'Add a location!',
  // };

  constructor(props) {
    super(props);
    this.state = {
      oldTitle: '',
      title: '',
      description: '',
      startTime: null,
      endTime: null,
      location: '',
      category: '',
      frequency: 'Does not repeat',
      numberRecurrences: 0,
      saved: null,
      categoryID: '',
      markerID: '',
      userID: null,
      editTask: '',
      taskID: null,
      reRender: false
    }
    this.handleTaskTitleChange = this.handleTaskTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.cancelTask = this.cancelTask.bind(this);
    this.handleMultipleTasks = this.handleMultipleTasks.bind(this);
  }

  componentDidMount() {
    this.setState({
      userID: this.props.screenProps.userID
    });
    if (this.props.navigation.state.params) {
      var task = this.props.navigation.state.params.specificTask;
      setTimeout(() => { this.setState({
        oldTitle: task.Task_Title,
        title: task.Task_Title,
        description: task.Task_Description,
        startTime: task.Start,
        endTime: task.End,
        location: task.Marker_ID,
        category: task.Category_ID,
        frequency: task.Frequency,
        taskID: task.Task_ID,
        editTask: task }) }, 200);
    }
  }

  handleTaskTitleChange(title) {
    this.setState({title})
  }

  handleDescriptionChange(description) {
    this.setState({description})
  }

  handleStartChange(startTime) {
    this.setState({startTime})
  }

  handleEndChange(endTime) {
    this.setState({endTime})
  }

  handleLocationChange(markerID, taskID) {
    this.setState({
      markerID: markerID,
      taskID: taskID
    })
  }

  handleCategoryChange(category) {
    this.setState({category})
  }

  handleFrequencyChange(frequency) {
    this.setState({frequency})
  }

  handleMultipleTasks(numberRecurrences) {
    this.setState({numberRecurrences})
  }

  saveTask() {
    let oldTitle = this.state.oldTitle;
    let title = this.state.title;
    let description = this.state.description;
    let startTime = this.state.startTime;
    let endTime = this.state.endTime;
    let markerID = this.state.markerID;
    let category = this.state.category;
    let frequency = this.state.frequency;
    let numberRecurrences = this.state.numberRecurrences;
    let userID = this.state.userID;
    let taskID = this.state.taskID;
    let readyToSend = false;

    if (
      title.length < 1 ||
      description.length < 1 ||
      startTime === null ||
      endTime === null ||
      category === ''
    ) {
      Alert.alert(
        'Oops',
        "Looks like you forgot to fill out some values!",
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
        )
    } else if (frequency !== 'Does not repeat' && numberRecurrences === 0) {
      Alert.alert(
        'Oops',
        `Looks like you didn't let us know how many times you wanted the task to reoccur.`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
      )
    } else if (frequency === 'Does not repeat' && numberRecurrences > 0) {
      Alert.alert(
        'Oops',
        `Looks like you didn't let us know how often you wanted the task to reoccur.`,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        { cancelable: false }
      )
    } else if (!this.state.editTask) {
      axios.post('http://10.16.1.152:3000/newTask', {numberRecurrences, title, description, startTime, markerID, endTime, category, frequency, userID})
        .then(res => {
          this.props.navigation.goBack();
        })
        .catch((err) => console.error('taskbuilderjs. line 82', err))
    } else {
      axios.put('http://10.16.1.152:3000/editTask', {numberRecurrences, taskID, title, description, startTime, endTime, markerID, category, frequency, userID})
      .then((res) => {
        this.props.navigation.state.params = ''
        this.props.navigation.goBack();
      })
      .catch(err => console.error(err))
    }
  }

  cancelTask() {
    this.props.navigation.state.params = ''
    this.props.navigation.goBack();
  }

  reRender() {
    this.setState({
      reRender: !this.state.reRender
    })
  }

  jankyNav() {
    this.props.navigation.state.params = ''
    this.props.navigation.navigate('DrawerToggle')
  }

  render() {
    return this.state.userID ? (
      <View style={styles.container}>
        <View style={{margin: 10, alignSelf: 'flex-start'}}>
          <Button
            onPress={() => this.jankyNav()}
            title="&#9776;"
          />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}
        >
          <TaskForm style={styles.formContainer}
            handleTaskTitleChange={this.handleTaskTitleChange}
            handleDescriptionChange={this.handleDescriptionChange}
            handleStartChange={this.handleStartChange}
            handleEndChange={this.handleEndChange}
            handleLocationChange={this.handleLocationChange.bind(this)}
            handleCategoryChange={this.handleCategoryChange}
            handleFrequencyChange={this.handleFrequencyChange}
            handleMultipleTasks={this.handleMultipleTasks}
            reRender={this.reRender.bind(this)}
            saveTask={this.saveTask}
            cancel={this.cancelTask}
            task={this.state.editTask}
            userID={this.state.userID}
            frequency={this.state.frequency}
          />
        </ScrollView>
      </View>
    ) : null
  }
}

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
  }
});

export default TaskBuilder;
