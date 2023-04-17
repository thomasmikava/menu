import type { FC } from 'react';
import { memo } from 'react';
import React, { useMemo } from 'react';
import { dishes } from './data/dishes';
import type { Meal } from './data/types';
import DishCard from './DishCard';

interface Props {
  meal: Meal;
}

const MealCard: FC<Props> = memo(({ meal }) => {
  const mealDishes = useMemo(() => dishes.filter((dish) => meal.dishes.includes(dish.id)), [meal.dishes]);

  return (
    <div className='mealcard'>
      <h1 className='title'>{meal.name}</h1>
      <div className='dishes'>
        {mealDishes.map((dish) => (
          <DishCard key={dish.id} mealId={meal.id} dish={dish} />
        ))}
      </div>
    </div>
  );
});

export default MealCard;
