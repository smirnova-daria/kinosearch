import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { DeleteFilled, PlusCircleFilled } from '@ant-design/icons';
import styles from './MovieItem.module.scss'
import { Button } from 'antd';
import { MovieType } from '../../redux/moviesSlice/moviesSlice';

export const MovieItem: FC<PropsType> = ({ movie, addToFavorite, removeFromFavorite }) => {
	return (
		<div className={styles.movie}>
			<img src={movie.image} alt={movie.title} loading='lazy' />
			<div className={styles.actionsBlock}>
				<Link to={`/movie/${movie.id}`} className={styles.moreLink}>More</Link>
				{movie.isLiked
					? <Button onClick={() => removeFromFavorite(movie.id)} className={styles.favoriteBtn} title='Удалить из избранного'><DeleteFilled /></Button>
					: <Button onClick={() => addToFavorite(movie)} className={styles.favoriteBtn} title='Добавить в избранное'><PlusCircleFilled /></Button>}
			</div>
		</div >
	)
}

type PropsType = {
	movie: MovieType
	addToFavorite: (movie: MovieType) => void
	removeFromFavorite: (id: string) => void
}