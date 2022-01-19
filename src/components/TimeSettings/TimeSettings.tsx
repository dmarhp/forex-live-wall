import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './TimeSettings.scss';
import { setTimeFrame } from '../../store/rateSlice';

const TimeSettings = () => {
  const timeframe = useAppSelector((state) => state.rateReducer.timeFrame);
  const dispatch = useAppDispatch();

  const options = [5, 10, 15, 20, 30, 60];

  return (
    <div className="settings__wrapper">
      <h2 className="settings__title">
        Time frame:
      </h2>

      <div className="settings__button_wrapper">
        {options.map((option) => (
          <button
            className={`settings__button ${option === timeframe && 'settings__button-active'}`}
            onClick={() => dispatch(setTimeFrame(option))}
            key={option}
          >
            {`${option} s`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSettings;
