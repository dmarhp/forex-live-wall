import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Chart from './components/_wall/Chart/Chart';
import Wall from './components/_wall/Wall/Wall';
import Input from './components/_input/Input/Input';

const App = () => {
  console.log('<App />');
  return (
    <div className="App">
      <Input />
      <Wall />
    </div>
  );
};

export default App;
