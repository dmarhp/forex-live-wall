import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { TIMEOUT } from 'dns';
import { useAppSelector } from '../../../store/hooks';
import { RateData } from '../../../store/rateSlice';
import { createRateArray } from '../../../utils/dataLocal';

const initialData = [{
  name: 'initial',
  data: [{
    x: new Date(1538854200000),
    y: [6593.13, 6596.01, 6590, 6593.34],
  },
  {
    x: new Date(1538856000000),
    y: [6593.34, 6604.76, 6582.63, 6593.86],
  },
  {
    x: new Date(1538857800000),
    y: [6593.86, 6604.28, 6586.57, 6600.01],
  },
  {
    x: new Date(1538859600000),
    y: [6601.81, 6603.21, 6592.78, 6596.25],
  },
  {
    x: new Date(1538861400000),
    y: [6596.25, 6604.2, 6590, 6602.99],
  },
  {
    x: new Date(1538863200000),
    y: [6602.99, 6606, 6584.99, 6587.81],
  },
  {
    x: new Date(1538865000000),
    y: [6587.81, 6595, 6583.27, 6591.96],
  },
  {
    x: new Date(1538866800000),
    y: [6591.97, 6596.07, 6585, 6588.39],
  },
  {
    x: new Date(1538868600000),
    y: [6587.6, 6598.21, 6587.6, 6594.27],
  },
  {
    x: new Date(1538870400000),
    y: [6596.44, 6601, 6590, 6596.55],
  },
  {
    x: new Date(1538872200000),
    y: [6598.91, 6605, 6596.61, 6600.02],
  },
  {
    x: new Date(1538874000000),
    y: [6600.55, 6605, 6589.14, 6593.01],
  },
  {
    x: new Date(1538875800000),
    y: [6593.15, 6605, 6592, 6603.06],
  },
  {
    x: new Date(1538877600000),
    y: [6603.07, 6604.5, 6599.09, 6603.89],
  },
  {
    x: new Date(1538879400000),
    y: [6604.44, 6604.44, 6600, 6603.5],
  },
  {
    x: new Date(1538881200000),
    y: [6603.5, 6603.99, 6597.5, 6603.86],
  },
  {
    x: new Date(1538883000000),
    y: [6603.85, 6605, 6600, 6604.07],
  },
  {
    x: new Date(1538884800000),
    y: [6604.98, 6606, 6604.07, 6606],
  }],
}];
const chartOptions :ApexOptions = {
  chart: {
    type: 'candlestick',
    height: 350,
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left',
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

const Chart = () => {
  console.log('<Chart />');

  const [chartData, setChartData] = useState([{ series: initialData, options: chartOptions }]);
  console.log(chartData);
  return (
    <div>
      <ReactApexChart
        options={chartData[0].options}
        series={chartData[0].series}
        type="candlestick"
        height={350}
        width={700}
        // key={chartData[0].name ? chartData[0].name : '01'}
      />
    </div>
  );
};

export default Chart;
