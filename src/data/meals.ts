import type { Meal } from './types';

export const meals: Meal[] = [
  {
    id: 1,
    name: 'საუზმე',
    dishes: [1, 2, 3, 4, 21],
  },
  {
    id: 2,
    name: 'საუზმის წახემსება',
    dishes: [5, 6, 21],
  },
  {
    id: 3,
    name: 'სადილი',
    dishes: [7, 8, 9, 21],
  },
  {
    id: 4,
    name: 'სადილის წახემსება',
    dishes: [10, 11, 20, 12, 13, 14, 22, 23, 21],
  },
  {
    id: 5,
    name: 'ვახშამი',
    dishes: [15, 16, 19, 21],
  },
  {
    id: 6,
    name: 'პოსტ ვახშამი',
    dishes: [17, 18, 21],
  },
];
