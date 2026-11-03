import { test, expect } from '../../fixtures/TestFixtures';
import { BOOKING_DATA } from '../../testData/apiData';
import { URLS } from '../../utils/urls';

test.describe('Get Booking API', () => {

    let bookingId: number;

    test.beforeAll(async ({ bookingApi }) => {

        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, BOOKING_DATA.CREATE_BOOKING_DATA);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        bookingId = responseBody.bookingid;
    });

    test('Verify user able to get a booking', async ({ bookingApi }) => {

        const getResponse = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/${bookingId}`);

        expect(getResponse.ok()).toBeTruthy();
        expect(getResponse.status()).toBe(200);
        
        const responseBody = await getResponse.json();
        expect(responseBody.firstname).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.firstname);
        expect(responseBody.lastname).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.lastname);
        expect(responseBody.totalprice).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.totalprice);
        expect(responseBody.depositpaid).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.depositpaid);
        expect(responseBody.bookingdates.checkin).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.bookingdates.checkin);
        expect(responseBody.bookingdates.checkout).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.bookingdates.checkout);
        expect(responseBody.additionalneeds).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.additionalneeds);
    });

    test('Verify user unable to get a booking with invalid booking id', async ({ bookingApi }) => {
        
        const invalidBookingId = 999999;
        const getResponse = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/${invalidBookingId}`);
        
        expect(getResponse.ok()).toBeFalsy();
        expect(getResponse.status()).toBe(404);
    });

    test('Verify user unable to get a booking with invalid endpoint', async ({ bookingApi }) => {
        const getResponse = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/invalid/${bookingId}`);
        
        expect(getResponse.ok()).toBeFalsy();
        expect(getResponse.status()).toBe(404);
    });

    test('Verify user to get all booking ids with missing booking id', async ({ bookingApi }) => {
        const getResponse = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/`);
        
        expect(getResponse.ok()).toBeTruthy();
        expect(getResponse.status()).toBe(200);

        const responseBody = await getResponse.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    test('Verify user unable to get a booking with non-numeric booking id', async ({ bookingApi }) => {
        const nonNumericBookingId = 'abc';
        const getResponse = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/${nonNumericBookingId}`);
        
        expect(getResponse.ok()).toBeFalsy();
        expect(getResponse.status()).toBe(404);
    });

    test('Verify user unable to get a booking with negative booking id', async ({ bookingApi }) => {
        const negativeBookingId = -1;
        const getResponse = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/${negativeBookingId}`);
        
        expect(getResponse.ok()).toBeFalsy();
        expect(getResponse.status()).toBe(404);
    });

    test.afterEach(async ({ bookingApi }) => {
        //Delete booking after each test to maintain test environment
        const token = await bookingApi.authorizeUser();
        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeTruthy();
    });
});