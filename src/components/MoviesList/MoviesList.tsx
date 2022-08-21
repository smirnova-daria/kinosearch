import { FC } from "react"
import { MovieType } from "../../redux/top250Slice/top250Slice"
import { MovieItem } from "../MovieItem/MovieItem"
import styles from './MoviesList.module.scss'

export const MoviesList: FC<PropsType> = (props) => {
	return (
		<div className={styles.moviesContainer}>
			{props.movies.map(m => <MovieItem key={m.id} movie={m} handleClick={props.handleClick} />)}
		</div>
	)
}

type PropsType = {
	movies: MovieType[]
	handleClick: (id: string) => void
}