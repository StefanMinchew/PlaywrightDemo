import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';

export class CheckoutStepTwo extends BasePage {
  finishButton: Locator;

  constructor(page: Page) {
    super(page, Paths.CheckoutStepTwo);

    this.finishButton = this.page.getByText(/Finish/);
  }
}
