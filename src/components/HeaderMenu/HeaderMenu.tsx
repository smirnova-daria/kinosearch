import React, { FC, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu, Layout } from 'antd';
import type { MenuProps } from 'antd';

export const HeaderMenu: FC = () => {
	const location = useLocation()
	const [current, setCurrent] = useState(location.pathname);

	const onClick: MenuProps['onClick'] = e => {
		setCurrent(e.key);
	};

	const menuItems: MenuProps['items'] = [
		{
			label: (<Link to='/movies/top250' >Top 250 movies</Link>),
			key: '/movies/top250',
		},
		{
			label: (<Link to='/movies/most-popular' >Most popular movies</Link>),
			key: '/movies/most-popular',
		},
		{
			label: (<Link to='/random-movie' >Random movie</Link>),
			key: '/random-movie',
		},
		{
			label: (<Link to='/search-movie' >Search movie</Link>),
			key: '/search-movie',
		},
		{
			label: (<Link to='/favorite-movies' >Favorite movies</Link>),
			key: '/favorite-movies',
		},
	]
	const { Header } = Layout
	return (
		<Header>
			<Menu onClick={onClick} selectedKeys={[current]} items={menuItems} mode={'horizontal'} theme='dark' />
		</Header>
	)
}
