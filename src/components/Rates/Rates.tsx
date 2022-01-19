import React from 'react';
import { useAppSelector } from '../../store/hooks';
import './Rates.scss';

const Rates = () => {
  const {
    ticker, date, ask, bid, open, low, high, changes,
  } = useAppSelector((state) => state.rateReducer.currentRate);
  const close = (+open + +changes).toFixed(5);

  const changesClassName = `rates__data_changes-${changes > 0 ? 'positive' : 'negative'}`;

  const rateData = [
    ['Time:', date],
    ['Ask:', ask],
    ['Bid:', bid],
    ['Open:', open],
    ['Close:', close],
    ['Low:', low],
    ['High:', high],
    ['Changes:', changes],
  ];

  return (
    <div className="rates__wrapper">
      <div className="rates">
        <h2 className="rates__ticker">
          {ticker}
        </h2>

        <div className="rates__data_wrapper">
          {rateData.map(([key, value]) => (
            <div
              className="rates__data"
              key={key}
            >

              <h3 className="rates__data_key">
                {key}
              </h3>

              <h3 className={`rates__data_value ${key === 'Changes:' && changesClassName}`}>
                {value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rates;
