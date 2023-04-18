import React, { useState } from 'react';
import './App.css';
import { meals } from './data/meals';
import DishCardBL from './DishCard/DishCardBL';
import DishCardUI from './DishCard/DishCardUI';
import MealCardBL from './MealCard/MealCardBL';
import MealCard from './MealCard/MealCardUI';
import { EditModeStore, MenuStore, MenuTempStore } from './states';
import { getPublicURL } from './utils';

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

const Header = () => {
  const [mode, setMode] = EditModeStore.useState();
  const [isClearClicked, setIsClearClicked] = useState(false);

  const getMenuValue = MenuStore.useValueGetterFn();
  const setMenuValue = MenuStore.useValueSetterFn();
  const getMenuTempValue = MenuTempStore.useValueGetterFn();
  const setMenuTempValue = MenuTempStore.useValueSetterFn();

  const handleSave = () => {
    setMenuValue((menu) => {
      const temp = getMenuTempValue();
      return { ...menu, selectedIds: temp.selectedIds, completedIds: isClearClicked ? {} : menu.completedIds };
    });
    setMode('view');
    setIsClearClicked(false);
  };

  const handleCancel = () => {
    setMode('view');
    setIsClearClicked(false);
  };

  const switchToEditMode = () => {
    setMode('edit');
    const menu = getMenuValue();
    setMenuTempValue({
      selectedIds: menu.selectedIds,
    });
    setIsClearClicked(false);
  };

  const handleClear = () => {
    setMenuTempValue({ selectedIds: {} });
    setIsClearClicked(true);
  };

  return (
    <div className='header'>
      {mode === 'view' && <button onClick={switchToEditMode}>რედაქტირება</button>}
      {mode === 'edit' && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <button onClick={handleSave}>შენახვა</button>
            <button onClick={handleCancel}>X</button>
          </div>
          <div>
            <button onClick={handleClear}>გასუფთავება</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
