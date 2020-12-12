import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import FoodContext from '../contexts/Food';
import './SearchHeader.scss';
import SearchInput from './SearchInput';

export default function SearchHeader() {
  const [smallHeader, setSmallHeader] = useState(false);
  const { selectedFood } = React.useContext(FoodContext);
  const props = useSpring({
    height: smallHeader ? '10vh' : '100vh',
  });

  useEffect(() => {
    setSmallHeader(!!selectedFood);
  }, [selectedFood]);

  return (
    <animated.div className="header-container" style={props}>
      <div className="title-container flex items-center">
        <h1
          className={`text-5xl transition duration-200 font-bold ${smallHeader ? 'opacity-0 h-0' : ''}`}
        >
          What do you
          <span className="block text-blue-400">
            want to eat?
          </span>
        </h1>
      </div>
      <div className="w-full flex justify-center relative">
        <SearchInput />
      </div>
    </animated.div>
  );
}
