import React, {Component} from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'

class InputButton extends Component{
	render() {
		return (
			<TouchableOpacity style = {[styles.inputButton, this.props.highlight ? styles.highlighted : null]}
				underlayColor = '#193441'
				onPress = {this.props.onPress}>
				<Text style={styles.inputButtonText}>{this.props.value}</Text>
			</TouchableOpacity>
		);
	}
}

export default InputButton;

const styles = StyleSheet.create({
	inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D'
    },

    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    },
    highlighted:{
    	backgroundColor:'#193441'
    }
})