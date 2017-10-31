import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Picker } from 'react-native';
import { AuthSession } from 'expo';
import moment from 'moment';
import axios from 'axios';
import TaskFromGoogle from './TaskFromGoogle';
import config from './config';


export default class CalendarTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userID: '',
			markers: '',
			categories: '',
			receivedFromGoogle: [],
			selectedCategory: '',
			selectedMarker: 'Select location',
			tasksFromGoogle: []
    }
    this.notImport = this.notImport.bind(this);
	}

	componentDidMount() {
		let { userID, markers, categories } = this.props;
		this.setState({ userID, markers, categories })
		this.getToken();
	}

	getToken = async () => {
		console.log('calling google',config.redirect_url, config.client_id)
		await AuthSession.startAsync({
			authUrl:
			`https://accounts.google.com/o/oauth2/v2/auth` +
			`?scope=https://www.googleapis.com/auth/calendar` +
			`&response_type=token` +
			`&redirect_uri=${config.redirect_url}` +
			`&client_id=${config.client_id}`
		})
			.then(result => {
				console.log(result, 'result from google call')
				if (result.type !== 'success') {
					this.props.goBack();
				} else {
          let token = result.params.access_token;
					this.axiosCall(token);
				}
			})
			.catch(err => {
				console.log(err, ' first')
			})
	}

	axiosCall = async (token) => {
    let userID;
    let today = moment().format();
    let timeZone = today.slice(-6);
		let filtered = [];
    let beginningOfDay = `${JSON.stringify(today).slice(1, 12)}00:00:00${timeZone}`;
		let endOfDay = `${JSON.stringify(today).slice(1, 12)}23:59:59${timeZone}`;
		let minTime = new Date(beginningOfDay);
		let maxTime = new Date(endOfDay);

    var getEachCalendar = async (IDs) => {
      let id = IDs.filter(ele => {
        return ele === userID
      });
			let tasks = [];
			// IDs.map(id => {
			// Only receiving user's own calendar.
			axios({
				method: 'get',
				url: `https://www.googleapis.com/calendar/v3/calendars/${id[0]}/events`,
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					orderBy: 'startTime',
					singleEvents: true,
					timeMin: minTime,
					timeMax: maxTime
				}
			})
				.then(result => {
					if (result.data.items) {
						result.data.items.map(ele => {
							let temp = {
								title: '',
								start: '',
								end: '',
								Google: '',
								description: 'imported from Google...'
							};
							if (ele.end) {
								if (ele.end.dateTime) {
                  temp.time = ele.start.dateTime.slice(-5);
									temp.title = ele.summary;
                  temp.start = ele.start.dateTime.slice(0, 10) + ' ' + ele.start.dateTime.slice(11, 16);
                  temp.end = ele.end.dateTime.slice(0, 10) + ' ' + ele.end.dateTime.slice(11, 16);
                  temp.Google = ele.id;
									filtered.push(temp);
								}
							}
						})
					}
				this.setState({ tasksFromGoogle: filtered })
				})
			// })
		}

		var getCalendarID = async (userID) => {
			axios({
				method: 'get',
				url: `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then(result => {
          console.log(result.data, 'CALENDARS?S?')
					let temp = [];
					result.data.items.map(ele => {
						temp.push(ele.id)
					})
					// temp.shift();
					getEachCalendar(temp)
				})
				.catch(err => {
					console.log(err, 'it reached the end')
				})
		}

		axios.get(`https://www.googleapis.com/calendar/v3/users/me/calendarList/primary?access_token=${token}`)
			.then(res => {
        userID = res.data.id;
				return getCalendarID(userID);
			})
			.catch(err => {
				console.log(err, 'err close to the end')
			})
	}

	markerSelector(selectedMarkerTitle) {
		this.setState({ selectedMarker: selectedMarkerTitle })
	}

	saveAllTasks(task, index) {
		axios.post('http://10.16.1.152:3000/calendar', { tasks: this.state.tasksFromGoogle })
		.then(response => {
      this.props.goBack()
    })
  }

  notImport(index) {
    this.state.tasksFromGoogle.splice(index, 1);
    this.setState({
      tasksFromGoogle: this.state.tasksFromGoogle
    })
  }

	render() {
		return (
			<View style={{ flex: 1, width: '100%', marginTop: 50 }}>
				<View style={{ flex: 9 }}>
				{this.state.tasksFromGoogle ? this.state.tasksFromGoogle.map((task, i) => {
					return <TaskFromGoogle notImport={this.notImport} userID={this.state.userID} eachIndex={i} key={i} task={task} markers={this.state.markers} categories={this.state.categories} />
				}) : null}
				</View>
				<View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 30 }}>
					<Button onPress={() => this.saveAllTasks()} title="Save" />
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
