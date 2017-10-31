import React, { Component } from 'react';
import MapStack from './MapStack'


export default class Map extends Component {
  render() {
    return <MapStack screenProps={this.props.screenProps}/>;
  }
}
