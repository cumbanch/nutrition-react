import React, { useState } from 'react';
import './App.scss';
import NutritionalInformation from './components/NutritionalInformation';
import SearchHeader from './components/SearchHeader';
import FoodContext from './contexts/Food';

function App() {
  const [selectedFood, setSelectedFood] = useState();

  return (
    <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
      <div className="App">
        <SearchHeader />
        {selectedFood && <NutritionalInformation />}
      </div>
    </FoodContext.Provider>
  );
}

export default App;
