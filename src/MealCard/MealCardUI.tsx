import type { ReactElement } from 'react';
import { useState } from 'react';
import { FC, useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { memo } from 'react';
import type { Dish, Meal } from '../data/types';

interface DishProps {
  dish: Dish;
}

export interface MealCardUIRef {
  isMealCompleted: boolean;
  rootElement: HTMLDivElement | null;
}

export interface MealCardUIProps {
  meal: Meal;
  dishes: Dish[];
  isMealCompleted: boolean;
  renderDish: (props: DishProps) => ReactElement;
  renderEmptyState: () => ReactElement;
}

const MealCardUI = memo(
  forwardRef<MealCardUIRef, MealCardUIProps>(({ meal, dishes, isMealCompleted, renderDish, renderEmptyState }, ref) => {
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => ({ isMealCompleted, rootElement }), [isMealCompleted, rootElement]);

    return (
      <div className={'mealcard ' + (isMealCompleted ? 'completed' : '')} ref={setRootElement}>
        <h1 className='title'>{meal.name}</h1>
        <div className='dishes'>{dishes.map((dish) => renderDish({ dish }))}</div>
        {dishes.length === 0 && renderEmptyState()}
      </div>
    );
  })
);
MealCardUI.displayName = 'MealCardUI';

export default MealCardUI;
