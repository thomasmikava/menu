import React from 'react';
import './App.css';
import { meals } from './data/meals';
import MealCard from './MealCard';

const App = () => {
  return (
    <div className='App'>
      <div className='header'>
        <button>Edit</button>
      </div>
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default App;
