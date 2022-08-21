import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { MovieType } from "../../redux/top250Slice/top250Slice"
import styles from './MovieItem.module.scss'
import { Button } from 'antd';

export const MovieItem: FC<PropsType> = ({ movie, handleClick }) => {
	return (
		<div className={styles.movie}>
			<img src={movie.image} alt={movie.title} />
			<div className={styles.actionsBlock}>
				<Link to={`${movie.id}`} className={styles.moreLink}>More</Link>
				<Button type="default" onClick={() => handleClick(movie.id)}>
					{movie.isLiked ? 'Remove from Favorite' : 'Add to Favorite'}
				</Button>
			</div>
		</div>
	)
}

type PropsType = {
	movie: MovieType
	handleClick: (id: string) => void
}