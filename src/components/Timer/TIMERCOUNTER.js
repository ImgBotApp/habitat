import React, { Component } from 'react';
import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Font, AppLoading} from 'expo';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';

class TimerCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      task: null
    }
  }

  componentWillMount() {
    this.setState({
      task: this.props.task
    })
  }

  hideModal() {
    this.props.toggleHide()
  }

  editTask() {
    this.props.hideModal()
    this.props.editTask(this.props.task)
  }

  deleteTask() {
    axios.delete('http://10.16.1.152:3000/deleteTask', {params: {userID: this.props.userID, taskTitle: this.state.task.Task_Title}})
    .then(() => this.setState({task: null}))
    .catch(err => console.error(err))
  }

  render() {
    const swipeBtns = [
      {
        text: 'Edit',
        backgroundColor: '#f4a316',
        underlayColor: 'rgba(0, 0, 1, 0.6)',
        onPress: () => { this.editTask() }
     },
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 1, 0.6)',
        onPress: () => { this.deleteTask() }
     }
    ];
    return (
      <View style={styles.button}>
        {this.state.task ? (
          <View style={{display: 'flex', width: 350}}>
            <Swipeout right={swipeBtns}
              autoClose={true}
              backgroundColor= 'transparent'
            >
            {!this.state.expanded ? (
              <View>
                <Text style={{fontSize: 30, alignItems: 'flex-start', justifyContent: 'flex-start'}}>{this.state.task.Task_Title}</Text>
                <Text style={{fontSize: 30}}>{this.state.task.Task_Title}</Text>
                <View style={styles.subtitleView} >
                  <Text style={styles.collapsed}>{this.state.task.Task_Description}</Text>
                  <Text onPress={() => this.setState({expanded: !this.state.expanded})} style={{fontSize: 30}}>&#x21E9;</Text>
                  <TouchableHighlight onPress={this.editTask}><Text style={{fontSize: 30}}>&#x2699;</Text></TouchableHighlight>
                </View>
              </View>
            ) : (
              <View>
                <Text style={{fontSize: 30}}>{this.props.task.Task_Title}</Text>
                <View style={styles.subtitleView}>
                  <Text style={styles.expanded}>
                    {this.state.task.Task_Description} {"\n"}
                    {this.state.task.Completion} {"\n"}
                    {this.state.task.Start} {"\n"}
                    {this.state.task.End} {"\n"}
                    {this.state.task.Frequency}
                  </Text>
                  <Text onPress={() => this.setState({expanded: !this.state.expanded})} style={{fontSize: 30}}>&#x21E7;</Text>
                  <TouchableHighlight onPress={this.hideModal}
                  onPress={this.editTask}><Text style={{fontSize: 30}}>&#x2699;</Text></TouchableHighlight>
                </View>
              </View>
            )
            }
            </Swipeout>
          </View>
        ) : (<Text>Task was deleted.</Text>)}
        <View style={styles.separator} />
      </View>
    )
  }
}

export default TimerCounter;

styles = StyleSheet.create({
  subtitleView: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    alignItems: 'center'
  },
  expanded: {
    // fontFamily: 'HelevticaNeue'
  },
  collapsed: {
    // fontFamily: 'HelevticaNeue'
  },
  separator: {
    height: 1,
    width: 400,
    backgroundColor: '#8A7D80',
    marginLeft: 15
  },
  button: {
    backgroundColor: '#ddd',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'black',
    width: 250,
    alignItems: 'center',
    marginLeft: 60,
    marginTop: 5,
    marginBottom: 5
  }
})
