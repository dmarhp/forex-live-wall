import React from 'react';
import './App.scss';
import Wall from './components/Wall/Wall';
import SearchForm from './components/SearchForm/SearchForm';

const App = () => (
  <div>
    <SearchForm />
    <Wall />
  </div>
);

export default App;
