import { PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"
import { selectTop250IsLoading, selectTop250Movies } from "../selectors"
import top250Reducer, { MovieType, top250Fetched } from '../top250Slice'

const testState: RootState = {
	top250:
	{
		movies: [
			{
				"id": "tt0111161",
				"title": "The Shawshank Redemption",
				"year": "1994",
				"image": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6716_AL_.jpg",
				"crew": "Frank Darabont (dir.), Tim Robbins, Morgan Freeman",
				"imDbRating": "9.2",
				isLiked: false
			},
			{
				"id": "tt0068646",
				"title": "The Godfather",
				"year": "1972",
				"image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7015_AL_.jpg",
				"crew": "Francis Ford Coppola (dir.), Marlon Brando, Al Pacino",
				"imDbRating": "9.2",
				isLiked: false
			},
			{
				"id": "tt0468569",
				"title": "The Dark Knight",
				"year": "2008",
				"image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_Ratio0.6716_AL_.jpg",
				"crew": "Christopher Nolan (dir.), Christian Bale, Heath Ledger",
				"imDbRating": "9.0",
				isLiked: false
			},
		],
		isLoading: false,
		isError: false
	}
}

describe('top250Slice selectors', () => {
	test('select all movies', () => {
		const result = selectTop250Movies(testState)
		expect(result).toEqual(testState.top250.movies)
	})

	test('select isLoading', () => {
		const result = selectTop250IsLoading(testState)
		expect(result).toBe(false)
	})
})

describe('top250Slice reducers', () => {
	test('should return default state when pass an empty action', () => {
		const result = top250Reducer(undefined, { type: '' })
		expect(result).toEqual({ movies: [], isLoading: false, isError: false })
	})

	test('should return movies when pass action "top250Fetched"', () => {
		const action: PayloadAction<MovieType[]> = {
			type: top250Fetched.type,
			payload: testState.top250.movies
		}
		const result = top250Reducer({ movies: [], isLoading: false, isError: false }, action)

		expect(result.movies.length).toBe(3)
		expect(result.movies[2].id).toBe('tt0468569')
		expect(result.movies[0].isLiked).toBeFalsy()
	})
})
