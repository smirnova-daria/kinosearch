import { configureStore } from "@reduxjs/toolkit";
import top250Reducer from './top250Slice/top250Slice'
import mostPopularReducer from './mostPopularSlice/mostPopularSlice'

export const store = configureStore({
	reducer: {
		top250: top250Reducer,
		mostPopular: mostPopularReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch