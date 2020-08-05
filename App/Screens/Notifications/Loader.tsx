import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder'
import Types from '../../Includes/Types/Types'

const Loader = (props: { theme: Types.Theme }) => (
	<View style={[styles.container, { backgroundColor: props.theme.colors.surface }]}>
		<Placeholder Animation={Fade}>
			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>

			<View style={styles.inner}>
				<PlaceholderMedia size={50} isRound />
				<View style={styles.right}>
					<PlaceholderLine width={30} />
					<PlaceholderLine />
					<PlaceholderLine width={40} />
				</View>
			</View>
		</Placeholder>
	</View>
)

export default Loader

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
    },
    inner: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 30
    },
    right: {
        flex: 1,
        marginLeft: 20
    }
})
