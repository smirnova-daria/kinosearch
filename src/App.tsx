import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import { Top250MoviesList } from './pages/top250/Top250MoviesList';


function App() {
  const { Content } = Layout
  return (
    <Layout>
      <HeaderMenu />
      <Content>
        <Routes>
          <Route path='/' element={<Navigate to='/top250-movies' />} />
          <Route path='/top250-movies' element={<Top250MoviesList />} />
          <Route path='/most-popular-movies' />
          <Route path='/random-movie' />
          <Route path='/favorite-movies' />
          <Route path='/search-movie' />
          <Route path='*' element={'404'} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
