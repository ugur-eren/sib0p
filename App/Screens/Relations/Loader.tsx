import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'
import Types from '../../Includes/Types/Types'

const Loader = (props: { theme: Types.Theme }) => (
	<View style={[styles.container, { backgroundColor: props.theme.colors.surface }]}>
		<Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>

        <Placeholder Animation={Fade} style={styles.item}>
			<View style={styles.content}>
				<PlaceholderMedia isRound size={60} />
				<View style={styles.detail}>
					<PlaceholderLine />
					<PlaceholderLine />
				</View>
				<View style={styles.action}>
					<PlaceholderLine />
				</View>
			</View>
		</Placeholder>
	</View>
)

export default Loader

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		padding: 10,
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	detail: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 10,
		paddingLeft: 20,
	},
	action: {
		width: 50,
		paddingTop: 10,
		marginLeft: 10,
	},
})
