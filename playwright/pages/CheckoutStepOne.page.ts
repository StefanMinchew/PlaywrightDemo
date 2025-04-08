import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { BasePage } from './Base.page';

export class CheckoutStepOne extends BasePage {
  firstNameField: Locator;
  lastNameField: Locator;
  postalCodeField: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    super(page, Paths.CheckoutStepOne);

    this.firstNameField = this.page.getByPlaceholder(/First Name/);
    this.lastNameField = this.page.getByPlaceholder(/Last Name/);
    this.postalCodeField = this.page.getByPlaceholder(/Zip\/Postal Code/);
    this.continueButton = this.page.getByText(/Continue/);
  }
}
