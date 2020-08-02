import AsyncStorage from '@react-native-community/async-storage'

export default new (class Storage {
	public set = async (key: string, value: string): Promise<boolean> => {
		try {
			await AsyncStorage.setItem(key, value)
			return true
		} catch (e) {
			return false
		}
	}

	public setMultiple = async (values: { [x: string]: string }): Promise<boolean> => {
		let newValues: [string, string][] = Object.keys(values).map((key) => {
			return [key, values[key]]
		})

		try {
			await AsyncStorage.multiSet(newValues)
			return true
		} catch (e) {
			return false
		}
	}

	public get = async (key: string, defaultValue?: string): Promise<false | string> => {
		try {
			const value = await AsyncStorage.getItem('@storage_Key')
			if (value !== null) {
				return value
			} else {
				if (defaultValue) {
					const isOk = await this.set(key, defaultValue)
					return isOk ? defaultValue : false
				} else {
					return false
				}
			}
		} catch (e) {
			return false
		}
	}

	public getMultiple = async (keys: string[]): Promise<false | { [x: string]: string }> => {
		try {
			const values = await AsyncStorage.multiGet(keys)
			let retValues = {}
			values.map((item) => {
				retValues[item[0]] = item[1] !== null ? item[1] : ''
			})
			return retValues
		} catch (e) {
			return false
		}
	}

	public getMultipleWithDefault = async (keys: { [key: string]: string }): Promise<false | { [x: string]: string }> => {
		try {
			const values = await AsyncStorage.multiGet(Object.keys(keys))
			let retValues = {}
			let emptyValues: string[] = []
			values.map((item) => {
				retValues[item[0]] = item[1] !== null ? item[1] : ''
				if (item[1] === null) {
					emptyValues.push(item[0])
				}
			})

			let formatted = {}
			emptyValues.map((value) => {
				formatted[value] = keys[value]
			})

			let isOk = await this.setMultiple(formatted)
			if (isOk) {
				return {
					...retValues,
					...formatted,
				}
			} else {
				return retValues
			}
		} catch (e) {
			let isOk = await this.setMultiple(keys)
			return isOk ? keys : false
		}
	}

	public remove = async (key: string): Promise<boolean> => {
		try {
			await AsyncStorage.removeItem(key)
			return true
		} catch (e) {
			return false
		}
	}

	public clearAll = async (): Promise<boolean> => {
		try {
			await AsyncStorage.clear()
			return true
		} catch (e) {
			return false
		}
	}
})()
