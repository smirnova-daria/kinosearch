import { Avatar, Button, Col, Descriptions, Layout, List, Popover, Result, Row, Spin, Typography } from 'antd'
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCurrentMovie, MovieType, selectCurrentMovie, selectIsError, selectIsLoading } from '../../redux/moviesSlice/moviesSlice'
import styles from './MoviePage.module.scss'

const { Title, Paragraph, Text } = Typography

const MoviePage: FC = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const currentMovie = useAppSelector(selectCurrentMovie)
	const isLoading = useAppSelector(selectIsLoading)
	const isError = useAppSelector(selectIsError)

	useEffect(() => {
		if (id) {
			dispatch(fetchCurrentMovie(id))
		}
	}, [id, dispatch])

	const starIds = currentMovie?.starList.map(m => m.id)
	const mainStars = currentMovie?.actorList.filter(m => starIds?.includes(m.id))
	const otherStars = currentMovie?.actorList.filter(m => !starIds?.includes(m.id))
	otherStars?.splice(10);

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
			{currentMovie &&
				<div className={styles.movieWrapper}>
					<Row justify='space-between' style={{ marginBottom: '1rem' }}>
						<Col
							sm={{ span: 10, order: 2 }}
							md={{ span: 11, order: 1 }}
							lg={{ span: 8, order: 1 }}
							className={styles.imageCol}
						>
							<img src={currentMovie.image} alt={currentMovie.title} />
						</Col>
						<Col
							sm={{ span: 24, order: 1 }}
							md={{ span: 12, order: 2 }}
							lg={{ span: 10, order: 2 }}>
							<Title level={1} className={styles.movieTitle}
							>{currentMovie.title}</Title>
							<Text className={styles.movieYear}>{currentMovie.year}</Text>
							<Paragraph className={styles.movieDescription}>
								{currentMovie.plot}
							</Paragraph>
							<Descriptions title="About film" column={1} labelStyle={{ opacity: '0.8', fontWeight: 600 }}>
								<Descriptions.Item label="Year">{currentMovie.year}</Descriptions.Item>
								<Descriptions.Item label="Country">{currentMovie.countryList.map(c => c.key).join(', ')}</Descriptions.Item>
								<Descriptions.Item label="Genres">{currentMovie.genreList.map(g => g.key).join(', ')}</Descriptions.Item>
								<Descriptions.Item label="Directors">{currentMovie.directorList.map(d => d.name).join(', ')}</Descriptions.Item>
								<Descriptions.Item label="Writers">{currentMovie.writerList.map(w => w.name).join(', ')}</Descriptions.Item>
								<Descriptions.Item label="Companies">{currentMovie.companyList.map(c => c.name).join(', ')}</Descriptions.Item>
								<Descriptions.Item label="Duration">{currentMovie.runtimeStr}</Descriptions.Item>
							</Descriptions>
						</Col>
						<Col
							sm={{ span: 10, order: 3 }}
							md={{ span: 10, order: 3 }}
							lg={{ span: 4, order: 3 }}
							style={{ width: '100%' }}>
							<Title level={3} style={{ fontWeight: 700, marginBottom: '10px', textAlign: 'center' }}>Starring</Title>
							<List
								itemLayout="horizontal"
								dataSource={mainStars}
								renderItem={item => (
									<List.Item style={{ border: 'none', padding: '6px 0', justifyContent: 'flex-start', columnGap: '5px' }} >
										<Avatar src={item.image} style={{ width: '50px', height: '50px' }} />
										<Text style={{ fontSize: '1rem' }}>{item.name}</Text>
									</List.Item>
								)}
							/>
							<Popover placement="bottomLeft" content={<List
								itemLayout="horizontal"
								dataSource={otherStars}
								renderItem={item => (
									<List.Item style={{ border: 'none', padding: '6px 0', justifyContent: 'flex-start', columnGap: '5px' }} >
										<Text style={{ fontSize: '1rem' }}>{item.name}</Text>
									</List.Item>
								)}
							/>} trigger="click">
								<Button style={{ fontWeight: 700, margin: '10px auto', textAlign: 'center', display: 'block', fontSize: '1.2rem', height: 'auto' }}>Other actors</Button>
							</Popover>

						</Col>
					</Row>
					<Row justify='start'>
						<Col
							style={{ width: '100%' }}
						>
							<iframe
								src={window.innerWidth > 560 ? `${currentMovie.trailer.linkEmbed}?autoplay=false&width=560` : `${currentMovie.trailer.linkEmbed}?autoplay=false&width=300`}
								title={`trailer of ${currentMovie.title}`}
								width="560"
								height="310"
								allowFullScreen
								frameBorder="no"
								// scrolling="no"
								className={styles.trailerFrame}
							>
							</iframe>
						</Col>
					</Row>
				</div>
			}
		</Layout >
	)
}

export default MoviePage
