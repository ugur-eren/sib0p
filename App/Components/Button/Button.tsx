import React from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { TouchableRipple, Text, withTheme } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator'
import Config from '../../Includes/Config'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme

	colors?: string[]
	color?: string
	backgroundColor?: string
	containerStyle?: StyleProp<ViewStyle>
	gradientStyle?: StyleProp<ViewStyle>
	style?: StyleProp<ViewStyle>
	textContainerStyle?: StyleProp<ViewStyle>
	textStyle?: StyleProp<TextStyle>

	label: string
	loading?: boolean

	onPress?: () => void | Promise<void>
}

interface State {
	loading: boolean
}

class Button extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			loading: false,
		}
		this.mounted = true
	}

	private mounted: boolean

	componentWillUnmount() {
		this.mounted = false
	}

	onPress = async () => {
		if (this.props.loading) {
			if (!this.state.loading) {
				if (this.mounted) this.setState({ loading: true })
				await this.props.onPress()
				if (this.mounted) this.setState({ loading: false })
			}
		} else {
			await this.props.onPress()
		}
	}

	render() {
		return (
			<View style={[styles.container, this.props.containerStyle]}>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					colors={this.props.backgroundColor ? [this.props.backgroundColor, this.props.backgroundColor] : this.props.colors || this.props.theme.colors.gradient}
					style={[this.props.gradientStyle, styles.gradient]}
				>
					<TouchableRipple style={[styles.touchable, this.props.style]} onPress={this.props.onPress ? this.onPress : undefined}>
						<View style={styles.innerContainerUnusable}>
							<View style={[styles.inner, this.props.textContainerStyle]}>
								{this.props.loading ? (
									<ActivityIndicator
										animating={this.state.loading}
										size='small'
										style={styles.spinner}
										color={this.props.color || this.props.theme.colors.buttonText}
									/>
								) : (
									<></>
								)}
								<Text
									style={[
										styles.text,
										{ color: this.props.color || this.props.theme.colors.buttonText },
										this.props.loading && { left: -20 },
										this.props.textStyle,
									]}
								>
									{this.props.label}
								</Text>
							</View>
							<View style={styles.topBlock}></View>
						</View>
					</TouchableRipple>
				</LinearGradient>
			</View>
		)
	}
}

export default withTheme(Button)
