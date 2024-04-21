import type { FC, ReactElement } from 'react';
import { memo, useState } from 'react';
import type { Dish, IdType } from '../data/types';
import { MenuStore, MenuTempStore } from '../states';
import type { DishCardUIProps } from './DishCardUI';

interface Props {
  dish: Dish;
  mealId: IdType;
  children: (props: DishCardUIProps & { isModalOpen: boolean; onModalClose: () => void }) => ReactElement;
  isEditing: boolean;
}

const DishCardBL: FC<Props> = memo(({ dish, mealId, children, isEditing }) => {
  const isSelected = !!MenuTempStore.useSelector((x) => x.selectedIds[mealId]?.[dish.id]);
  const isCompleted = !!MenuStore.useSelector((x) => x.completedIds[mealId]?.[dish.id]);
  const addDish = MenuTempStore.useDispatcher('addDish');
  const removeDish = MenuTempStore.useDispatcher('removeDish');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const completeDish = MenuStore.useDispatcher('completeDish');
  const uncompleteDish = MenuStore.useDispatcher('uncompleteDish');

  return children({
    dish,
    mealId,
    isSelected,
    isCompleted: isCompleted && !isEditing,
    onClick: () => {
      if (!isEditing) return;
      if (!isSelected) addDish({ mealId, dishId: dish.id });
      else removeDish({ mealId, dishId: dish.id });
    },
    onDoubleClick: () => {
      window.getSelection()?.removeAllRanges();
      if (isEditing) return;
      if (!isCompleted) completeDish({ mealId, dishId: dish.id });
      else uncompleteDish({ mealId, dishId: dish.id });
    },
    isEditing,
    onEdit: isEditing && dish.id < 0 ? openModal : undefined,
    isModalOpen,
    onModalClose: closeModal,
  });
});
DishCardBL.displayName = 'DishCardBL';

export default DishCardBL;
