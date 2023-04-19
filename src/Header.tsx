import { useState } from 'react';
import { EditModeStore, MenuStore, MenuTempStore } from './states';

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

export default Header;
