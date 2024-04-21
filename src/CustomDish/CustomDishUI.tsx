import type { FC } from 'react';
import { memo, useState } from 'react';
import type { CustomDish } from '../data/types';
import Modal from '../UI/Modal';
import { meals } from '../data/meals';

export const CustomDishCardUI: FC<{ onClick: () => void }> = memo(({ onClick }) => {
  return (
    <div onClick={onClick} className={'dishcard addCustomDishcard'}>
      <span>+</span>
    </div>
  );
});

export const CustomDishModalUI: FC<{
  onClose: () => void;
  onSubmit: (data: Omit<CustomDish, 'id'>) => void;
  defaultData?: Omit<CustomDish, 'id'>;
  onDelete?: () => void;
}> = memo(({ onClose, onSubmit, defaultData, onDelete }) => {
  const [name, setName] = useState(defaultData?.name ?? '');
  const [selectedMealIds, setSelectedMealIds] = useState(defaultData?.enabledMealIds ?? []);
  const toggleMeal = (mealId: number) => {
    setSelectedMealIds((prev) => (prev.includes(mealId) ? prev.filter((id) => id !== mealId) : [...prev, mealId]));
  };
  const submit = () => {
    if (!name || selectedMealIds.length < 1) return;
    onSubmit({ name, enabledMealIds: selectedMealIds });
  };
  return (
    <Modal onClose={onClose}>
      <>
        <input
          type='text'
          placeholder='name'
          autoFocus={!defaultData}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <div>
          {meals.map((meal) => (
            <div key={meal.id}>
              <input
                type='checkbox'
                id={`meal-${meal.id}`}
                checked={selectedMealIds.includes(meal.id)}
                onChange={() => toggleMeal(meal.id)}
              />
              <label htmlFor={`meal-${meal.id}`}>{meal.name}</label>
            </div>
          ))}
        </div>
        <button onClick={submit}>Submit</button>
        {onDelete && (
          <>
            <button style={{ float: 'right' }} onClick={onDelete}>
              Delete
            </button>
          </>
        )}
      </>
    </Modal>
  );
});
