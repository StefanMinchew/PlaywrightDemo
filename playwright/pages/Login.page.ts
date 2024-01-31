import { Locator, Page } from "@playwright/test";
import { Paths } from "../../config/paths";
import { BasePage } from "./base/Base.page";
import { STORAGE_STATE_E2E } from "../../playwright.config";
import { users } from "../../credentials/crenedials";

const standardUser: string =
  process.env.STANDARD_USER || users.standardUser.username;
const password: string = process.env.PASSWORD! || users.standardUser.password;

export class LoginPage extends BasePage {
  readonly _url = Paths.Home;

  userNameField: Locator;
  passwordField: Locator;
  loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userNameField = this.page.getByPlaceholder("Username");
    this.passwordField = this.page.getByPlaceholder("Password");
    this.loginButton = this.page.getByText(/Login/);
  }

  async loginGlobalSetup() {
    await this.page.goto("/");
    console.log("GlobalSetup: Performing UI login");
    await this.login(standardUser, password);
    await this.page.context().storageState({ path: STORAGE_STATE_E2E });
  }

  async login(username: string, password: string) {
    await this.userNameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}
