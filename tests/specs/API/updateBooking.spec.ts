import { test, expect } from '../../fixtures/TestFixtures';
import { BOOKING_DATA } from '../../testData/apiData';
import { URLS } from '../../utils/urls';

test.describe('Update Booking API', () => {

    let token = '';
    let createResponse : any;
    let bookingId: number;

    const updateBookingData = {
        ...BOOKING_DATA.CREATE_BOOKING_DATA,
        firstname: 'JohnUpdated',
        lastname: 'DoeUpdated',
    };

    test.beforeEach(async ({ bookingApi }) => {
        
        token = await bookingApi.authorizeUser();
        createResponse = await bookingApi.createBooking(URLS.API_BOOKING_URL, BOOKING_DATA.CREATE_BOOKING_DATA);

        const responseBody = await createResponse.json();
        bookingId = responseBody.bookingid;
    });

    test('Verify user able to update a booking', async ({ bookingApi }) => {

        const updateResponse = await bookingApi.updateBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, updateBookingData, token);

        expect(updateResponse.ok()).toBeTruthy();
        expect(updateResponse.status()).toBe(200);

        const updatedResponseBody = await updateResponse.json();

        expect(updatedResponseBody.firstname).toBe(updateBookingData.firstname);
        expect(updatedResponseBody.lastname).toBe(updateBookingData.lastname);
        expect(updatedResponseBody.totalprice).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.totalprice);
        expect(updatedResponseBody.depositpaid).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.depositpaid);
        expect(updatedResponseBody.bookingdates.checkin).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.bookingdates.checkin);
        expect(updatedResponseBody.bookingdates.checkout).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.bookingdates.checkout);
        expect(updatedResponseBody.additionalneeds).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.additionalneeds);
    });

    test('Verify user unable to update with invalid endpoint', async({ bookingApi }) => {
        
        const updateResponse = await bookingApi.updateBooking(`${URLS.API_BOOKING_URL}/${bookingId}/invalid`, updateBookingData, token);

        expect(updateResponse.ok()).toBeFalsy();
        expect(updateResponse.status()).toBe(404);

    });

    test('Verify user unable to update with invalid data types', async ({ bookingApi }) => {
        
        const updatedBooking = {
            ...BOOKING_DATA.CREATE_BOOKING_DATA,
            "firstname": 123
        };

        const updateResponse = await bookingApi.updateBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, updatedBooking, token);

        expect(updateResponse.ok()).toBeFalsy();
        expect(updateResponse.status()).toBe(500);

    });

    test('Verify user unable to update when checkout is not later than checkin', async ({ bookingApi }) => {
       
        const updatedCheckInOut = {
            ...BOOKING_DATA.CREATE_BOOKING_DATA,
            bookingdates: {
                checkin: "2023-01-01",
                checkout: "2022-12-31"
            }
        };

        const updateResponse = await bookingApi.updateBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, updatedCheckInOut, token);

        expect(updateResponse.ok()).toBeFalsy();
        expect(updateResponse.status()).toBe(500);

    });

    test('Verify user unable to update when request is empty', async ({ bookingApi }) => {
        
        const updatedBooking = {};

        const updateResponse = await bookingApi.updateBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, updatedBooking, token);

        expect(updateResponse.ok()).toBeFalsy();
        expect(updateResponse.status()).toBe(400);
    });

    test.afterEach(async ({ bookingApi }) => {
        //Delete booking after each test to maintain test environment
        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${bookingId}`, token);
        
        expect(deleteResponse.ok()).toBeTruthy();
    });
});