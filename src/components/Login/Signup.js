import React, { Component } from 'react';
import{ StyleSheet, View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import SignupForm from './SignupForm';
import { onSignIn } from '../auth.js';
import axios from 'axios';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    }
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handleSignup() {
    axios.post(`http://10.16.1.152:3000/signup`, {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    })
    .then((userData) => {
      this.props.screenProps.handleLogIn(userData.data.userID);
      AsyncStorage.setItem(`user_token`, userData.data.token);
    })
    .catch((err) => {
      console.error('error in handleSignup', err);
    })
  }

  handleUserInput(event) {
    this.setState({ username: event })
  }
  handlePasswordInput(event) {
    this.setState({ password: event})
  }
  handleEmailInput(event) {
    this.setState({ email: event})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/toastlogo.png")}
          />
          <Text>Do you want to start building good Habits?</Text>
        </View>
        <View style={styles.formContainer}>
          <SignupForm
            handleSubmit={this.handleSubmit}
            handleUserInput={this.handleUserInput}
            handlePasswordInput={this.handlePasswordInput}
            handleEmailInput={this.handleEmailInput}
            />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.handleSignup()
          }}
          style={styles.buttonContainer}
          >
          <Text style={styles.buttonText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    paddingHorizontal: 10
  }
});
