import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FirstScreen extends React.Component {
	static navigationOptions = {
	    // drawerLabel: 'Home',
	    drawerIcon: ({ tintColor }) => (
	      <Image
	        source={require('./Images/toast.png')} style={{width: 70, height: 70, marginLeft: 40}}
	        // style={[styles.icon, {tintColor: tintColor}]}
	      />
	    ),
	  };

	render(){
		const { navigate } = this.props.navigation;
		return(
			<View style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
				}
			}>
			<Button onPress={() => navigate('Map')}
				title="Go to map"
			/>
		</View>
		)
	}
}
