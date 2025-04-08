import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';

export class InventoryPage extends BasePage {
  inventoryItem: Locator;
  addToCartButton: Locator;
  cartButton: Locator;

  constructor(page: Page) {
    super(page, Paths.Inventory);

    this.inventoryItem = this.page.locator('.inventory_item');
    this.addToCartButton = this.page.getByText(/Add to cart/);
    this.cartButton = this.page.locator('#shopping_cart_container a');
  }
}
