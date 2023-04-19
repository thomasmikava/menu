import { createRef, useEffect, useState } from 'react';
import './App.css';
import { meals } from './data/meals';
import DishCardBL from './DishCard/DishCardBL';
import DishCardUI from './DishCard/DishCardUI';
import Header from './Header';
import MealCardBL from './MealCard/MealCardBL';
import type { MealCardUIRef } from './MealCard/MealCardUI';
import MealCard from './MealCard/MealCardUI';
import { EditModeStore } from './states';
import { getPublicURL, scrollTo } from './utils';

const App = () => {
  const mode = EditModeStore.useValue();
  const [refs] = useState(() => {
    return Object.fromEntries(meals.map((meal) => [meal.id, createRef<MealCardUIRef>()]));
  });

  useEffect(() => {
    if (mode !== 'view') return;
    for (const meal of meals) {
      const info = refs[meal.id]?.current;
      if (info && !info.isMealCompleted) {
        setTimeout(() => {
          const rootElement = refs[meal.id]?.current?.rootElement;
          rootElement && scrollTo(rootElement, -44, 'auto');
        }, 0);
        break;
      }
    }
  }, [mode, refs]);

  return (
    <div className='App'>
      <Header />
      {meals.map((meal) => (
        <MealCardBL key={meal.id} meal={meal} isEditing={mode === 'edit'}>
          {(mealProps) => (
            <MealCard
              {...mealProps}
              ref={refs[meal.id]}
              renderDish={({ dish }) => (
                <DishCardBL dish={dish} mealId={meal.id} key={dish.id} isEditing={mode === 'edit'}>
                  {(props) => <DishCardUI {...props} />}
                </DishCardBL>
              )}
              renderEmptyState={() => (
                <div className='empty-plate'>
                  <img src={getPublicURL('/assets/img/empty-plate.png')} alt='not found' />
                </div>
              )}
            />
          )}
        </MealCardBL>
      ))}
    </div>
  );
};

export default App;
