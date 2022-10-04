import { FC, useEffect } from "react"
import { MoviesList } from "../../components/MoviesList/MoviesList"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { Layout, Result, Spin } from 'antd';
import styles from './MoviesPage.module.scss'
import { addToFavorite, fetchMoviesList, MovieType, removeFromFavorite, selectFavoriteMovies, selectIsError, selectIsLoading, selectMoviesToShow, setMoviesToShow } from "../../redux/moviesSlice/moviesSlice"

const MoviesPage: FC<PropsType> = ({ type }) => {
	const dispatch = useAppDispatch()
	const movies = useAppSelector(selectMoviesToShow)
	const favoriteMovies = useAppSelector(selectFavoriteMovies)
	const isLoading = useAppSelector(selectIsLoading)
	const isError = useAppSelector(selectIsError)

	useEffect(() => {
		switch (type) {
			case 'top250':
				dispatch(fetchMoviesList('Top250Movies'))
				break;
			case 'mostPopular':
				dispatch(fetchMoviesList('MostPopularMovies'))
				break;
		}
	}, [dispatch, type])

	useEffect(() => {
		if (type === 'favorite') {
			dispatch(setMoviesToShow(favoriteMovies))
		}
	}, [type, dispatch, favoriteMovies])

	return (
		<Layout className={styles.pageContainer}>
			{isLoading && <Spin />}
			{isError &&
				<Result
					status="error"
					title="Не удалось загрузить список фильмов"
					subTitle="Попробуйте перезагрузить страницу."
				>
				</Result>
			}
			<MoviesList
				movies={movies}
				addToFavorite={(movie: MovieType) => dispatch(addToFavorite(movie))}
				removeFromFavorite={(id: string) => dispatch(removeFromFavorite(id))}
			/>

		</Layout>
	)
}

export default MoviesPage

type PropsType = {
	type: 'top250' | 'mostPopular' | 'favorite'
}