import React from 'react'
import { View, Dimensions } from 'react-native'
import {  withTheme } from 'react-native-paper'
import PostContent from '../PostContent/PostContent'
import PostTypes from '../../Includes/Types/PostTypes'
import Types from '../../Includes/Types/Types'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styles from './styles'

interface Props {
    theme: Types.Theme
    postData: PostTypes.PostData[]
}

interface State {
	activeSlide: number
}

class PostContainer extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			activeSlide: 0,
		}
	}

	private width = Dimensions.get('window').width
	public _carouselRef: any = null

	renderCarouselItem = ({ item }: { item: PostTypes.PostData; index: number }) => <PostContent key={item.uri} post={item} style={styles.post} />

	onCarouselSnap = (index: number) => {
		this.setState({
			activeSlide: index,
		})
	}

	render() {
        let { postData, theme } = this.props
        
		if (postData.length > 1){
            return (
                <View style={styles.carouselContainer}>
                    <Carousel
                        ref={(ref: any) => (this._carouselRef = ref)}
                        data={postData}
                        renderItem={this.renderCarouselItem}
                        sliderWidth={this.width}
                        itemWidth={this.width}
                        onSnapToItem={this.onCarouselSnap}
                        slideStyle={styles.slideStyle}
                        firstItem={0}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                    />

                    <Pagination
                        dotsLength={postData.length}
                        activeDotIndex={this.state.activeSlide}
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
                        carouselRef={this._carouselRef}
                        tappableDots={!!this._carouselRef}
                    />
                </View>
            )
        } else {
            return (
                <PostContent post={postData[0]} style={[styles.post, { height: this.width / postData[0].ratio }]} />
            )
        }
	}
}

export default withTheme(PostContainer)
