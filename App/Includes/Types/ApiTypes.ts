import PostTypes from './PostTypes'

declare namespace ApiTypes {
    type Init = { status: boolean }
    export type Response = Promise<any | false>

	export interface CheckConnectionResponse extends Init {
        connection: 'ok'
    }

    export interface GetExploreResponse extends Init {
        posts: PostTypes.Post[]
        currentTime: number
    }
}

export default ApiTypes
