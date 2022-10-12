import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { moviesAPI } from "../../api"
import { RootState } from "../store"


const favoriteMovies: MovieType[] = JSON.parse(localStorage.getItem('favorite-movies') as string) || []

const initialState: MoviesState = {
	moviesToShow: [],
	favoriteMovies,
	currentMovie: null,
	isLoading: false,
	isError: false,
}

export const fetchMoviesList = createAsyncThunk(
	'movies/fetchMovies',
	async (type: string, { getState }: any): Promise<MovieType[]> => {
		const data = await moviesAPI.fetchMoviesList(type)

		return data.items.map(m => {
			const isMovieInFavorite: boolean = getState().movies.favoriteMovies.find((movie: { id: string }) => movie.id === m.id)
			const updatedData = {
				id: m.id,
				crew: m.crew,
				image: m.image,
				imDbRating: m.imDbRating,
				title: m.title,
				year: m.year,
				isLiked: isMovieInFavorite ? true : false
			}

			return updatedData
		})
	}
)

export const fetchCurrentMovie = createAsyncThunk(
	'movies/fetchCurrentMovie',
	async (id: string, { getState }: any): Promise<CurrentMovieType> => {

		const data = await moviesAPI.fetchMovieById(id)
		const favoriteMovies: MovieType[] = getState().movies.favoriteMovies

		const isMovieInFavorite = favoriteMovies.find(movie => movie.id === data.id)
		return {
			...data,
			isLiked: isMovieInFavorite ? true : false
		}
	}
)

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addToFavorite: (state, action: PayloadAction<MovieType>) => {
			let movie: MovieType = action.payload
			const foundMovie = state.moviesToShow.find(m => m.id === movie.id)
			if (foundMovie) {
				if (state.currentMovie) {
					state.currentMovie.isLiked = true
				}
				let normalizeMovie: MovieType;
				if (movie.companies) {
					normalizeMovie = {
						id: movie.id,
						image: movie.image,
						imDbRating: movie.imDbRating,
						isLiked: movie.isLiked,
						title: movie.title,
						year: movie.year,
						crew: movie.crew
					}
					movie = normalizeMovie
				}
				foundMovie.isLiked = true
				state.favoriteMovies.push(movie)
				localStorage.setItem('favorite-movies', JSON.stringify(state.favoriteMovies))
			}
		},
		removeFromFavorite: (state, action: PayloadAction<string>) => {
			const movie = state.moviesToShow.find(m => m.id === action.payload)
			const index = state.favoriteMovies.findIndex(m => m.id === action.payload)
			if (movie && index !== undefined) {
				if (state.currentMovie) {
					state.currentMovie.isLiked = false
				}
				movie.isLiked = false
				state.favoriteMovies.splice(index, 1)
				localStorage.setItem('favorite-movies', JSON.stringify(state.favoriteMovies))
			}
		},
		clearFavorite: (state) => {
			state.favoriteMovies = []
			localStorage.removeItem('favorite-movies')
		},
		setMoviesToShow: (state, action: PayloadAction<MovieType[]>) => {
			state.moviesToShow = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMoviesList.pending, (state) => {
				state.moviesToShow = []
				state.currentMovie = null
				state.isLoading = true
				state.isError = false
			})
			.addCase(fetchMoviesList.fulfilled, (state, action: PayloadAction<MovieType[]>) => {
				state.isLoading = false
				state.isError = false
				state.moviesToShow = action.payload
			})
			.addCase(fetchMoviesList.rejected, (state) => {
				state.moviesToShow = []
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchCurrentMovie.pending, (state) => {
				state.moviesToShow = []
				state.isLoading = true
				state.isError = false
			})
			.addCase(fetchCurrentMovie.fulfilled, (state, action: PayloadAction<CurrentMovieType>) => {
				state.isLoading = false
				state.isError = false
				state.currentMovie = action.payload
				state.moviesToShow = [action.payload]
			})
			.addCase(fetchCurrentMovie.rejected, (state) => {
				state.isLoading = false
				state.isError = true
				state.currentMovie = null
			})
	}
})

interface MoviesState {
	moviesToShow: MovieType[]
	favoriteMovies: MovieType[]
	isLoading: boolean
	isError: boolean
	currentMovie: null | CurrentMovieType
}

export type MovieType = {
	id: string
	title: string
	year: string
	image: string
	crew?: string
	imDbRating: string
	isLiked: boolean
	companies?: string
}

export type CurrentMovieType = {
	id: string
	title: string
	year: string
	image: string
	runtimeStr: string
	plot: string
	directorList: ListItemType[]
	writerList: ListItemType[]
	starList: ListItemType[]
	actorList: { id: string, image: string, name: string, asCharacter: string }[]
	genreList: { key: string, value: string }[]
	companyList: ListItemType[]
	countryList: { key: string, value: string }[]
	imDbRating: string
	images: { items: { image: string, title: string }[] }
	trailer: { linkEmbed: string }
	similars: { id: string, title: string, image: string, imDbRating: string }[]
	isLiked: boolean
}

type ListItemType = {
	id: string
	name: string
}

export const { addToFavorite, removeFromFavorite, clearFavorite, setMoviesToShow } = moviesSlice.actions

export default moviesSlice.reducer

export const selectMoviesToShow = (state: RootState) => state.movies.moviesToShow
export const selectFavoriteMovies = (state: RootState) => state.movies.favoriteMovies
export const selectIsLoading = (state: RootState) => state.movies.isLoading
export const selectIsError = (state: RootState) => state.movies.isError
export const selectCurrentMovie = (state: RootState) => state.movies.currentMovie