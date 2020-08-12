import React from 'react'
import { Text } from 'react-native-paper'
import Config from './Config'
import Types from './Types/Types'
import Spotify from '../Contents/Embeds/Spotify'
import Youtube from '../Contents/Embeds/Youtube'

export default new (class Functions {
	convertTime = (time: number, currentTime: number, language: Types.Language): string => {
		let past = currentTime - time
		if (past < 10) {
			return language.just_now
		}
		if (past < 60) {
			return past + language.seconds_ago
		}
		if (Math.floor(past / 60) < 60) {
			return Math.floor(past / 60) + language.minutes_ago
		}
		if (Math.floor(past / 3600) < 24) {
			return Math.floor(past / 3600) + language.hours_ago
		}
		if (Math.floor(past / 86400) < 7) {
			return Math.floor(past / 86400) + language.days_ago
		}
		if (Math.floor(past / 86400) < 31) {
			return Math.floor(past / 604800) + language.weeks_ago
		}
		if (Math.floor(past / 2592000) < 12) {
			return Math.floor(past / 2592000) + language.months_ago
		}
		return Math.floor(past / 31104000) + language.years_ago
	}

	checkEmail = (value: string): boolean => {
		let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/g
		return value.match(regex) !== null
	}

	replaceTags = (text: string, navigation?: Types.Navigation, isComment?: boolean) => {
		let regex = /(\[correct:@[a-zA-Z0-9_.-]+\])/g
		let parts: any[] = text.split(regex)

		for (var i = 0; i < parts.length; i++) {
			if (i % 2 == 1) {
				let username = parts[i].replace('[correct:@', '').replace(']', '')
				parts[i] = (
					<Text
						key={parts[i] + i}
						style={{ fontFamily: Config.fonts.semi }}
						onPress={!navigation ? undefined : () => navigation.push('UserProfile', { username: username })}
					>
						@{username}
					</Text>
				)
			} else {
				parts[i] = this.replaceTagWithYoutubeEmbed(parts[i], !!navigation, isComment)
			}
		}
		return parts
	}

	replaceTagWithYoutubeEmbed = (text: any, isSmall?: boolean, isComment?: boolean) => {
		let regex = /(\%sib\[youtube:[a-zA-Z0-9_-]+\]0p%)/g
		let parts: any[] = text.split(regex)

		for (var i = 0; i < parts.length; i++) {
			if (i % 2 == 1) {
				let embedId = parts[i].replace('%sib[youtube:', '').replace(']0p%', '')
				parts[i] = isSmall ? <Youtube key={parts[i] + i} embedId={embedId} isComment={isComment} /> : 'https://youtu.be/' + embedId
			} else {
				parts[i] = this.replaceTagWithSpotifyEmbed(parts[i], isSmall)
			}
		}
		return parts
	}

	replaceTagWithSpotifyEmbed = (text: any, isSmall?: boolean) => {
		let regex = /(\%sib\[spotify:[a-zA-Z0-9]+\]0p%)/g
		let parts: any[] = text.split(regex)

		for (var i = 1; i < parts.length; i += 2) {
			let embedId = parts[i].replace('%sib[spotify:', '').replace(']0p%', '')
			parts[i] = isSmall ? <Spotify key={parts[i] + i} embedId={embedId} /> : 'https://open.spotify.com/track/' + embedId
		}
		return parts
	}
})()
