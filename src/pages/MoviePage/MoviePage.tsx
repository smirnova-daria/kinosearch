import { Avatar, Button, Col, Descriptions, Layout, List, Popover, Result, Row, Spin, Typography } from 'antd'
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchCurrentMovie, selectCurrentMovie, selectIsError, selectIsLoading } from '../../redux/moviesSlice/moviesSlice'
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
					<Row justify='space-between'>
						<Col sm={{ span: 10, order: 2 }} md={{ span: 11, order: 1 }} lg={{ span: 8, order: 1 }}>
							<img src={currentMovie.image} alt={currentMovie.title} />
						</Col>
						<Col sm={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }} lg={{ span: 10, order: 2 }}>
							<Title level={1} style={{ fontWeight: 700, margin: 0 }}>{currentMovie.title}</Title>
							<Text style={{ fontSize: '1.5rem', fontWeight: 600 }}>{currentMovie.year}</Text>
							<Paragraph style={{ fontSize: '1.1rem', opacity: '0.8', margin: '1rem 0' }}>
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
						<Col sm={{ span: 10, order: 3 }} md={{ span: 10, order: 3 }} lg={{ span: 4, order: 3 }}>
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
								<Button style={{ fontWeight: 700, margin: '10px auto', textAlign: 'center', display: 'block', fontSize: '1.2rem', height: 'auto' }}>Other</Button>
							</Popover>

						</Col>
					</Row>
					<Row>

					</Row>
					<Row>

					</Row>
				</div>
			}
		</Layout>
	)
}

export default MoviePage

// Год производства
// 1999
// Страна
// США
// Жанр
// драма, криминал
// слова
// Слоган
// «Пол Эджкомб не верил в чудеса.Пока не столкнулся с одним из них»
// Режиссер
// Фрэнк Дарабонт
// Сценарий
// Фрэнк Дарабонт, Стивен Кинг
// Продюсер
// Фрэнк Дарабонт, Дэвид Валдес
// Оператор
// Дэвид Тэттерсолл
// Композитор
// Томас Ньюман
// Художник
// Теренс Марш, Уильям Крус, Керин Вагнер, ...
// Монтаж
// Ричард Фрэнсис - Брюс
// Бюджет
// $60 000 000
// Маркетинг
// $30 000 000
// Сборы в США
// $136 801 374
// Сборы в мире
// 	+ $150 000 000 = $286 801 374
// сборы
// Зрители
// США26 млн, Германия2.1 млн, Италия1.7 млн, ...
// Премьера в Росcии
// 18 апреля 2000, «West»
// Премьера в мире
// 6 декабря 1999, ...
// Релиз на DVD
// 13 февраля 2001, «West Video»
// Возраст
// 16 +
// 	Рейтинг MPAA
// R
// Время