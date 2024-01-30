import { Locator } from "@playwright/test";
export class ItemComponent {
  quantity: Locator;
  name: Locator;
  description: Locator;
  price: Locator;

  constructor(component: Locator) {
    this.quantity = component.locator(".cart_quantity");
    this.name = component.locator(".inventory_item_name");
    this.description = component.locator(".inventory_item_desc");
    this.price = component.locator(".inventory_item_price");
  }
}
