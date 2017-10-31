import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, Alert } from 'react-native';
import { SignedOut, SignedIn, createRootNavigator } from "./src/components/router.js"
import { getUserInfo, isSignedIn } from './src/components/auth.js'
import Login from './src/components/Login/Login.js';
import Signup from './src/components/Login/Signup.js';
import Expo from 'expo';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      currentLocation: {},
      fbPic: null,
      giftPoints: 0
    }
  }

  handleLogIn = (user, fbPic) => {
    this.setState({
      user: user,
      fbPic: fbPic
    })
  }

  handleLogout = () => {
    this.setState({
      user: null
    })
  }

  componentDidMount() {
    this.checkAsyncStorage().then(token => {
      axios.get(`http://10.16.1.152:3000/token`, {
        params: {
          token: token
        }
      })
      .then(user => {
        if(user.data[0]) {
          this.setState({
            user: user.data[0].ID,
            giftPoints: user.data[0].Gift_Points,
          }, () => {console.log('in app at auto login', this.state)})
        }
      })
      .catch(err => console.error(err))
    });
  }

  checkAsyncStorage = async () => {
    const tokenInPhone = await AsyncStorage.getItem(`user_token`)
    return tokenInPhone;
  }

  render() {
    if (this.state.user !== null) {
      return <SignedIn screenProps={{
        userID: this.state.user,
        giftPoints: this.state.giftPoints,
        handleLogout: this.handleLogout,
        fbPic: this.state.fbPic
      }}/>
    } else {
      return <SignedOut screenProps={{
        handleLogIn: this.handleLogIn
      }}/>
    }
  }
}
