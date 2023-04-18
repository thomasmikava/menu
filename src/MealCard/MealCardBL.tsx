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
  } = MenuStore.useValue();
  const mealDishes = useMemo(
    () => dishes.filter((dish) => (isEditing || !!mealIdSelections?.[dish.id]) && meal.dishes.includes(dish.id)),
    [meal.dishes, mealIdSelections, isEditing]
  );

  return children({
    meal,
    dishes: mealDishes,
  });
});
MealCardBL.displayName = 'MealCardBL';

export default MealCardBL;
