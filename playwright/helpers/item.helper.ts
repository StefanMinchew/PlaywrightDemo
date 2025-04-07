import { expect } from '@playwright/test';
import { IItem } from '../types/item';

export const verifyItemsMatch = (item1: IItem, item2: IItem): void => {
  expect(item1.name).toEqual(item2.name);
  expect(item1.description).toEqual(item2.description);
  expect(item1.price).toEqual(item2.price);

  if (item1.quantity !== undefined && item2.quantity !== undefined) {
    expect(item1.quantity).toEqual(item2.quantity);
  }
};
