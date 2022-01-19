import React, { useState } from 'react';
import './QueryList.scss';
import axios from 'axios';
import { urlBase, urlKey } from '../../utils/constants';
import { APIData } from '../../utils/types';

interface QueryListProps{
  toggleClick: (query: string)=> void
}

const QueryList = ({ toggleClick }:QueryListProps) => {
  const [showList, setShowList] = useState(false);
  const [queryList, setQueryList] = useState<string[]>([]);
  const [queriesToShow, setQueriesToShow] = useState<string[]>([]);

  const onInputChange = (searchValue: string) => {
    let filteredQueries: string[] = [];

    if (searchValue) {
      filteredQueries = queryList.filter((item) => (
        item.includes(searchValue.toUpperCase())
      ));
    }

    setQueriesToShow(filteredQueries);
  };

  if (showList) {
    if (queryList.length === 0) {
      axios.get(`${urlBase}fx${urlKey}`)
        .then(({ data }) => {
          const newList = data.map((item: APIData) => (item.ticker));
          const filteredList = newList.filter((item:string) => item.length === 7);
          setQueryList(filteredList);
        });
    }
  }

  return (
    <div className="query-list__wrapper">
      <div className="query-list">
        <h4 className="query-list__title">
          Wrong query string!
        </h4>

        {showList
          ? (
            <>
              <input
                className="query-list__search"
                onChange={(e) => onInputChange(e.target.value)}
              />

              <div
                className="query-list__list"
              >
                {queriesToShow.map((item) => (
                  <button
                    className="query-list__list_item"
                    onClick={() => { toggleClick(item); }}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )

          : (
            <button
              className="query-list__button"
              onClick={() => setShowList(!showList)}
            >
              Show available currency pairs
            </button>
          )}
      </div>
    </div>
  );
};

export default QueryList;
