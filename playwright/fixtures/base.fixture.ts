import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from "../pages/Inventory.page";
import { CartPage } from "../pages/Cart.page";
import { CheckoutStepOne } from "../pages/CheckoutStepOne.page";
import { CheckoutStepTwo } from "../pages/CheckoutStepTwo.page";
import { CheckoutComplete } from "../pages/CheckoutComplete.page";

type MyFixutres = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOne: CheckoutStepOne;
  checkoutStepTwo: CheckoutStepTwo;
  checkoutComplete: CheckoutComplete;
};

export const test = base.extend<MyFixutres>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOne: async ({ page }, use) => {
    await use(new CheckoutStepOne(page));
  },
  checkoutStepTwo: async ({ page }, use) => {
    await use(new CheckoutStepTwo(page));
  },
  checkoutComplete: async ({ page }, use) => {
    await use(new CheckoutComplete(page));
  },
});

export { expect } from "@playwright/test";
