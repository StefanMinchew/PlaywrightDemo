import { Locator, Page } from "@playwright/test";
import { Paths } from "../../config/paths";
import { BasePage } from "./base/Base.page";

export class CheckoutComplete extends BasePage {
  readonly _url = Paths.CheckoutComplete;

  thankYou: Locator;
  backHome: Locator;

  constructor(page: Page) {
    super(page);

    this.thankYou = this.page.getByRole("heading", {
      name: "Thank you for your order!",
    });
    this.backHome = this.page.getByText(/Back Home/);
  }
}
