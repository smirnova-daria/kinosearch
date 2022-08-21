import React, { FC } from 'react';
import { MovieType } from "../../redux/top250Slice/top250Slice"
import styles from './MovieItem.module.scss'
import { Typography } from 'antd';

export const MovieItem: FC<PropsType> = ({ movie }) => {
	return (
		<div className={styles.movie}>
			<img src={movie.image} alt={movie.title} />
		</div>
	)
}

type PropsType = {
	movie: MovieType
}