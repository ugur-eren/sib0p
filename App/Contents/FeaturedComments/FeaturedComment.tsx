import React from 'react'
import { View } from 'react-native'
import { Text, withTheme } from 'react-native-paper'
import Types from '../../Includes/Types/Types'
import CommentTypes from '../../Includes/Types/CommentTypes'
import styles from './styles'

interface Props {
    theme: Types.Theme
    comment: CommentTypes.Comment
}

class FeaturedComment extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.comment}>
                <Text style={styles.commentAuthor}>{this.props.comment.user.username}</Text>
                <Text style={styles.commentText} numberOfLines={1}>
                    {this.props.comment.content}
                </Text>
            </View>
        )
    }
}

export default withTheme(FeaturedComment)