import { FC } from "react"
import { MovieType } from "../../redux/moviesSlice/moviesSlice"
import { MovieItem } from "../MovieItem/MovieItem"
import styles from './MoviesList.module.scss'

export const MoviesList: FC<PropsType> = (props) => {
	return (
		<div className={styles.moviesContainer}>
			{props.movies.map(m => <MovieItem key={m.id} movie={m} addToFavorite={props.addToFavorite} removeFromFavorite={props.removeFromFavorite} />)}
		</div>
	)
}

type PropsType = {
	movies: MovieType[]
	addToFavorite: (movie: MovieType) => void
	removeFromFavorite: (id: string) => void
}