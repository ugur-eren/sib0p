import React, { RefObject } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, { Value, block, cond, eq, set, useCode } from 'react-native-reanimated'
import { PinchGestureHandler, ScrollView, State } from 'react-native-gesture-handler'
import { onGestureEvent, pinchActive, pinchBegan, timing, transformOrigin, translate, vec } from 'react-native-redash'

const { width } = Dimensions.get('window')
const SIZE = width
const styles = StyleSheet.create({
	image: {
		width: SIZE,
		height: SIZE,
		resizeMode: 'cover',
	},
})

export default () => {
    const state = new Value(State.UNDETERMINED)
	const origin = vec.createValue(0, 0)
	const pinch = vec.createValue(0, 0)
	const focal = vec.createValue(0, 0)
	const scale = new Value(1)
	// const numberOfPointers = new Value(0)
	const numberOfPointers = new Value(1)
	const pinchGestureHandler = onGestureEvent({
		numberOfPointers,
		scale,
		state,
		focalX: focal.x,
		focalY: focal.y,
	})

	const zIndex = cond(eq(state, State.ACTIVE), 3, 0)
	const adjustedFocal = vec.add(
		{
			x: -SIZE / 2,
			y: -SIZE / 2,
		},
		focal
	)
	useCode(
		() =>
			block([
				cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
				cond(pinchActive(state, numberOfPointers), vec.set(pinch, vec.minus(vec.sub(origin, adjustedFocal)))),
				cond(eq(state, State.END), [
					set(pinch.x, timing({ from: pinch.x, to: 0 })),
					set(pinch.y, timing({ from: pinch.y, to: 0 })),
					set(scale, timing({ from: scale, to: 1 })),
				]),
			]),
		[adjustedFocal, numberOfPointers, origin, pinch, scale, state]
	)

	return (
		<PinchGestureHandler {...pinchGestureHandler}>
			<Animated.View style={{ width: SIZE, height: SIZE }}>
				<Animated.Image
					style={[
						styles.image,
						{
							transform: [
                                ...translate(pinch),
                                ...transformOrigin(origin, { scale }),
                            ],
						},
					]}
					source={{ uri: 'https://sib0p.com/inc/imgs/posts/1595446707-947-19-0.jpg' }}
				/>
			</Animated.View>
		</PinchGestureHandler>
	)
}
