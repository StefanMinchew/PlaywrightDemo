import { Locator, Page } from '@playwright/test';
import { Paths } from '../enums/paths';
import { ItemComponent } from '../components/Item.component';

export class BasePage {
  protected page: Page;
  readonly _url: string;

  constructor(page: Page, url = Paths.Home) {
    this.page = page;
    this._url = url;
  }

  async open(): Promise<void> {
    await this.page.goto(this._url);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  getItem(locator: Locator): ItemComponent {
    return new ItemComponent(locator);
  }
}
