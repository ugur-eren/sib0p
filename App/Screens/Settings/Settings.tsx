import React from 'react'
import { View } from 'react-native'
import { List, withTheme } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../Components/Header/Header'
import Types from '../../Includes/Types/Types'
import styles from './styles'

interface Props {
	navigation: Types.Navigation
	theme: Types.Theme
}

interface State {}

class Settings extends React.PureComponent<Props, State> {
	render() {
		return (
			<View style={[styles.container, { backgroundColor: this.props.theme.colors.background }]}>
				<Header title='Ayarlar' />

				<ScrollView style={styles.container}>
					<List.Section>
						<List.Item
							style={styles.clearListStyle}
							title={"Profili Düzenle"}
							left={(props) => <List.Icon {...props} style={{}} icon='edit-3' />}
							onPress={() => this.props.navigation.navigate('EditProfile')}
						/>
                        <List.Item
							style={styles.clearListStyle}
							title={"Şifre Değiştir"}
							left={(props) => <List.Icon {...props} style={{}} icon='lock' />}
							onPress={() => this.props.navigation.navigate('ChangePassword')}
						/>
                        
					</List.Section>
				</ScrollView>
			</View>
		)
	}
}

export default withTheme(Settings)
