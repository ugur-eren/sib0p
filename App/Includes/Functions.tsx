import React from 'react'
import { Text } from 'react-native-paper'
import Config from './Config'
import Types from './Types/Types'

export default new (class Functions {
	convertTime = (time: number, currentTime: number): string => {
		let past = currentTime - time
		if (past < 10) {
			return 'Biraz önce'
		}
		if (past < 60) {
			return past + ' saniye önce'
		}
		if (Math.floor(past / 60) < 60) {
			return Math.floor(past / 60) + ' dakika önce'
		}
		if (Math.floor(past / 3600) < 24) {
			return Math.floor(past / 3600) + ' saat önce'
		}
		if (Math.floor(past / 86400) < 7) {
			return Math.floor(past / 86400) + ' gün önce'
		}
		if (Math.floor(past / 86400) < 31) {
			return Math.floor(past / 604800) + ' hafta önce'
		}
		if (Math.floor(past / 2592000) < 12) {
			return Math.floor(past / 2592000) + ' ay önce'
		}
		return Math.floor(past / 31104000) + ' yıl önce'
	}

	checkEmail = (value: string): boolean => {
		let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g
		return value.match(regex) !== null
	}

	replaceUserTagWithPage = (text: string, navigation?: Types.Navigation) => {
		let regex = /(\[correct:@[a-zA-Z0-9_.-]+\])/g
		let parts: any[] = text.split(regex)

		for (var i = 1; i < parts.length; i += 2) {
			let username = parts[i].replace('[correct:@', '').replace(']', '')
			parts[i] = (
				<Text key={i} style={{ fontFamily: Config.fonts.semi }} onPress={!navigation ? undefined : () => navigation.navigate('UserProfile', { username: username })}>
					@{username}
				</Text>
			)
		}
		return parts
	}
})()
