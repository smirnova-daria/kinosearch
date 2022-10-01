import axios from "axios"
import top250Data from '../mock/mockDB.json'
import mostPopular from '../mock/mostPopular.json'

const instance = axios.create({
	baseURL: 'https://imdb-api.com/ru/API/',
})
const apikey = "pk_haswrb539erohnlhc"

export const moviesAPI = {
	fetchTop250(): ResponseType {
		//рабочий код, не используется в процессе разработки, чтобы не делать запросы к api
		// return instance.get(`Top250Movies/${apikey}`)
		// 	.then(res => console.log(res.data))

		return top250Data
	},
	fetchMostPopularFilms(): Promise<ResponseType> {
		return instance.get(`MostPopularMovies/${apikey}`)
			.then(res => res.data)

		//return mostPopular
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