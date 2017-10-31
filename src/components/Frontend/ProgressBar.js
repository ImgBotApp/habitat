
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import convertDate from './convertDate'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      locations: this.props.locations,
      fill: 0
    }
    this.eachTask = this.eachTask.bind(this);
    this.calculateTime = this.calculateTime.bind(this);
    this.eachPie = this.eachPie.bind(this);
  }

  componentDidMount() {
    this.calculateTime()
  }
  componentWillReceiveProps(oldprops, newprops) {
    this.calculateTime(oldprops)
  }

  calculateTime(props) {
    props = props || this.props;
    let { Start } = props.task;
    let { End } = props.task;
    let currentTime = new Date();
    let duration = convertDate(End).getTime() - convertDate(Start).getTime();
    let timePassed = currentTime.getTime() - convertDate(Start).getTime();
    let percentage = (timePassed / duration);

    this.setState({ fill: percentage })
  }

  eachPie(percentage) {
    return <Progress.Pie style={{ alignItems: 'center', opacity: 0.3 }} progress={percentage} size={130} />
  }

  eachTask(task, index) {
    this.props.showTask(task, index)
  }

  render() {
    let catStyle = {
      width: 130,
      height: 130,
      borderRadius: 130,
      borderColor: this.props.task.Color || 'black',
      borderWidth: 3,
      marginLeft: 15,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
    }
    let clock = this.props.task.Start.split(' ')[3].split(':')[0];
    
    if (clock.split('')[0] === '0' && clock.split('')[1] !== '0') {
      clock = clock.split('')[1]
    }
  
    return (
      <TouchableHighlight style={catStyle}
        onPress={() => this.eachTask(this.props.task, this.state.locations[this.state.index].tasks[this.props.specificIndex])}>
        <View style={{ position: 'absolute' }}>
          <Image source={clocks[clock][1]} >
            {this.eachPie(this.state.fill)}
          </Image>
        </View>
      </TouchableHighlight>
    )
  }
}

const clocks = [
  [0, 'placeholder'],
  [1, require("../assets/clocks/one.png")],
  [2, require("../assets/clocks/two.png")],
  [3, require("../assets/clocks/three.png")],
  [4, require("../assets/clocks/four.png")],
  [5, require("../assets/clocks/five.png")],
  [6, require("../assets/clocks/six.png")],
  [7, require("../assets/clocks/seven.png")],
  [8, require("../assets/clocks/eight.png")],
  [9, require("../assets/clocks/nine.png")],
  [10, require("../assets/clocks/ten.png")],
  [11, require("../assets/clocks/eleven.png")],
  [12, require("../assets/clocks/twelve.png")]
]

const styels = StyleSheet.create({
  circle: {
    width: 120,
    height: 120,
    borderRadius: 120,
    //  borderColor: 'red',
    borderWidth: 0.5,
    margin: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }
})
