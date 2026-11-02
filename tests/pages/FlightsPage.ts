import { Locator, type Page } from '@playwright/test';
import { ENV } from '../utils/env';

export class FlightsPage {
    readonly page: Page;
    readonly flightsLogo: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flightsLogo = page.getByRole('link', { name: 'Search for flights' });
    }

    async navigateToFlightsPage() {
        await this.page.goto(ENV.BASE_URL);
    }
}