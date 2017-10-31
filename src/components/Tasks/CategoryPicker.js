import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Picker, Button, TouchableHighlight } from 'react-native';
import axios from 'axios';
import ColorPicker from './ColorPicker.js';

class CategoryPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			newCategory: '',
			category: 'Attach a Category',
			newCategory: '',
			created: '',
			userID: '',
			categoryID: '',
			isEdit: false,
			color: null,
			readyToRender: false
		}
		this.newCategory = this.newCategory.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.selectColor = this.selectColor.bind(this);
	}

  componentWillMount() {
		this.grabCategories()
  }

	grabCategories(specific) {
		axios.get('http://10.16.1.152:3000/categories', {params: {userID: this.props.userID}})
			.then((response) => {
				let categories = response.data;
				this.setState({
					categories: categories
				})
				if (!this.state.isEdit && categories.length > 0) {
					this.setState({
						category: categories[0].ID
					})
					this.changeCategory(categories[0].ID)
				}
				if (specific) {
					for(let i = 0; i < categories.length; i++) {
						if (categories[i].Category === specific) {
							this.setState({
								category: categories[i].ID
							})
							this.changeCategory(categories[i].ID);
						}
						break;
					}
				}
			})
			.catch((err) => {console.error(err)})
	}

	componentWillReceiveProps(oldone) {
    if (oldone.task.Category_ID && !this.state.isEdit) {
      this.setState({
        category: oldone.task.Category_ID,
        isEdit: true
      })
    }
	}

	changeCategory(category) {
		// THIS CATEGORY REFERS TO THE ID
		this.setState({category})
		this.props.onSelect(category);
		this.currentColor(category)
	}

	currentColor(category) {
		// THIS CATEGORY REFERS TO THE ID
		for (let i = 0; i < this.state.categories.length; i++) {
			if (this.state.categories[i].ID === category) {
				this.props.currentColor(this.state.categories[i].Color)
			}
		}
	}

	addCategory(newCategory) {
		this.setState({
			newCategory: newCategory
		})
	}

	selectColor(color) {
		this.setState({color});
	}

  newCategory() {
    let category = this.state.newCategory;
		let color = this.state.color;
		if (category.length > 1) {
			axios.post('http://10.16.1.152:3000/categories', {category, color, userID: this.props.userID})
			.then(response => {
				this.grabCategories(category)
				this.setState({ newCategory: '' })
			})
			.catch((err) => {
				console.error(err)
			})
		}
	}


	render() {
		return(
			<View style={StyleSheet.picker}>
				<Picker
					style={[styles.onePicker]} itemStyle={styles.onePickerItem}
					selectedValue={this.state.category}
					onValueChange={value => this.changeCategory(value)}
				>
			 	{this.state.categories ?
						this.state.categories.map((category, i) => {
							return (
								<Picker.Item key={i} style={{backgroundColor: 'red'}} label={category.Category} value={category.ID} />
							)
						}) : ''
				}
				</Picker>
				{this.state.color ? <TouchableHighlight style={{backgroundColor: this.state.color, margin: 10, width: 30, height: 30, borderRadius: 30}}><View></View></TouchableHighlight> : null}
				<TextInput
					onChangeText={this.addCategory.bind(this)}
					value={this.state.newCategory}
					placeholder="Create a new category"
				/>
				<ColorPicker
					selectColor={this.selectColor} color={this.state.color} userID={this.props.userID} usedColors={this.state.categories}
				/>
				<Button
					onPress={this.newCategory}
					title="Save Category"
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	input: {
		height: 30,
		marginTop: 10,
		paddingHorizontal: 10,
		color: '#8A7D80',
		borderColor: '#8A7D80',
		borderWidth: 1
	},
	picker: {
		width: 200,
	},
	pickerItem: {
		color: '#8A7D80'
	},
	onePicker: {
		width: 200,
		height: 88,
	},
	onePickerItem: {
		height: 88,
		color: '#8A7D80'
	}
});

export default CategoryPicker;
