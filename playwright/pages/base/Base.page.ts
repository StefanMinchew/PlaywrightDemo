import { Page } from "@playwright/test";
import { Paths } from "../../../config/paths";

export class BasePage {
    page: Page;
    readonly _url: string = Paths.Home

    constructor(page: Page, url = Paths.Home) {
        this.page = page;
        this._url = url;
    }

    async open() {
        await this.page.goto(this._url);
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForLoadState('networkidle')
    }

    async reload() {
        await this.page.reload();
    }
}