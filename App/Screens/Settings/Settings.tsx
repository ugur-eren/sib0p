import React from 'react'
import { View } from 'react-native'
import { List, withTheme, Menu, Text } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../Components/Header/Header'
import Types from '../../Includes/Types/Types'
import styles from './styles'
import ListMenu from './ListMenu'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

const SupportedThemes: Types.SupportedThemesObject = {
	light: 'Aydınlık',
	dark: 'Karanlık',
	timed: 'Zaman Ayarlı',
	system: 'Sistem Varsayılanı',
}

class Settings extends React.PureComponent<Props, State> {
	onThemeSelect = (key: Types.SupportedThemes) => {
		this.props.navigation.getScreenProps().setTheme(key)
	}

	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<Header title='Ayarlar' />

				<ScrollView style={styles.container}>
					<List.Section>
						<List.Item
							style={styles.clearListStyle}
							title={'Profili Düzenle'}
							left={(props) => <List.Icon {...props} style={{}} icon='edit-3' />}
							onPress={() => this.props.navigation.navigate('EditProfile')}
						/>
						<List.Item
							style={styles.clearListStyle}
							title={'Şifre Değiştir'}
							left={(props) => <List.Icon {...props} style={{}} icon='lock' />}
							onPress={() => this.props.navigation.navigate('ChangePassword')}
						/>

						<ListMenu
							title='Tema'
							iconName='moon'
							anchorTitle={SupportedThemes[this.props.navigation.getScreenProps().selectedTheme]}
							selectItem={this.onThemeSelect}
							data={SupportedThemes}
						/>
						<ListMenu
							title='Dil'
							iconName='flag'
							anchorTitle='Türkçe'
							selectItem={this.onThemeSelect}
							data={{
								turkish: 'Türkçe',
								english: 'English',
								german: 'Deutsche',
							}}
						/>
					</List.Section>
				</ScrollView>
			</View>
		)
	}
}

export default withTheme(Settings)
