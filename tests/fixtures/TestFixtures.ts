import { test as base } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage';
import { BookingApi } from '../api/bookingApi';

type TestFixtures = {
    flightsPage: FlightsPage;
    bookingApi: BookingApi;
}

export const test = base.extend<TestFixtures>({

    flightsPage: async ({ page }, use) => {
        const flightsPage = new FlightsPage(page);
        await use(flightsPage);
    },

    bookingApi: async ({ request }, use) => {
        const bookingApi = new BookingApi(request);
        await use(bookingApi);
    }
});

export { expect } from '@playwright/test';