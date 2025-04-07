import { expect, test } from '../fixtures/base.fixture';
import { verifyItemsMatch } from '../helpers/item.helper';
import { IItem } from '../types/item';

test.describe('Purchase item E2E', () => {
  const firstName: string = 'John';
  const lastName: string = 'Doe';
  const postalCode: string = '1000';

  let inventoryItem: IItem, itemBeforeCheckout: IItem, stepTwoItem: IItem;

  test.beforeEach(async ({ inventoryPage }) => {
    await test.step('GIVEN: The user is on the inventory page', async () => {
      await inventoryPage.open();
    });
  });

  test('Submit a purchase of an item', async ({
    inventoryPage,
    cartPage,
    checkoutStepOne,
    checkoutStepTwo,
    checkoutComplete,
  }) => {
    await test.step('WHEN: The user adds an item to the cart', async () => {
      inventoryItem = await inventoryPage
        .getItem(inventoryPage.inventoryItem.first())
        .getItemDetails();

      await inventoryPage.addToCartButton.first().click();
    });

    await test.step('AND: And opens the cart', async () => {
      await inventoryPage.cartButton.click();
    });

    await test.step('AND: Verifies item in cart before checkout', async () => {
      itemBeforeCheckout = await cartPage
        .getItem(cartPage.cartItem.first())
        .getItemDetails();

      verifyItemsMatch(inventoryItem, itemBeforeCheckout);
    });

    await test.step('AND: The user clicks on the checkout button', async () => {
      await cartPage.checkout.click();
    });

    await test.step('AND: Fills with information', async () => {
      await checkoutStepOne.firstNameField.fill(firstName);
      await checkoutStepOne.lastNameField.fill(lastName);
      await checkoutStepOne.postalCodeField.fill(postalCode);
    });

    await test.step('AND: Clicks continue', async () => {
      await checkoutStepOne.continueButton.click();
    });

    await test.step('THEN: The added item appears correctly in the cart', async () => {
      stepTwoItem = await cartPage
        .getItem(cartPage.cartItem.first())
        .getItemDetails();

      verifyItemsMatch(itemBeforeCheckout, stepTwoItem);
    });

    await test.step('WHEN: The user clicks finish', async () => {
      await checkoutStepTwo.finishButton.click();
    });

    await test.step('THEN: The user sees a successful notification', async () => {
      await expect(checkoutComplete.thankYou).toBeVisible();
    });

    await test.step('WHEN: Clicks on back to home button', async () => {
      await checkoutComplete.backHome.click();
    });

    await test.step('THEN: The user is redirected to the inventory page', async () => {
      await expect(inventoryPage.inventoryItem.first()).toBeVisible();
    });
  });
});
