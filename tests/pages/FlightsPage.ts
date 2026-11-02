import { Locator, type Page } from '@playwright/test';
import { URLS } from '../utils/urls';

export class FlightsPage {
    readonly page: Page;
    readonly flightsLogo: Locator;
    readonly fromInput: Locator;
    readonly toInput: Locator;
    readonly dateButton: Locator;
    readonly tripTypeButton: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flightsLogo = page.getByRole('link', { name: 'Search for flights' });
        this.fromInput = page.getByRole('combobox', { name: 'Origin location' });
        this.toInput = page.getByRole('combobox', { name: 'Ask anything' });
        this.dateButton = page.getByPlaceholder('Departure - Return');
        this.tripTypeButton = page.getByRole('combobox', { name: 'Trip type' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async navigateToFlightsPage() {
        await this.page.goto(URLS.BASE_URL);
    }

    async searchFlights(from: string, to: string, departDate: string, returnDate: string) {
        await this.fromInput.fill(from);
        await this.toInput.fill(to);
        await this.selectDateTrip(departDate, returnDate);
        await this.searchButton.click();
    }

    async selectDateTrip(departDate: string, returnDate: string) {
        await this.dateButton.click();
        await this.page.locator('button', { hasText: `${departDate}` }).click();
        await this.page.locator('button', { hasText: `${returnDate}` }).click();
    }
}