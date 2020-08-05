import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'
import Types from '../../Includes/Types/Types'

const Loader = (props: { theme: Types.Theme }) => (
	<View style={[styles.container, { backgroundColor: props.theme.colors.surface }]}>
		<Placeholder Animation={Fade} style={styles.header}>
			<PlaceholderLine height={60} />
		</Placeholder>

		<Placeholder Animation={Fade} style={styles.background}>
			<PlaceholderLine height={200} />
		</Placeholder>

		<Placeholder Animation={Fade}>
			<View style={styles.ppContainer}>
				<PlaceholderMedia isRound size={100} style={styles.pp} />
				<View style={styles.container}>
					<PlaceholderLine style={styles.unm} width={30} />
					<PlaceholderLine style={styles.unm} width={50} />
				</View>
			</View>

			<View style={styles.bio}>
				<PlaceholderLine />
				<PlaceholderLine />
			</View>
		</Placeholder>

		<Placeholder Animation={Fade}>
			<View style={styles.info}>
				<View style={styles.data}>
					<PlaceholderLine width={20} />
					<PlaceholderLine width={15} />
				</View>
				<View style={styles.data}>
					<PlaceholderLine width={20} />
					<PlaceholderLine width={15} />
				</View>
				<View style={styles.data}>
					<PlaceholderLine width={20} />
					<PlaceholderLine width={15} />
				</View>
			</View>
		</Placeholder>

		<View style={{ marginTop: 30 }} />

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
	},
	header: {
		marginBottom: -120,
	},
	background: {
		opacity: 0.3,
		marginBottom: -240,
	},
	ppContainer: {
		flexDirection: 'row',
	},
	pp: {
		marginLeft: 10,
	},
	unm: {
		top: 50,
		marginLeft: 10,
	},
	bio: {
		paddingHorizontal: 20,
		marginTop: 10,
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	data: {
		flex: 1,
		alignItems: 'center',
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
