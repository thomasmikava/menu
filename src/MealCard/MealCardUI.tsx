import type { FC, ReactElement } from 'react';
import { memo } from 'react';
import type { Dish, Meal } from '../data/types';

interface DishProps {
  dish: Dish;
}

export interface MealCardUIProps {
  meal: Meal;
  dishes: Dish[];
  renderDish: (props: DishProps) => ReactElement;
  renderEmptyState: () => ReactElement;
}

const MealCardUI: FC<MealCardUIProps> = memo(({ meal, dishes, renderDish, renderEmptyState }) => {
  return (
    <div className='mealcard'>
      <h1 className='title'>{meal.name}</h1>
      <div className='dishes'>{dishes.map((dish) => renderDish({ dish }))}</div>
      {dishes.length === 0 && renderEmptyState()}
    </div>
  );
});
MealCardUI.displayName = 'MealCardUI';

export default MealCardUI;
