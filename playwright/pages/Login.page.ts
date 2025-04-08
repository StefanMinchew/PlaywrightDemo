import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { STORAGE_STATE_E2E } from '../../playwright.config';
import { BasePage } from './Base.page';

const standardUsername = process.env.USER_STANDARD_USERNAME!;
const standardPassword = process.env.USER_STANDARD_PASSWORD!;
export class LoginPage extends BasePage {
  userNameField: Locator;
  passwordField: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    super(page, Paths.Home);
    this.userNameField = this.page.getByPlaceholder('Username');
    this.passwordField = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.getByText(/Login/);
  }

  async loginGlobalSetup(): Promise<void> {
    await this.open();
    // eslint-disable-next-line no-console
    console.log('GlobalSetup: Performing UI login');
    await this.login(standardUsername, standardPassword);
    await this.page.context().storageState({ path: STORAGE_STATE_E2E });
  }

  async login(username: string, password: string): Promise<void> {
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
