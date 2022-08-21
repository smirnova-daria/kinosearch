import { FC, useEffect } from "react"
import { MoviesList } from "../../components/MoviesList/MoviesList"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { selectTop250Movies } from "../../redux/top250Slice/selectors"
import { fetchTop250 } from "../../redux/top250Slice/thunks"
import { Layout } from 'antd';
import styles from './Top250MoviesList.module.scss'
export const Top250MoviesList: FC = () => {
	const movies = useAppSelector(selectTop250Movies)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTop250())
	}, [dispatch])

	return (
		<Layout className={styles.pageContainer}>
			<MoviesList movies={movies} />
		</Layout>
	)
}
