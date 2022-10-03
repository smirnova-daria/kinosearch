import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { moviesAPI } from "../../api"
import { RootState } from "../store"


const favoriteMovies: MovieType[] = JSON.parse(localStorage.getItem('favorite-movies') as string) || []

const initialState: MoviesState = {
	moviesToShow: [],
	favoriteMovies,
	isLoading: false,
	isError: false
}

export const fetchMoviesList = createAsyncThunk(
	'movies/fetchMovies',
	async (type: string): Promise<MovieType[]> => {
		const data = await moviesAPI.fetchMoviesList(type)

		return data.items.map(m => {
			const isMovieInFavorite = favoriteMovies.find(movie => movie.id === m.id)
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

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		addToFavorite: (state, action: PayloadAction<MovieType>) => {
			const movie = state.moviesToShow.find(m => m.id === action.payload.id)
			if (movie) {
				movie.isLiked = true
				state.favoriteMovies.push(movie)
				localStorage.setItem('favorite-movies', JSON.stringify(state.favoriteMovies))
			}
		},
		removeFromFavorite: (state, action: PayloadAction<string>) => {
			let index;
			const movie = state.moviesToShow.find((m, i) => {
				if (m.id === action.payload) {
					index = i
					return m
				}
				return false
			})

			if (movie && index) {
				movie.isLiked = false
				state.favoriteMovies.splice(index, 1)
				localStorage.setItem('favorite-movies', JSON.stringify(state.favoriteMovies))
			}
		},
		clearFavorite: (state) => {
			state.favoriteMovies = []
			localStorage.removeItem('favorite-movies')
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMoviesList.pending, (state) => {
				state.isLoading = true
				state.isError = false
			})
			.addCase(fetchMoviesList.fulfilled, (state, action: PayloadAction<MovieType[]>) => {
				state.isLoading = false
				state.isError = false
				state.moviesToShow = action.payload
			})
			.addCase(fetchMoviesList.rejected, (state) => {
				state.isLoading = false
				state.isError = true
			})
	}
})

interface MoviesState {
	moviesToShow: MovieType[]
	favoriteMovies: MovieType[]
	isLoading: boolean
	isError: boolean
}

export type MovieType = {
	id: string
	title: string
	year: string
	image: string
	crew: string
	imDbRating: string
	isLiked: boolean
}

export const { addToFavorite, removeFromFavorite, clearFavorite } = moviesSlice.actions

export default moviesSlice.reducer

export const selectMoviesToShow = (state: RootState) => state.movies.moviesToShow
export const selectFavoriteMovies = (state: RootState) => state.movies.favoriteMovies