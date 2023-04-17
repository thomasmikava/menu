import type { FC } from 'react';
import { memo } from 'react';
import type { Dish, IdType } from './data/types';

interface Props {
  dish: Dish;
  mealId: IdType;
}

const DishCard: FC<Props> = memo(({ dish }) => {
  const isChecked = Math.random() > 0.5;
  return (
    <div className='dishcard'>
      <div
        className='photo'
        style={{
          backgroundImage: `url(${dish.imageURL ?? '/assets/img/fallback.jpg'})`,
        }}
      >
        <div className={'checkbox ' + (isChecked ? 'checked' : 'unchecked')}>
          <div className='inner'></div>
        </div>
      </div>
      <h3 className='title'>{dish.name}</h3>
    </div>
  );
});

export default DishCard;
