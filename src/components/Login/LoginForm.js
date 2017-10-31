import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    state = {

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={this.props.handleUserInput}
          placeholder="username"
          style={styles.input} />
        <TextInput
          onChangeText={ this.props.handlePasswordInput }
          placeholder="password"
          secureTextEntry={true}
          style={styles.input} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  input: {
    height: 40,
    backgroundColor: 'grey',
    marginTop: 10,
    paddingHorizontal: 10,
    color: 'black'
  }
})

export default LoginForm;
