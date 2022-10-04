import axios from "axios"

const instance = axios.create({
	baseURL: 'https://imdb-api.com/ru/API/',
})
const apikey = "pk_haswrb539erohnlhc"

export const moviesAPI = {
	fetchMoviesList(type: string): Promise<ResponseType> {
		return instance.get(`${type}/${apikey}`).then(res => res.data)
	}
}

export type MoviesType = {
	id: string
	rank: string
	rankUpDown?: string
	title: string
	fullTitle: string
	year: string
	image: string
	crew: string
	imDbRating: string
	imDbRatingCount: string
}

export type ResponseType = {
	items: MoviesType[],
	errorMessage: string
}