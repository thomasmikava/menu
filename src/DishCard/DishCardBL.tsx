import type { FC, ReactElement } from 'react';
import { memo } from 'react';
import type { Dish, IdType } from '../data/types';
import { MenuTempStore } from '../states';
import type { DishCardUIProps } from './DishCardUI';

interface Props {
  dish: Dish;
  mealId: IdType;
  children: (props: DishCardUIProps) => ReactElement;
  isEditing: boolean;
}

const DishCardBL: FC<Props> = memo(({ dish, mealId, children, isEditing }) => {
  const { selectedIds } = MenuTempStore.useValue();
  const addDish = MenuTempStore.useDispatcher('addDish');
  const removeDish = MenuTempStore.useDispatcher('removeDish');
  return children({
    dish,
    mealId,
    isSelected: !!selectedIds[mealId]?.[dish.id],
    onCheck: isEditing
      ? (isChecked) => {
          if (isChecked) addDish({ mealId, dishId: dish.id });
          else removeDish({ mealId, dishId: dish.id });
        }
      : undefined,
    isEditing,
  });
});
DishCardBL.displayName = 'DishCardBL';

export default DishCardBL;
