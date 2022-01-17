import React from 'react';
import { useAppSelector } from '../../store/hooks';

const Rates = () => {
  const pair = useAppSelector((state) => state.settings.pair);
  const rates = useAppSelector((state) => state.rates);
  console.log('<Rates />');
  return (
    <div>
      <h1>{pair}</h1>
      <div>
        {rates[0].data[rates[0].data.length - 1].y.map((item, index) => (<h3 key={`rates${index * 2}`}>{item}</h3>))}
      </div>
    </div>
  );
};

export default Rates;
