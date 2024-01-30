import { Locator, Page } from "@playwright/test";
import { Paths } from "../../config/paths";
import { BasePage } from "./base/Base.page";
import { ItemComponent } from "../src/components/Item.component";

export class CartPage extends BasePage {
  readonly _url = Paths.Cart;

  firstCartItem: Locator;
  checkout: Locator;

  constructor(page: Page) {
    super(page);

    this.firstCartItem = this.page.locator(".cart_item").first();
    this.checkout = this.page.getByText(/Checkout/);
  }

  getCartItem(locator: Locator) {
    return new ItemComponent(locator);
  }
}
