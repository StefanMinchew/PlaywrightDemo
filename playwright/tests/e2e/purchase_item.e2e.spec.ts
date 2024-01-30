import { expect, test } from "../../fixtures/base.fixture";

test.describe("Purchase item E2E", () => {
  let inventoryName: string;
  let inventoryDescription: string;
  let inventoryPrice: string;
  let cartName: string;
  let cartDescription: string;
  let cartPrice: string;
  let stepTwoName: string;
  let stepTwoDescription: string;
  let stepTwoPrice: string;
  const firstName: string = "John";
  const lastName: string = "Doe";
  const postalCode: string = "1000";

  test.beforeEach(async ({ inventoryPage }) => {
    await test.step("GIVEN: user is on the inventory page", async () => {
      await inventoryPage.open();
    });
  });

  test("Submit a purchase of an item", async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
  }) => {
    await test.step("WHEN: User adds an item to the cart", async () => {
      const firstInventoryItem = inventoryPage.getInventoryItem(
        inventoryPage.firstItem
      );
      inventoryName = await firstInventoryItem.name.innerText();
      inventoryDescription = await firstInventoryItem.description.innerText();
      inventoryPrice = await firstInventoryItem.price.innerText();
      await inventoryPage.addToCartButton.first().click();
    });

    await test.step("AND: And opens the cart", async () => {
      await inventoryPage.cartButton.click();
    });

    await test.step("THEN: The added item appears correctly in the cart", async () => {
      const firstCartItem = cartPage.getCartItem(cartPage.firstCartItem);
      cartName = await firstCartItem.name.innerText();
      cartDescription = await firstCartItem.description.innerText();
      cartPrice = await firstCartItem.price.innerText();
      expect(cartName).toEqual(inventoryName);
      expect(cartDescription).toEqual(inventoryDescription);
      expect(cartPrice).toEqual(inventoryPrice);
    });

    await test.step("WHEN: The user clicks on the checkout button", async () => {
      await cartPage.checkout.click();
    });

    await test.step("AND: Fills with information", async () => {
      await checkoutStepOne.firstNameField.fill(firstName);
      await checkoutStepOne.lastNameField.fill(lastName);
      await checkoutStepOne.postalCodeField.fill(postalCode);
    });

    await test.step("AND: Clicks continue", async () => {
      await checkoutStepOne.continueButton.click();
    });

    await test.step("THEN: The added item appears correctly in the cart", async () => {
      const firstStepTwoItem = checkoutStepTwo.getStepTwoItem(
        checkoutStepTwo.firstStepTwoItem
      );
      stepTwoName = await firstStepTwoItem.name.innerText();
      stepTwoDescription = await firstStepTwoItem.description.innerText();
      stepTwoPrice = await firstStepTwoItem.price.innerText();
      expect(cartName).toEqual(stepTwoName);
      expect(cartDescription).toEqual(stepTwoDescription);
      expect(cartPrice).toEqual(stepTwoPrice);
    });

    await test.step("WHEN: The user clicks finish", async () => {
      await checkoutStepTwo.finishButton.click();
    });

    await test.step("THEN: He sees a successful notification", async () => {
      await expect(checkoutComplete.thankYou).toBeVisible();
    });

    await test.step("WHEN: Clicks on back home button", async () => {
      await checkoutComplete.backHome.click();
    });

    await test.step("THEN: The user is redirected to the inventory page", async () => {
      await expect(inventoryPage.firstItem).toBeVisible();
    });
  });
});
