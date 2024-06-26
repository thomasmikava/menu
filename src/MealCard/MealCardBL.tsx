import type { FC, ReactElement } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import { dishes } from '../data/dishes';
import type { Meal } from '../data/types';
import { CustomDishesStore, MenuStore } from '../states';
import { isNonNullable } from '../utils';
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
  const customDishes = CustomDishesStore.useValue();
  const mealDishes = useMemo(
    () =>
      meal.dishes
        .filter((dishId) => isEditing || !!mealIdSelections?.[dishId])
        .map((id) => dishes.find((dish) => dish.id === id))
        .filter(isNonNullable),
    [meal.dishes, mealIdSelections, isEditing]
  );
  const myCustomDishes = useMemo(
    () =>
      customDishes
        .filter((dish) => dish.enabledMealIds.includes(meal.id))
        .filter((dish) => isEditing || !!mealIdSelections?.[dish.id]),
    [customDishes, meal.id, isEditing, mealIdSelections]
  );
  const isEmpty = mealDishes.length === 0;

  const isMealCompleted = useMemo(() => {
    return !isEmpty && !!mealCompletedDishIds && mealDishes.every((dish) => !!mealCompletedDishIds[dish.id]);
  }, [mealCompletedDishIds, isEmpty, mealDishes]);

  return children({
    meal,
    dishes: mealDishes,
    customDishes: myCustomDishes,
    isMealCompleted,
  });
});
MealCardBL.displayName = 'MealCardBL';

export default MealCardBL;
