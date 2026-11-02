import { test as base } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage';

type PageFixtures = {
    flightsPage: FlightsPage;
}

export const test = base.extend<PageFixtures>({

    flightsPage: async ({ page }, use) => {
        const flightsPage = new FlightsPage(page);
        await use(flightsPage);
    }
});

export { expect } from '@playwright/test';