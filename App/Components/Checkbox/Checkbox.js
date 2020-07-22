import React from 'react'
import { View } from 'react-native'
import { Text, TouchableRipple } from 'react-native-paper'

import Icons from '../../../Includes/Icons'
import Colors from '../../../Includes/Colors'

import styles from './styles'


export default class Login extends React.PureComponent {
	render(){
		let { style, containerStyle, topLevelContainerStyle, onChange, text, innerStyle, checked, size, ...touchableProps } = this.props
		return (
			<View style={[styles.topLevelContainer, this.props.topLevelContainerStyle]}>
				<TouchableRipple
					style={[
						styles.container,
						this.props.containerStyle,
						this.props.text ? {flex: 1} : this.props.size ? {width: this.props.size + 10, height: this.props.size + 10} : {width: 30, height: 30}
					]}
					rippleColor={Colors.primary200}
					onPress={this.props.onChange}

					{...touchableProps}
				>
					<View
						style={[
							styles.inner,
							this.props.innerStyle
						]}
					>
						<View style={[
							styles.checkBox,
							this.props.size && {width: this.props.size - 1, height: this.props.size - 1},
							!this.props.checked && {backgroundColor: Colors.primary300},
							this.props.style
						]}>
							<Icons name="checkmark" color="white" size={this.props.checked ? (this.props.size ? this.props.size * 0.7 : 14) : 0} />
						</View>

						{this.props.text && <Text style={{flex: 1, flexWrap: 'wrap', marginLeft: 10}}>{this.props.text}</Text>}
					</View>
				</TouchableRipple>
			</View>
		)
	}
}