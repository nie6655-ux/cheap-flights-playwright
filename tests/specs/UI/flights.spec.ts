import { test, expect } from '../../fixtures/PageFixtures';

test.describe('Flights Page', () => {

        test.beforeEach( async ({ flightsPage }) => {
            test.step('Navigate to the flights page', async () => { 
                await flightsPage.navigateToFlightsPage();
            });
        });

    test('Verify user able to navigate to the flights page', async ({ flightsPage }) => {
        
        test.step('Verify flights logo is visible', async () => {
            await expect(flightsPage.flightsLogo).toBeVisible();
        });
    });

    test('Verify user able to search for flights', async ({ flightsPage }) => {

        test.step('Search for flights', async () => {
            await flightsPage.searchFlights('Cebu', 'Manila', '2024-07-01', '2024-07-15');
        });

        test.step('Verify search results opens in a new tab and displays the correct search results', async () => {
            const [newPage] = await Promise.all([
                flightsPage.page.context().waitForEvent('page'),
                flightsPage.searchButton.click(),
            ]);
            await newPage.waitForLoadState();
            await expect(newPage).toHaveURL(/.*flight-search.*/);
            await expect(newPage.getByLabel('Flight origin input').filter({ has: newPage.getByText('Cebu City') })).toHaveValue('Cebu City');
            await expect(newPage.getByLabel('Flight destination input').filter({ has: newPage.getByText('Manila') })).toHaveValue('Manila');
        });
    });
});