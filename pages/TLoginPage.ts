
import { Page, Locator, expect } from '@playwright/test';

//Typescript class for Login Page - contains properties,constructor and methods for login page

export class LoginPage {
    // /properties
    readonly page: Page;
    readonly logo: Locator;
    // constructor
    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('img:visible').first();
    }
    // methods
    // navigate to homepage
    async navigateToHomePage() {
        await this.page.goto('https://trade.multibank.io/');
        await expect(this.page.locator('body')).toBeVisible();
    }

    async clickLogo() {
        await expect(this.logo).toBeVisible();
        await this.logo.click();

    }
}