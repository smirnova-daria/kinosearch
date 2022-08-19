import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchTop250 } from "./thunks"

const initialState: Top250State = {
	movies: [],
	isLoading: false
}

export const top250Slice = createSlice({
	name: 'top250',
	initialState,
	reducers: {
		dataFetched: (state, action: PayloadAction<MovieType[]>) => {
			state.movies = action.payload
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fetchTop250.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(fetchTop250.fulfilled, (state, action) => {
				state.movies = action.payload
				state.isLoading = false
			})
	}
})

export const { dataFetched } = top250Slice.actions

export default top250Slice.reducer

interface Top250State {
	movies: MovieType[]
	isLoading: boolean
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