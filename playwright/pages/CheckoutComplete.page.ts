import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';

export class CheckoutComplete extends BasePage {
  thankYou: Locator;
  backHome: Locator;

  constructor(page: Page) {
    super(page, Paths.CheckoutComplete);

    this.thankYou = this.page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
    this.backHome = this.page.getByText(/Back Home/);
  }
}
