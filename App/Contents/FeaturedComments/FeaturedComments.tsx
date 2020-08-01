import React from 'react'
import { View } from 'react-native'
import { withTheme } from 'react-native-paper'
import FeaturedComment from './FeaturedComment'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import styles from './styles'

interface Props {
	theme: Types.Theme
	comments: CommentTypes.Comment[]
}

class FeaturedComments extends React.PureComponent<Props> {
	_renderComment = (comment: CommentTypes.Comment) => <FeaturedComment key={comment.id} comment={comment} />

	render() {
		return <View style={styles.commentsInner}>{this.props.comments.map(this._renderComment)}</View>
	}
}

export default withTheme(FeaturedComments)
