import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import { dishes } from '../data/dishes';
import type { Meal } from '../data/types';
import { MenuStore } from '../states';
import type { MealCardUIProps } from './MealCardUI';

interface Props {
  meal: Meal;
  isEditing: boolean;
  children: (props: Omit<MealCardUIProps, 'renderDish' | 'renderEmptyState'>) => ReactElement;
}

const MealCardBL: FC<Props> = memo(({ meal, isEditing, children }) => {
  const {
    selectedIds: { [meal.id]: mealIdSelections },
    completedIds: { [meal.id]: mealCompletedDishIds },
  } = MenuStore.useValue();
  const mealDishes = useMemo(
    () => dishes.filter((dish) => (isEditing || !!mealIdSelections?.[dish.id]) && meal.dishes.includes(dish.id)),
    [meal.dishes, mealIdSelections, isEditing]
  );
  const isEmpty = mealDishes.length === 0;

  const isMealCompleted = useMemo(() => {
    return !isEmpty && !!mealCompletedDishIds && mealDishes.every((dish) => !!mealCompletedDishIds[dish.id]);
  }, [mealCompletedDishIds, isEmpty, mealDishes]);

  return children({
    meal,
    dishes: mealDishes,
    isMealCompleted,
  });
});
MealCardBL.displayName = 'MealCardBL';

export default MealCardBL;
