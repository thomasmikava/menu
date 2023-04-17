export type IdType = number;

export interface Meal {
  id: IdType;
  name: string;
  dishes: number[];
}

export interface Dish {
  id: IdType;
  name: string;
  imageURL?: string;
}
