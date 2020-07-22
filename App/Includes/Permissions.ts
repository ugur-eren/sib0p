import { Platform } from 'react-native'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions'

// PERMISSIONS.IOS.MEDIA_LIBRARY
// PERMISSIONS.IOS.PHOTO_LIBRARY

export default new (class Permissions {
	requestFile = async (askTimes: number = 0, type: 'read' | 'write' = 'read'): Promise<boolean | typeof RESULTS.UNAVAILABLE | typeof RESULTS.BLOCKED> => {
		if (askTimes < 2) {
			let response = await request(
				type === 'read'
					? Platform.OS === 'ios'
						? PERMISSIONS.IOS.PHOTO_LIBRARY
						: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
					: Platform.OS === 'ios'
					? PERMISSIONS.IOS.MEDIA_LIBRARY
					: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
			)

			if (response === RESULTS.UNAVAILABLE) {
				return RESULTS.UNAVAILABLE
			}
			if (response === RESULTS.BLOCKED) {
				return RESULTS.BLOCKED
			}
			if (response === RESULTS.DENIED) {
				return this.requestFile(askTimes + 1)
			}
			if (response === RESULTS.GRANTED) {
				return type === 'write' ? true : this.requestFile(0, 'write')
			}
			return false
		} else {
			return false
		}
	}
})()
