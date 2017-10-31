import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

class TaskLimiter extends Component {
  constructor(props){
    super(props)
    this.state = {date: null}
    this.showDateSelected = this.showDateSelected.bind(this);
  }

  showDateSelected(date) {
    this.setState({
      date
    }, () => {
      this.props.onSelect(this.state.date);
    });
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="datetime"
        placeholder={this.props.placeholder}
        format="MMMM Do YYYY, h:mm a"
        minuteInterval = {30}
        minDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginTop: 10,
            marginBottom: 5,
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.showDateSelected(date)}}
      />
    )
  }
}


export default TaskLimiter;
