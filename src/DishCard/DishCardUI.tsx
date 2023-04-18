import type { FC } from 'react';
import { memo } from 'react';
import type { Dish, IdType } from '../data/types';
import { getPublicURL } from '../utils';

export interface DishCardUIProps {
  dish: Dish;
  mealId: IdType;
  isSelected: boolean;
  isCompleted: boolean;
  isEditing: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

const DishCardUI: FC<DishCardUIProps> = memo(({ dish, isSelected, isCompleted, onClick, onDoubleClick, isEditing }) => {
  return (
    <div className={'dishcard ' + (isCompleted ? 'completed' : '')} onClick={onClick} onDoubleClick={onDoubleClick}>
      <div
        className='photo'
        style={{
          backgroundImage: `url(${getPublicURL(dish.imageURL ?? '/assets/img/fallback.jpg')})`,
        }}
      >
        {isEditing && (
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
