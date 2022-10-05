import axios from "axios"
//import mockMovie from '../mock/mockMovie.json'
const instance = axios.create({
	baseURL: 'https://imdb-api.com/ru/API/',
})
const apikey = "pk_haswrb539erohnlhc"

export const moviesAPI = {
	fetchMoviesList(type: string): Promise<ResponseType> {
		return instance.get(`${type}/${apikey}`).then(res => res.data)
	},
	fetchMovieById(id: string): Promise<ResponseMovieType> {
		return instance.get(`Title/${apikey}/${id}/FullActor,Images,Trailer`).then(res => res.data)
		//return mockMovie
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

type ResponseType = {
	items: MoviesType[],
	errorMessage: string
}

export type ResponseMovieType = {
	id: string
	title: string
	year: string
	image: string
	runtimeStr: string
	plot: string
	directorList: ListItemType[]
	writerList: ListItemType[]
	starList: ListItemType[]
	actorList: ListItemType[]
	genreList: { key: string, value: string }[]
	companyList: ListItemType[]
	countryList: { key: string, value: string }[]
	imDbRating: string
	images: { items: { image: string }[] }[]
	trailer: { linkEmbed: string }
	similars: { id: string, title: string, image: string, imDbRating: string }[]
}

type ListItemType = {
	id: string
	name: string
}