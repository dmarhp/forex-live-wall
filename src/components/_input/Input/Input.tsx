import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../../store/hooks';
import { setPair } from '../../../store/settingSlice';
import { getRateFromAPI } from '../../../utils/dataLocal';
import { setNewRateArray } from '../../../store/rateSlice';
// searchform
const Input = () => {
  console.log('<Input />');

  const [inputValue, setInputValue] = useState('');
  const dispatch = useAppDispatch();

  const onSearchBtnClick = () => {
    const urlBase = 'https://financialmodelingprep.com/api/v3/fx/';
    const urlKey = '?apikey=538c650811c84ca609c3ac2b342b7785';
    const pair = inputValue.replaceAll('/', '');

    axios.get(`${urlBase}${pair}${urlKey}`).then(({ data }) => {
      const [newData] = data;

      if (newData.ticker) {
        dispatch(setPair(newData.ticker));// 1 state
        dispatch(setNewRateArray(newData));
      }
    });
  };

  // onsubmit

  return (
    <div>
      <form>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value.toUpperCase())} />
        <button onClick={(e) => {
          e.preventDefault();
          onSearchBtnClick();
        }}
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default Input;
