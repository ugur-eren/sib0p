import React from 'react'
import { View, Platform } from 'react-native'
import { List, withTheme, Menu, Text, Portal, Dialog, Paragraph, Button, Switch } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../Components/Header/Header'
import Types from '../../Includes/Types/Types'
import styles from './styles'
import ListMenu from './ListMenu'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {
	logoutDialog: boolean
	logoutLoading: boolean
}

class Settings extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			logoutDialog: false,
			logoutLoading: false,
		}
	}

	onThemeSelect = (key: Types.SupportedThemes) => {
		this.props.navigation.getScreenProps().setTheme(key)
	}

	hideLogoutDialog = () => {
		this.setState({ logoutDialog: false })
	}
	showLogoutDialog = () => {
		this.setState({ logoutDialog: true })
	}

	logout = async () => {
		this.setState({ logoutLoading: true }, async () => {
			await this.props.navigation.getScreenProps().logout()
			this.setState({ logoutLoading: false, logoutDialog: false })
		})
	}

	toggleNotification = () => {
		let screen = this.props.navigation.getScreenProps()
		screen.setNotification(!screen.notification)
	}

	render() {
		let { theme } = this.props
		let screen = this.props.navigation.getScreenProps()

		const SupportedThemes: Types.SupportedThemesObject = {
			light: screen.language.theme_light,
			dark: screen.language.theme_dark,
			timed: screen.language.theme_timed,
			system: screen.language.theme_system,
		}

		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<Header title='Ayarlar' />

				<ScrollView style={styles.container}>
					<List.Section>
						<List.Item
							style={styles.clearListStyle}
							title={screen.language.edit_profile}
							left={(props) => <List.Icon {...props} style={{}} icon='edit-3' />}
							onPress={() => this.props.navigation.navigate('EditProfile')}
						/>
						<List.Item
							style={styles.clearListStyle}
							title={screen.language.change_password}
							left={(props) => <List.Icon {...props} style={{}} icon='lock' />}
							onPress={() => this.props.navigation.navigate('ChangePassword')}
						/>

						<ListMenu
							title={screen.language.theme}
							iconName='moon'
							anchorTitle={SupportedThemes[this.props.navigation.getScreenProps().selectedTheme]}
							selectItem={this.onThemeSelect}
							data={SupportedThemes}
						/>

						<List.Item
							style={styles.clearListStyle}
							title={screen.language.notifications}
							left={(props) => <List.Icon {...props} style={{}} icon='bell' />}
							onPress={() => this.props.navigation.navigate('ChangePassword')}
							right={() => (
								<Switch
									value={this.props.navigation.getScreenProps().notification}
									style={Platform.OS == 'ios' && { marginRight: 20 }}
									onValueChange={this.toggleNotification}
									color={theme.colors.main}
								/>
							)}
						/>

						<List.Item
							style={styles.clearListStyle}
							title={screen.language.blocked_users}
							left={(props) => <List.Icon {...props} style={{}} icon='alert-octagon' />}
							onPress={() => this.props.navigation.navigate('BlockedUsers')}
						/>

						<List.Item
							style={styles.clearListStyle}
							title={screen.language.logout}
							left={(props) => <List.Icon {...props} style={{}} icon='log-out' />}
							onPress={this.showLogoutDialog}
						/>
					</List.Section>
				</ScrollView>

				<Portal>
					<Dialog visible={this.state.logoutDialog} onDismiss={this.hideLogoutDialog}>
						<Dialog.Title>{screen.language.logout}</Dialog.Title>
						<Dialog.Content>
							<Paragraph>{screen.language.logout_dialog}</Paragraph>
						</Dialog.Content>
						<Dialog.Actions>
							<Button
								onPress={this.state.logoutLoading ? undefined : this.logout}
								color={theme.colors.main}
								loading={this.state.logoutLoading}
								style={{ marginRight: 15 }}
							>
								{screen.language.logout}
							</Button>
							<Button onPress={this.hideLogoutDialog} color={theme.colors.contrast}>
								{screen.language.cancel}
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		)
	}
}

export default withTheme(Settings)
