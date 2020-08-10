import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'
import Types from '../../Includes/Types/Types'

const Loader = (props: { theme: Types.Theme }) => (
	<View style={[styles.container, { backgroundColor: props.theme.colors.surface }]}>
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
		
		<View style={styles.commentMarginFirst}>
			<Placeholder
				Animation={Fade}
				style={styles.paddingHorizontal}
				Left={() => <PlaceholderMedia isRound style={styles.marginRightLow} />}
				Right={() => <PlaceholderMedia isRound />}
			>
				<PlaceholderLine width={50} />
				<PlaceholderLine width={30} />
			</Placeholder>

			<Placeholder Animation={Fade} style={[styles.paddingHorizontal, styles.commentMargin]}>
				<PlaceholderLine />
				<PlaceholderLine />
			</Placeholder>

			<Placeholder Animation={Fade} style={styles.paddingHorizontal}>
				<View style={styles.buttons}>
					<View style={styles.buttonInner}>
						<PlaceholderMedia isRound style={styles.marginRightHigh} />
						<PlaceholderMedia isRound />
					</View>
				</View>
			</Placeholder>
		</View>
	</View>
)

export default Loader

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	buttons: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'center',
	},
	buttonInner: {
		flex: 1,
		flexDirection: 'row',
	},
	commentMargin: {
		marginTop: 10,
	},
	commentMarginFirst: {
		marginTop: 20
	}
})
