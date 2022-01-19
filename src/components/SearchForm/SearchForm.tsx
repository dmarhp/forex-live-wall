import React, { useState } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { urlBase, urlKey } from '../../utils/constants';
import { setNewRateArray } from '../../store/rateSlice';
import './SearchForm.scss';
import QueryList from '../QueryList/QueryList';

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState({ isLoading: false, isError: false, wrongRequest: false });
  const { isLoading, isError, wrongRequest } = status;
  const { currentRate: { ticker } } = useAppSelector((state) => state.rateReducer);
  const dispatch = useAppDispatch();

  const onFormSubmit = () => {
    const pair = inputValue.replaceAll('/', '');
    setStatus({
      ...status,
      isLoading: true,
    });

    axios.get(`${urlBase}fx/${pair}${urlKey}`)
      .then(({ data }) => {
        const [newData] = data;
        const isDataEmpty = !newData.ticker;

        setStatus({
          isLoading: false,
          isError: isDataEmpty,
          wrongRequest: isDataEmpty,
        });

        if (!isDataEmpty) {
          dispatch(setNewRateArray(newData));
          setInputValue('');
        }
      })
      .catch(() => {
        setStatus({
          ...status,
          isLoading: false,
          isError: true,
        });
      });
  };

  return (
    <div className={`form__wrapper ${!ticker && 'form__start'}`}>
      <h1 className="form__title">FOREX LIVE WALL</h1>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}
      >
        <input
          className="form__input"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value.toUpperCase());
          }}
          placeholder="Enter currency pair... (E.g. EUR/USD)"
        />

        <button className="form__button" disabled={!inputValue}>
          {isLoading
            ? <i className="fas fa-spinner form__button-loading" />
            : <i className="fas fa-search" />}
        </button>
      </form>

      <div className={`form__error ${!isError && 'form__error-hidden'}`}>
        <h3 className="form__error_title">
          Oops Something went wrong
        </h3>

        {wrongRequest && <QueryList />}
      </div>

    </div>
  );
};

export default SearchForm;
