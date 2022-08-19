import { configureStore } from "@reduxjs/toolkit";
import top250Reducer from './top250Slice/top250Slice'

export const store = configureStore({
	reducer: {
		top250: top250Reducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch