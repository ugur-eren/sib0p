import React, { RefObject } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, { Value, block, cond, eq, set, useCode } from 'react-native-reanimated'
import { PinchGestureHandler, ScrollView, State } from 'react-native-gesture-handler'
import { onGestureEvent, pinchActive, pinchBegan, timing, transformOrigin, translate, vec } from 'react-native-redash'
import Image from './Image'

const { width } = Dimensions.get('window')
const SIZE = width
const styles = StyleSheet.create({
})

let items = ['', '', '', '', '', '']

export default () => {

	return (
		<ScrollView>
			{items.map((item) => (
				<View style={{marginBottom: 30}}>
					<Image />
				</View>
			))}
		</ScrollView>
	)
}
