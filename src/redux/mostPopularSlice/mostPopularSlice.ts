import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { moviesAPI } from "../../api"
import { RootState } from "../store"


const initialState: MostPopularState = {
	movies: [],
	isLoading: false,
	isError: false
}

export const fetchMostPopular = createAsyncThunk<MovieType[]>('mostPopular/fetchMostPopular',
	async () => {
		const data = await moviesAPI.fetchMostPopularFilms()
		return data.items.map(m => ({
			id: m.id,
			crew: m.crew,
			image: m.image,
			imDbRating: m.imDbRating,
			title: m.title,
			year: m.year,
			isLiked: false
		}))
	})

export const mostPopularSlice = createSlice({
	name: 'mostPopular',
	initialState,
	reducers: {
		top250Fetched: (state, action: PayloadAction<MovieType[]>) => {
			state.movies = action.payload
		},
		movieToggled: (state, action: PayloadAction<string>) => {
			const movie = state.movies.find(m => m.id === action.payload)
			if (movie) {
				movie.isLiked = !movie.isLiked
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMostPopular.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(fetchMostPopular.fulfilled, (state, action) => {
				state.movies = action.payload
				state.isLoading = false
			})
			.addCase(fetchMostPopular.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
			})
	}
})

export const { top250Fetched, movieToggled } = mostPopularSlice.actions

export default mostPopularSlice.reducer


export const selectMostPopularMovies = (state: RootState) => state.mostPopular.movies
export const selectMostPopularIsLoading = (state: RootState) => state.mostPopular.isLoading

interface MostPopularState {
	movies: MovieType[]
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