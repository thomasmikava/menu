/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createStore } from 'stafly';
import type { CustomDish, IdType } from './data/types';
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
  defaultValue: { ...tempValue, completedIds: { ...tempValue.selectedIds } },
  storageKey: '__menu__menuStore',
  storageValueValidator: (data) => {
    return !!data && typeof data === 'object' && 'selectedIds' in data && 'completedIds' in data;
  },
}).addReducers({
  completeDish: (value, { dishId, mealId }: { dishId: IdType; mealId: IdType }) => {
    return {
      ...value,
      completedIds: {
        ...value.completedIds,
        [mealId]: { ...value.completedIds[mealId], [dishId]: true },
      },
    };
  },
  uncompleteDish: (value, { dishId, mealId }: { dishId: IdType; mealId: IdType }) => {
    return {
      ...value,
      completedIds: {
        ...value.completedIds,
        [mealId]: { ...value.completedIds[mealId], [dishId]: false },
      },
    };
  },
});

export const CustomDishesStore = createStorageStore({
  defaultValue: [] as CustomDish[],
  storageKey: '__menu__customDishes',
  storageValueValidator: (data) => {
    return !!data && typeof data === 'object' && Array.isArray(data);
  },
}).addReducers({
  add: (value, newDish: Omit<CustomDish, 'id'>): CustomDish[] => {
    const minId = Math.min(0, ...value.map((e) => e.id));
    const newId = minId - 1;
    return [...value, { ...newDish, id: newId }];
  },
  delete: (value, id: IdType) => {
    return value.filter((e) => e.id !== id);
  },
  edit: (value, newDish: CustomDish) => {
    return value.map((e) => (e.id === newDish.id ? newDish : e));
  },
});
