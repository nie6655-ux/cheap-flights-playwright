import { test, expect } from '../../fixtures/PageFixtures';

test.describe('Flights Page', () => {

    test('Verify user able to navigate to the flights page', async ({ flightsPage }) => {
        await flightsPage.navigateToFlightsPage();
        await expect(flightsPage.flightsLogo).toBeVisible();
    });
});