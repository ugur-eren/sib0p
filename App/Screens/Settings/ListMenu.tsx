import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text, List, Menu, withTheme } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	theme: Types.Theme
	title: string
	iconName: string
	anchorTitle: string
	data: { [key: string]: string }
	selectItem: (key: string) => any
}

interface State {
	isMenuActive: boolean
}

class ListMenu extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			isMenuActive: false,
		}
	}

	showMenu = () => {
		this.setState({ isMenuActive: true })
	}
	hideMenu = () => {
		this.setState({ isMenuActive: false })
	}
	selectItem = (key: string) => {
		this.hideMenu()
		this.props.selectItem(key)
	}

	_renderIcon = (props: { color: string; style: { marginLeft: number; marginRight: number; marginVertical?: number } }) => (
		<List.Icon {...props} style={styles.listIcon} icon={this.props.iconName} />
	)

	_renderMenu = () => (
		<Menu
			visible={this.state.isMenuActive}
			onDismiss={this.hideMenu}
			anchor={
				<TouchableOpacity onPress={this.showMenu} style={styles.anchorTouchable}>
					<>
						<Text style={styles.anchorTitle}>{this.props.anchorTitle}</Text>
						<Feather name='chevron-down' size={20} color={this.props.theme.colors.contrast} />
					</>
				</TouchableOpacity>
			}
		>
			{Object.keys(this.props.data).map((option) => this._renderMenuItem({ title: this.props.data[option], key: option }))}
		</Menu>
	)

	_renderMenuItem = ({ title, key }: { title: string; key: string }) => {
		let selectItem = () => {
			this.selectItem(key)
		}
		return <Menu.Item key={key} onPress={selectItem} title={title} />
	}

	render() {
		return <List.Item style={[styles.clearListMenuStyle]} left={this._renderIcon} title={this.props.title} onPress={this.showMenu} right={this._renderMenu} />
	}
}

export default withTheme(ListMenu)
