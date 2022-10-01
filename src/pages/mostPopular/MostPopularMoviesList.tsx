import React, { useEffect } from 'react'
import { Layout } from 'antd';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchMostPopular, selectMostPopularMovies } from '../../redux/mostPopularSlice/mostPopularSlice'

import styles from '../top250/Top250MoviesList.module.scss'
import { MoviesList } from '../../components/MoviesList/MoviesList';

const MostPopularMoviesList = () => {
	const movies = useAppSelector(selectMostPopularMovies)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchMostPopular())
	}, [])

	return (
		<Layout className={styles.pageContainer}>
			<MoviesList movies={movies} handleClick={() => { }} />
		</Layout>
	)
}
export default MostPopularMoviesList