import React, { useState } from 'react'
import { View, Dimensions } from 'react-native'
import { useTheme } from 'react-native-paper'
import PostContent from '../PostContent/PostContent'
import PostTypes from '../../Includes/Types/PostTypes'
import Types from '../../Includes/Types/Types'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	postData: PostTypes.PostData[]
	like: () => Promise<void>
	isVisible: boolean
}

const PostContainer = (props: Props) => {
	const theme: Types.Theme = useTheme() as any
	const [activeSlide, setActiveSlide] = useState(0)

	const width = Dimensions.get('window').width
	let _carouselRef: any = null

	let { postData } = props

	const renderCarouselItem = ({ item, index }: { item: PostTypes.PostData; index: number }) => (
		<PostContent
			key={item.uri}
			post={item}
			like={props.like}
			style={styles.post}
			navigation={props.navigation}
			isVisible={props.isVisible && index === activeSlide}
		/>
	)

	const onCarouselSnap = (index: number) => {
		setActiveSlide(index)
	}

	if (postData.length > 1) {
		return (
			<View style={styles.carouselContainer}>
				<Carousel
					ref={(ref: any) => (_carouselRef = ref)}
					data={postData}
					renderItem={renderCarouselItem}
					sliderWidth={width}
					itemWidth={width}
					onSnapToItem={onCarouselSnap}
					slideStyle={styles.slideStyle}
					firstItem={0}
					inactiveSlideOpacity={1}
					inactiveSlideScale={1}
				/>

				<Pagination
					dotsLength={postData.length}
					activeDotIndex={activeSlide}
					containerStyle={[
						styles.paginationContainer,
						{
							width: 28 * postData.length,
							backgroundColor: theme.dark ? 'rgba(0, 0, 0, .5)' : 'rgba(255, 255, 255, .5)',
						},
					]}
					dotStyle={[styles.paginationDotStyle, { backgroundColor: theme.colors.main }]}
					inactiveDotStyle={[styles.inactiveDotStyle, { backgroundColor: theme.dark ? 'white' : 'black' }]}
					inactiveDotOpacity={1}
					inactiveDotScale={0.7}
					carouselRef={_carouselRef}
					tappableDots={!!_carouselRef}
				/>
			</View>
		)
	} else {
		return (
			<PostContent
				post={postData[0]}
				like={props.like}
				style={[styles.post, { height: width / postData[0].ratio }]}
				navigation={props.navigation}
				isVisible={props.isVisible}
			/>
		)
	}
}

export default React.memo(PostContainer)
