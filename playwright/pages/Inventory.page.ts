import { Locator, Page } from "@playwright/test";
import { Paths } from "../../config/paths";
import { BasePage } from "./base/Base.page";
import { ItemComponent } from "../src/components/Item.component";

export class InventoryPage extends BasePage {
  readonly _url = Paths.Inventory;

  firstItem: Locator;
  addToCartButton: Locator;
  cartButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstItem = this.page.locator(".inventory_item").first();
    this.addToCartButton = this.page.getByText(/Add to cart/);
    this.cartButton = this.page.locator("#shopping_cart_container a");
  }

  getInventoryItem(locator: Locator) {
    return new ItemComponent(locator);
  }
}
