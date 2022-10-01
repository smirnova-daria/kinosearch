import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Spin } from 'antd';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import { lazy, Suspense } from 'react';


const Top250MoviesList = lazy(() => import('./pages/top250/Top250MoviesList'))
const MostPopularMoviesList = lazy(() => import('./pages/mostPopular/MostPopularMoviesList'))

function App() {
  const { Content } = Layout
  return (
    <Layout>
      <HeaderMenu />
      <Content>
        <Suspense fallback={<Spin style={{ position: 'fixed', left: '50%', transform: 'translateX(-50%)', top: '100px' }} />}>
          <Routes>
            <Route path='/' element={<Navigate to='/top250-movies' />} />
            <Route path='/top250-movies' element={<Top250MoviesList />} />
            <Route path='/most-popular-movies' element={<MostPopularMoviesList />} />
            <Route path='/random-movie' />
            <Route path='/favorite-movies' />
            <Route path='/search-movie' />
            <Route path='*' element={'404'} />
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
}

export default App;
