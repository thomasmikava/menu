/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createStore } from 'stafly';
import type { IdType } from './data/types';
import { createStorageStore } from './stafly';

export const EditModeStore = createStore({
  defaultValue: 'view' as 'view' | 'edit',
});

const tempValue = {
  selectedIds: {} as { [mealId in string]?: { [dishId in IdType]?: boolean } },
};

export const MenuTempStore = createStore({
  defaultValue: tempValue,
}).addReducers({
  addDish: (value, { dishId, mealId }: { dishId: IdType; mealId: IdType }) => {
    return {
      ...value,
      selectedIds: {
        ...value.selectedIds,
        [mealId]: { ...value.selectedIds[mealId], [dishId]: true },
      },
    };
  },
  removeDish: (value, { dishId, mealId }: { dishId: IdType; mealId: IdType }) => {
    return {
      ...value,
      selectedIds: {
        ...value.selectedIds,
        [mealId]: { ...value.selectedIds[mealId], [dishId]: false },
      },
    };
  },
});

export const MenuStore = createStorageStore({
  defaultValue: tempValue,
  storageKey: '__menu__menuStore',
});
