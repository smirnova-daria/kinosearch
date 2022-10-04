import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Spin } from 'antd';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import { lazy, Suspense } from 'react';

const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))

function App() {
  const { Content } = Layout
  return (
    <Layout>
      <HeaderMenu />
      <Content>
        <Suspense fallback={<Spin style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', top: '100px' }} />}>
          <Routes>
            <Route path='/' element={<Navigate to='/movies/top250' />} />
            <Route path='/movies/top250' element={<MoviesPage type='top250' />} />
            <Route path='/movies/most-popular' element={<MoviesPage type='mostPopular' />} />
            {/* <Route path='/movie/:id' element={<MoviePage />} /> */}
            <Route path='/random-movie' />
            <Route path='/favorite-movies' element={<MoviesPage type='favorite' />} />
            <Route path='/search-movie' />
            <Route path='*' element={'404'} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
}

export default App;
