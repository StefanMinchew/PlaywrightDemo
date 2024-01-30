import { Locator, Page } from "@playwright/test";
import { Paths } from "../../config/paths";
import { BasePage } from "./base/Base.page";
import { ItemComponent } from "../src/components/Item.component";

export class CheckoutStepTwo extends BasePage {
  readonly _url = Paths.CheckoutStepTwo;

  firstStepTwoItem: Locator;
  finishButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstStepTwoItem = this.page.locator(".cart_item").first();
    this.finishButton = this.page.getByText(/Finish/);
  }

  getStepTwoItem(locator: Locator) {
    return new ItemComponent(locator);
  }
}
