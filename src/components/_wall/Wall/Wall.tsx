import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Chart from '../Chart/Chart';
import Settings from '../Settings/Settings';
import Rates from '../../Rates/Rates';
import { addNewRate, setNewRateArray } from '../../../store/rateSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

const Wall = () => {
  console.log('<Wall />');

  const chartData = useAppSelector((state) => state.rates);
  const { pair, timeFrame } = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  console.log(chartData);

  useEffect(() => {
    console.log(123, pair);
    const interval = setInterval(() => {
      const urlBase = 'https://financialmodelingprep.com/api/v3/fx/';
      const urlKey = '?apikey=538c650811c84ca609c3ac2b342b7785';

      if (pair !== '') {
        axios.get(`${urlBase}${pair.replaceAll('/', '')}${urlKey}`).then(({ data }) => {
          // eslint-disable-next-line prefer-destructuring
          const newData = data[0];
          if (newData.ticker) {
            dispatch(addNewRate(newData));
          }
        });
      }
    }, timeFrame * 1000);
    return () => {
      window.clearInterval(interval); // clear the interval in the cleanup function
    };
  }, [chartData]);

  /*
  const showChart = () => {
    if (pair) {
      return (
        <div>
          <Chart />
          <Rates />
        </div>
      );
    }
    return (<div>123</div>);
  };
   */

  return (
    <div>
      <Settings />
      <Chart key={pair} />
      <Rates />
    </div>
  );
};

export default Wall;
