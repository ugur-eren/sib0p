import React from 'react'
import { Dimensions, View, SafeAreaView, ViewBase } from 'react-native'
import { withTheme } from 'react-native-paper'
import { Bar as ProgressBar } from 'react-native-progress'
import Types from './Types/Types'

interface Props {
	theme: Types.Theme
	sharePost: (props: any) => void
}

interface State {
	active: boolean
	progress: number
}

class PostSharer extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			active: false,
			progress: 10,
		}

		props.sharePost({
			sharePost: this.sharePost,
		})
	}

	sharePost = (message: string, tags: string[], images: []) => {
		console.log('activated')
		this.setState({ active: true })
	}

	render() {
		let { theme } = this.props

		if (this.state.active) {
			return (
				<SafeAreaView style={{backgroundColor: theme.colors.primary}}>
					<View style={{ width: '100%', height: 8, borderTopWidth: 1, borderBottomWidth: 1, borderColor: theme.colors.main }}>
						<View style={{ height: '100%', width: '10%', backgroundColor: theme.colors.main }}></View>
					</View>
				</SafeAreaView>
			)
		} else {
			return <></>
		}
	}
}

export default withTheme(PostSharer)
