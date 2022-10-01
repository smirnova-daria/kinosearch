import { FC, useEffect } from "react"
import { MoviesList } from "../../components/MoviesList/MoviesList"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { selectTop250Movies } from "../../redux/top250Slice/selectors"
import { fetchTop250 } from "../../redux/top250Slice/thunks"
import { Layout } from 'antd';
import styles from './Top250MoviesList.module.scss'
import { movieToggled } from "../../redux/top250Slice/top250Slice"

const Top250MoviesList: FC = () => {
	const movies = useAppSelector(selectTop250Movies)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTop250())
	}, [dispatch])

	const toggleMovie = (id: string) => {
		dispatch(movieToggled(id))
	}

	return (
		<Layout className={styles.pageContainer}>
			<MoviesList movies={movies} handleClick={toggleMovie} />
		</Layout>
	)
}

export default Top250MoviesList