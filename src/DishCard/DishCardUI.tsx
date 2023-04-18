import type { FC } from 'react';
import { memo } from 'react';
import type { Dish, IdType } from '../data/types';
import { getPublicURL } from '../utils';

export interface DishCardUIProps {
  dish: Dish;
  mealId: IdType;
  isSelected: boolean;
  isEditing: boolean;
  onCheck?: (value: boolean) => void;
}

const DishCardUI: FC<DishCardUIProps> = memo(({ dish, isSelected, onCheck, isEditing }) => {
  return (
    <div
      className='dishcard'
      onClick={() => {
        isEditing && onCheck?.(!isSelected);
      }}
    >
      <div
        className='photo'
        style={{
          backgroundImage: `url(${getPublicURL(dish.imageURL ?? '/assets/img/fallback.jpg')})`,
        }}
      >
        {onCheck && (
          <div className={'checkbox ' + (isSelected ? 'checked' : 'unchecked')}>
            <div className='inner'></div>
          </div>
        )}
      </div>
      <h3 className='title'>{dish.name}</h3>
    </div>
  );
});
DishCardUI.displayName = 'DishCardUI';

export default DishCardUI;
