import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';

export class CartPage extends BasePage {
  cartItem: Locator;
  checkout: Locator;

  constructor(page: Page) {
    super(page, Paths.Cart);

    this.cartItem = this.page.locator('.cart_item');
    this.checkout = this.page.getByText(/Checkout/);
  }
}
