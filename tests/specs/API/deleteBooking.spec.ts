import { test, expect } from '../../fixtures/TestFixtures';
import { URLS } from '../../utils/urls';
import { BOOKING_DATA } from '../../testData/apiData';

test.describe('Delete Booking API', () => {

    let token = '';
    let createResponse : any;
    let bookingId: number;

    test.beforeEach(async ({ bookingApi }) => {
        
        token = await bookingApi.authorizeUser();
        createResponse = await bookingApi.createBooking(URLS.API_BOOKING_URL, BOOKING_DATA.CREATE_BOOKING_DATA);

        const responseBody = await createResponse.json();
        bookingId = responseBody.bookingid;
    });

    test('Verify user able to delete a booking', async ({ bookingApi }) => {

        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeTruthy();
        expect(deleteResponse.status()).toBe(201);

        //Verify the booking has been deleted by attempting to get the deleted booking
        const getResponseBody = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/${bookingId}`);

        expect(getResponseBody.status()).toBe(404);
    });

    test('Verify unable to delete a booking twice', async ({ bookingApi }) => {

        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeTruthy();
        expect(deleteResponse.status()).toBe(201);

        const deleteResponseAgain = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);

        expect(deleteResponseAgain.ok()).toBeFalsy();
        expect(deleteResponseAgain.status()).toBe(405);
    });

    test('Verify user unable to delete a missing booking id', async ({ bookingApi }) => {

        bookingId = 9999999;

        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeFalsy();
        expect(deleteResponse.status()).toBe(405);
    });

    test('Verify user unable to delete an invalid booking id', async ({ bookingApi }) => {

        let bookingId = 'abc';

        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeFalsy();
        expect(deleteResponse.status()).toBe(405);
    });

    test('Verify unable to delete for unauthorized user', async ({ bookingApi }) => {

        token = "abcdedde";

        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeFalsy();
        expect(deleteResponse.status()).toBe(403);
    });
});