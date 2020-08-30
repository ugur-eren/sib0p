import React from 'react'
import { Animated, Easing } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import styles from './styles'
import Types from '../../Includes/Types/Types'
import { withTheme } from 'react-native-paper'

interface Props {
	theme: Types.Theme
	likeRef: (ref: { onPress: () => void }) => void
	like: () => any
}

let doublePress: any = false
const AnimatedFeather = Animated.createAnimatedComponent(Feather)

class DoubleLike extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props)

		props.likeRef({ onPress: this.onPress })
	}

	private likeAnim = new Animated.Value(0)

	onPress = () => {
		if (doublePress) {
			this.props.like()
			doublePress = false
			Animated.timing(this.likeAnim, {
				useNativeDriver: true,
				toValue: 1,
				duration: 500,
				easing: Easing.elastic(1.2),
			}).start((end) => {
				if (end) {
					Animated.timing(this.likeAnim, {
						useNativeDriver: true,
						toValue: 0,
						duration: 250,
						easing: Easing.elastic(1.2),
					}).start()
				}
			})
		} else {
			doublePress = true
			setTimeout(() => {
				doublePress = false
			}, 300)
		}
	}

	render() {
		let { theme } = this.props

		return (
			<Animated.View
				style={[
					styles.likeAnim,
					{
						opacity: this.likeAnim,
						backgroundColor: 'rgba(' + theme.colors.surfaceRgb + ', .75)',
					},
				]}
			>
				<AnimatedFeather
					name='thumbs-up'
					size={64}
					color={theme.colors.success}
					style={{
						transform: [
							{
								rotate: this.likeAnim.interpolate({
									inputRange: [0, 1],
									outputRange: ['180deg', '0deg'],
								}),
							},
							{ scale: this.likeAnim },
						],
					}}
				/>
			</Animated.View>
		)
	}
}

export default withTheme(DoubleLike)
