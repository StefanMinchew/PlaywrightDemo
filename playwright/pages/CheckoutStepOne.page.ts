import { Locator, Page } from "@playwright/test";
import { Paths } from "../../config/paths";
import { BasePage } from "./base/Base.page";

export class CheckoutStepOne extends BasePage {
  readonly _url = Paths.CheckoutStepOne;

  firstNameField: Locator;
  lastNameField: Locator;
  postalCodeField: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameField = this.page.getByPlaceholder(/First Name/);
    this.lastNameField = this.page.getByPlaceholder(/Last Name/);
    this.postalCodeField = this.page.getByPlaceholder(/Zip\/Postal Code/);
    this.continueButton = this.page.getByText(/Continue/);
  }
}
