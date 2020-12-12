import React, { useEffect, useState } from 'react';
import FoodContext from '../contexts/Food';
import apiClient from '../services/api-client';
import NutritionalItem from './NutritionalItem';

function NutritionalInformation() {
  const [nutritionalInfo, setNutritionalInfo] = useState({});
  const { selectedFood } = React.useContext(FoodContext);

  const getFoodNutritionalInfo = () => apiClient.post(
    `${process.env.REACT_APP_BASE_URL}/natural/nutrients`,
    {
      query: selectedFood,
    },
  ).then((res) => setNutritionalInfo(res.data.foods[0]));

  useEffect(() => {
    if (selectedFood) getFoodNutritionalInfo();
  }, [selectedFood]);

  return (
    nutritionalInfo.food_name
      ? (
        <div
          className="w-11/12 md:w-1/2 m-auto mt-12"
        >
          <div className="flex flex-wrap flex-1">
            <div className="flex flex-col text-left w-1/2 mt-6">
              <span className="text-3xl capitalize text-blue-500 font-bold">
                {nutritionalInfo.food_name}
              </span>
              <span className="text-sm text-gray-500 font-medium mb-8">
                {nutritionalInfo.nf_calories.toFixed(1)}
                <span className="ml-1">cals</span>
              </span>
              <NutritionalItem backgroundColor="#1E86FF" title="protein" amount={nutritionalInfo.nf_protein} measurement="g" />
              <NutritionalItem backgroundColor="#7FE4F0" title="Carbohydrates " amount={nutritionalInfo.nf_total_carbohydrate} measurement="mg" />
              <NutritionalItem title="Dietary Fiber" amount={nutritionalInfo.nf_dietary_fiber} measurement="g" />
              <NutritionalItem title="Sugars" amount={nutritionalInfo.nf_sugars} measurement="g" />
              <NutritionalItem backgroundColor="#8B80F8" title="Total Fat" amount={nutritionalInfo.nf_total_fat} measurement="g" />
              <NutritionalItem title="Saturated Fat" amount={nutritionalInfo.nf_saturated_fat} measurement="g" />
              <NutritionalItem title="unsaturated Fat" amount={nutritionalInfo.nf_total_fat - nutritionalInfo.nf_saturated_fat} measurement="g" />
              <NutritionalItem backgroundColor="#FFBD54" title="Cholesterol" amount={nutritionalInfo.nf_cholesterol} measurement="mg" />
              <NutritionalItem backgroundColor="#B5CADC" title="Sodium" amount={nutritionalInfo.nf_sodium} measurement="mg" />
              <NutritionalItem backgroundColor="#8B80F8" title="Potassium" amount={nutritionalInfo.nf_potassium} measurement="mg" />
            </div>
            <div className="w-1/2">
              <img
                src={nutritionalInfo.photo.highres || nutritionalInfo.photo.thumb}
                alt={nutritionalInfo.food_name}
              />
            </div>
          </div>
        </div>
      )
      : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )

  );
}

export default NutritionalInformation;
