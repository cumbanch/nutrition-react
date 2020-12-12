import React, { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import apiClient from '../services/api-client';
import FoodContext from '../contexts/Food';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearch, setSelectedSearch] = useState(false);
  const [recomendations, setRecomendations] = useState([]);
  const { setSelectedFood } = React.useContext(FoodContext);

  useEffect(() => {
    if (searchTerm !== '' && !selectedSearch) {
      apiClient.get(`${process.env.REACT_APP_BASE_URL}/search/instant`, {
        params: {
          query: searchTerm,
        },
      }).then((res) => {
        setRecomendations([...res.data.common.slice(0, 5)]);
      });
    } else {
      setRecomendations([]);
    }
    setSelectedSearch(false);
  }, [searchTerm]);

  const selectFood = (foodName) => {
    setSelectedSearch(true);
    setSelectedFood(foodName);
    setSearchTerm(foodName);
    setRecomendations([]);
  };

  return (
    <form
      className="w-11/12 md:w-1/2 md:mx-0 relative flex items-center rounded-md bg-white shadow-md"
    >
      <svg className="h-5 text-gray-400 px-4 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <DebounceInput
        className="focus:outline-none py-4 text-lg placeholder-gray-500 w-10/12"
        placeholder="Search in our nutrition database"
        minLength={2}
        debounceTimeout={300}
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
        className="focus:outline-none px-5 absolute h-12 right-2"
        type="button"
        onClick={() => {
          setSearchTerm('');
          setSelectedFood('');
        }}
      >
        <svg className="h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {recomendations.length > 0 && (
        <div className="absolute flex flex-col top-16 bg-white w-full rounded-md py-1 shadow-md">
          {recomendations.map((recomendation) => (
            <button
              type="button"
              key={recomendation.tag_id + recomendation.food_name}
              className="text-left py-2 px-6 font-medium cursor-pointer hover:bg-gray-200"
              onClick={() => selectFood(recomendation.food_name)}
            >
              {recomendation.food_name}
            </button>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchInput;
