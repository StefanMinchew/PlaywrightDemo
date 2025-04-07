import { Locator } from '@playwright/test';
import { IItem } from '../types/item';

export class ItemComponent {
  quantity: Locator;
  name: Locator;
  description: Locator;
  price: Locator;

  constructor(component: Locator) {
    this.quantity = component.locator('.cart_quantity');
    this.name = component.locator('.inventory_item_name');
    this.description = component.locator('.inventory_item_desc');
    this.price = component.locator('.inventory_item_price');
  }

  async getItemDetails(): Promise<IItem> {
    const [name, description, price] = await Promise.all([
      this.name.innerText(),
      this.description.innerText(),
      this.price.innerText(),
    ]);

    const quantity =
      (await this.quantity.count()) > 0
        ? await this.quantity.innerText()
        : undefined;

    return quantity !== undefined
      ? { name, description, price, quantity }
      : { name, description, price };
  }
}
