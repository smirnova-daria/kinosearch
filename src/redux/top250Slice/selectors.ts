import { RootState } from "../store";

export const selectTop250Movies = (state: RootState) => state.top250.movies

export const selectTop250IsLoading = (state: RootState) => state.top250.isLoading