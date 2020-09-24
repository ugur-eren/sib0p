import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'
import Types from '../../Includes/Types/Types'

const Loader = (props: { theme: Types.Theme }) => (
	<View style={[styles.container, { backgroundColor: props.theme.colors.surface }]}>
		<Placeholder
			Animation={Fade}
			style={styles.paddingHorizontal}
			Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
			Right={() => <PlaceholderMedia isRound />}
		>
			<PlaceholderLine width={50} />
			<PlaceholderLine width={30} />
		</Placeholder>
		<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
			<PlaceholderLine />
			<PlaceholderMedia style={styles.image} />
		</Placeholder>
		<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
			<View style={styles.buttons}>
				<View style={styles.buttonInner}>
					<PlaceholderMedia isRound style={styles.marginRightHigh} />
					<PlaceholderMedia isRound />
				</View>
				<PlaceholderLine width={30} />
			</View>
		</Placeholder>

		<View style={styles.divider} />

		<Placeholder
			Animation={Fade}
			style={styles.paddingHorizontal}
			Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
			Right={() => <PlaceholderMedia isRound />}
		>
			<PlaceholderLine width={50} />
			<PlaceholderLine width={30} />
		</Placeholder>
		<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
			<PlaceholderLine />
			<PlaceholderMedia style={styles.image} />
		</Placeholder>
		<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
			<View style={styles.buttons}>
				<View style={styles.buttonInner}>
					<PlaceholderMedia isRound style={styles.marginRightHigh} />
					<PlaceholderMedia isRound />
				</View>
				<PlaceholderLine width={30} />
			</View>
		</Placeholder>
	</View>
)

export default Loader

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10
	},
	header: {
		marginBottom: -30,
	},
	paddingHorizontal: {
		paddingHorizontal: 20,
	},
	marginRightLow: {
		marginRight: 10,
	},
	marginRightHigh: {
		marginRight: 20,
	},
	image: {
		width: '100%',
		height: 250,
	},
	buttons: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'center',
	},
	buttonInner: {
		flex: 1,
		flexDirection: 'row',
	},
	divider: {
		marginTop: 50,
	},
})
