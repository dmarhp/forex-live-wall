import React, { useEffect } from 'react';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import TimeSettings from '../TimeSettings/TimeSettings';
import Rates from '../Rates/Rates';
import { addNewRate } from '../../store/rateSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { urlBase, urlKey } from '../../utils/constants';
import './Wall.scss';

const chartOptions :ApexOptions = {
  chart: {
    type: 'candlestick',
    height: 350,
    width: '60%',
    offsetY: 20,
    animations: {
      enabled: false,
    },
    brush: {
      autoScaleYaxis: true,
    },
  },
  xaxis: {
    type: 'datetime',
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

const Wall = () => {
  const { chartData, currentRate, timeFrame } = useAppSelector((state) => state.rateReducer);
  const pair = currentRate.ticker;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (pair) {
        axios.get(`${urlBase}fx/${pair.replaceAll('/', '')}${urlKey}`)
          .then(({ data }) => {
            const [newData] = data;

            if (currentRate.ticker === newData.ticker) {
              dispatch(addNewRate(newData));
            }
          });
      }
    }, timeFrame * 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [chartData]);

  return (

    <div className="wall__wrapper">
      {pair && (
        <div className="wall">
          <div className="wall__chart">
            <ReactApexChart
              options={chartOptions}
              series={chartData}
              type="candlestick"
              height={350}
              width={700}
            />
          </div>

          <div className="wall__info">
            <TimeSettings />
            <Rates />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wall;
