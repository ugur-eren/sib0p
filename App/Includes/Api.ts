import axios from 'axios'
import Config from '../Includes/Config'
import ApiTypes from './Types/ApiTypes'

type Response<T = ApiTypes.Init> = Promise<T | false>
type Params = {
	[key: string]: any
}

export default new (class Functions {
	private uri = Config.api.uri

	private get = (method: string): ApiTypes.Response => {
		return new Promise((resolve, reject) => {
			fetch(this.uri + method + '.php')
				.then((response) => response.json())
				.then((data) => resolve(data))
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

	checkConnection = (): Response => {
		return this.get('CheckConnection')
	}

	register = (params: ApiTypes.RegisterRequest): Response<ApiTypes.RegisterResponse> => {
		return this.post('Register', params)
	}

	login = (params: Params): Response<ApiTypes.LoginResponse> => {
		return this.post('Login', params)
	}

	logout = (params: Params): Response<ApiTypes.LogoutResponse> => {
		return this.post('Logout', params)
	}

	checkLogin = (params: Params): Response<ApiTypes.CheckLoginResponse> => {
		return this.post('CheckLogin', params)
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

	getProfileData = (params: Params): Response<ApiTypes.GetProfileDataResponse> => {
		return this.post('GetProfileData', params)
	}

	updateProfile = (params: Params): Response<ApiTypes.UpdateProfileResponse> => {
		return this.post('UpdateProfile', params)
	}

	changePassword = (params: Params): Response<ApiTypes.ChangePasswordResponse> => {
		return this.post('ChangePassword', params)
	}

	getNotifications = (params: Params): Response<ApiTypes.GetNotificationsResponse> => {
		return this.post('GetNotifications', params)
	}

	getRelations = (params: Params): Response<ApiTypes.GetRelationsResponse> => {
		return this.post('GetRelations', params)
	}

	doAction = (params: ApiTypes.DoActionRequest): Response<ApiTypes.DoActionResponse> => {
		return this.post('DoAction', params)
	}

	search = (params: Params): Response<ApiTypes.SearchResponse> => {
		return this.post('Search', params)
	}

	changePhoto = (params: Params): Response<ApiTypes.ChangePhotoResponse> => {
		return this.post('ChangePhoto', params)
	}

	getBlockedUsers = (params: Params): Response<ApiTypes.GetBlockedUsersResponse> => {
		return this.post('GetBlockedUsers', params)
	}

	requestCaptcha = (): Response<ApiTypes.RequestCaptchaResponse> => {
		return this.get('RequestCaptcha')
	}

	sharePost = (
		params: Params,
		onUploadProgress: (progressEvent: { loaded: number; total: number }) => void
	): Response<ApiTypes.SharePostResponse> => {
		let formBody: string[] = []
		for (var property in params) {
			formBody.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]))
		}
		let joinedBody = formBody.join('&')

		return new Promise((resolve) => {
			axios
				.post(this.uri + 'SharePost' + '.php', joinedBody, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					onUploadProgress: onUploadProgress,
				})
				.then((res) => {
					console.log(res)
					resolve(res.data instanceof Object ? res.data : false)
				})
				.catch((err) => {
					console.log(err)
					resolve(false)
				})
		})
	}
})()
