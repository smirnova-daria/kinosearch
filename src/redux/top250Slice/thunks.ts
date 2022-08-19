import { createAsyncThunk } from "@reduxjs/toolkit";
import { moviesAPI } from "../../api";
import { MovieType } from "./top250Slice";

export const fetchTop250 = createAsyncThunk<MovieType[]>(
	'top250/fetchTop250',
	async () => {
		const data = await moviesAPI.fetchTop250()
		return data.items.map(m => ({
			id: m.id,
			crew: m.crew,
			image: m.image,
			imDbRating: m.imDbRating,
			title: m.title,
			year: m.year,
			isLiked: false
		}))
	}
)