import React from 'react';
import './App.css';
import { meals } from './data/meals';
import DishCardBL from './DishCard/DishCardBL';
import DishCardUI from './DishCard/DishCardUI';
import MealCardBL from './MealCard/MealCardBL';
import MealCard from './MealCard/MealCardUI';
import { EditModeStore, MenuStore, MenuTempStore } from './states';

const App = () => {
  const mode = EditModeStore.useValue();

  return (
    <div className='App'>
      <Header />
      {meals.map((meal) => (
        <MealCardBL key={meal.id} meal={meal} isEditing={mode === 'edit'}>
          {(mealProps) => (
            <MealCard
              {...mealProps}
              renderDish={({ dish }) => (
                <DishCardBL dish={dish} mealId={meal.id} key={dish.id} isEditing={mode === 'edit'}>
                  {(props) => <DishCardUI {...props} />}
                </DishCardBL>
              )}
              renderEmptyState={() => (
                <div className='empty-plate'>
                  <img src='/assets/img/empty-plate.png' alt='not found' />
                </div>
              )}
            />
          )}
        </MealCardBL>
      ))}
    </div>
  );
};

const Header = () => {
  const [mode, setMode] = EditModeStore.useState();

  const getMenuValue = MenuStore.useValueGetterFn();
  const setMenuValue = MenuStore.useValueSetterFn();
  const getMenuTempValue = MenuTempStore.useValueGetterFn();
  const setMenuTempValue = MenuTempStore.useValueSetterFn();

  const handleSave = () => {
    setMenuValue(getMenuTempValue());
    setMode('view');
  };

  const handleCancel = () => {
    setMode('view');
  };

  const switchToEditMode = () => {
    setMode('edit');
    setMenuTempValue(getMenuValue());
  };

  return (
    <div className='header'>
      {mode === 'view' && <button onClick={switchToEditMode}>რედაქტირება</button>}
      {mode === 'edit' && (
        <div>
          <button onClick={handleSave}>შენახვა</button>
          <button onClick={handleCancel}>გაუქმება</button>
        </div>
      )}
    </div>
  );
};

export default App;
