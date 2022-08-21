import React, { FC, useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import type { MenuProps } from 'antd';

export const HeaderMenu: FC = () => {
	const [current, setCurrent] = useState('top250');

	const onClick: MenuProps['onClick'] = e => {
		console.log('click ', e);
		setCurrent(e.key);
	};

	const menuItems: MenuProps['items'] = [
		{
			label: (<Link to='/top250-movies' >Top 250 movies</Link>),
			key: 'top250',
		},
		{
			label: (<Link to='/most-popular-movies' >Most popular movies</Link>),
			key: 'mostPopular',
		},
		{
			label: (<Link to='/random-movie' >Random movie</Link>),
			key: 'random',
		},
		{
			label: (<Link to='/search-movie' >Search movie</Link>),
			key: 'search',
		},
		{
			label: (<Link to='/favorite-movies' >Favorite movies</Link>),
			key: 'favorite',
		},
	]
	const { Header } = Layout
	return (
		<Header>
			<Menu onClick={onClick} selectedKeys={[current]} items={menuItems} mode={'horizontal'} theme='dark' />
		</Header>
	)
}
