import Config from '../Includes/Config'
import ApiTypes from './Types/ApiTypes'

type Response<T> = Promise<T | false>
type Params = {
	[key: string]: any
}

export default new (class Functions {
	private uri = Config.api.uri

	private get = (method: string): ApiTypes.Response => {
		return new Promise((resolve, reject) => {
			fetch(this.uri + method + '.php')
				.then((response) => response.json())
				.then((data) => {
					console.log(method, data)
					resolve(data)
				})
				.catch((err) => {
					console.log('api error', method, err)
					resolve(false)
				})
		})
	}

	private post = (method: string, params: Params): ApiTypes.Response => {
		let formBody: string[] = []
		for (var property in params) {
			formBody.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]))
		}
		let joinedBody = formBody.join('&')

		return new Promise((resolve, reject) => {
			fetch(this.uri + method + '.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				},
				body: joinedBody,
			})
				.then((response) => response.text())
				.then((data) => {
					console.log(method, data)
					resolve(JSON.parse(data))
				})
				.catch((err) => {
					console.log('api error', this.uri + method + '.php', err)
					resolve(false)
				})
		})
	}

	checkConnection = (): Response<ApiTypes.CheckConnectionResponse> => {
		return this.get('checkConnection')
	}

	login = (params: Params): Response<ApiTypes.LoginResponse> => {
		return this.post('Login', params)
	}

	logout = (params: Params): Response<ApiTypes.LogoutResponse> => {
		return this.post('Logout', params)
	}

	getExplore = (params: Params): Response<ApiTypes.GetExploreResponse> => {
		return this.post('GetExplore', params)
	}

	getComments = (params: Params): Response<ApiTypes.GetCommentsResponse> => {
		return this.post('GetComments', params)
	}

	getProfile = (params: Params): Response<ApiTypes.GetProfileResponse> => {
		return this.post('GetProfile', params)
	}

	getNotifications = (params: Params): Response<ApiTypes.GetNotificationsResponse> => {
		return this.post('GetNotifications', params)
	}
})()
