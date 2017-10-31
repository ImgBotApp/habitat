import React, { Component } from 'react';
import { CheckBox, FlatList, Modal, Text, TouchableHighlight, View, Button, ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Font, AppLoading} from 'expo';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TaskItem from './TaskItem.js';

class TaskModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      tasks: []
    }
    this.hideModal = this.hideModal.bind(this);
  }

  componentWillMount() {
    this.setState({
      modalVisible: this.props.modalVisible,
      tasks: this.props.tasks
    })
  }

  componentWillReceiveProps() {
    this.setState({
      modalVisible: this.props.modalVisible,
      tasks: this.props.tasks
    })
  }

  hideModal() {
    this.setState({
      modalVisible: false
    }, () => this.props.toggleHide())
  }
 
  render() {
    const { fontsAreLoaded } = this.state;
    
    return (
      <View style={{marginTop: 22, marginHorizontal: 22}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          style={{marginTop: 22, backgroundColor: 'rgba(255,255,255,0.5'}}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
         <View >
         <ScrollView 
            automaticallyAdjustContentInsets={false}
            scrollEventThrottle={200}
            style={styles.scrollView}
          >
            <List>
              <TouchableHighlight onPress={() => this.hideModal()}><Text style={{fontSize: 30, textAlign: 'right', marginTop: 5}}>&#x2612;</Text></TouchableHighlight>
              {this.state.tasks.map((task, i) => {
                return (
                  <TaskItem hideModal={this.hideModal.bind(this)} key={i} userID={this.props.userID} task={task} editTask={this.props.editTask}/>
                )
              })}
            </List>
          </ScrollView>
         </View>
        </Modal>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: 'black',
    height: 300
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
    marginBottom: 5,
  }
})
export default TaskModal;
