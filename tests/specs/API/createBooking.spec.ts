import { test, expect } from '../../fixtures/TestFixtures';
import { BOOKING_DATA } from '../../testData/apiData';
import { URLS } from '../../utils/urls';

test.describe('Create Booking API', () => {

    let token = '';

    test.beforeEach(async ({ bookingApi }) => {
        token = await bookingApi.authorizeUser();
    });
    
    test('Verify user able to create a booking', async ({ bookingApi }) => {

        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, BOOKING_DATA.CREATE_BOOKING_DATA);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.bookingid).toBeDefined();
        expect(responseBody.booking.firstname).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.firstname);
        expect(responseBody.booking.lastname).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.lastname);
        expect(responseBody.booking.totalprice).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.totalprice);
        expect(responseBody.booking.depositpaid).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.depositpaid);
        expect(responseBody.booking.bookingdates.checkin).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.bookingdates.checkin);
        expect(responseBody.booking.bookingdates.checkout).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.bookingdates.checkout);
        expect(responseBody.booking.additionalneeds).toBe(BOOKING_DATA.CREATE_BOOKING_DATA.additionalneeds);

        //Delete booking after creation to maintain test environment
        const deleteResponse = await bookingApi.deleteBooking(`${URLS.API_BOOKING_URL}/${responseBody.bookingid}`, token);
        
        expect(deleteResponse.ok()).toBeTruthy();

        //Verify the booking has been deleted by attempting to get the deleted booking
        const getResponseBody = await bookingApi.getBooking(`${URLS.API_BOOKING_URL}/${responseBody.bookingid}`);

        expect(getResponseBody.status()).toBe(404);
    });

    test('Verify user unable to create a booking with missing required fields', async ({ bookingApi }) => {
        
        const { firstname, lastname, ...incompleteBookingData } = BOOKING_DATA.CREATE_BOOKING_DATA;

        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, incompleteBookingData);

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(500);
    });

    test('Verify user unable to create a booking with invalid endpoint', async ({ bookingApi }) => {
       
        const response = await bookingApi.createBooking(`${URLS.API_BOOKING_URL}/invalid`, BOOKING_DATA.CREATE_BOOKING_DATA);

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
    });

    test('Verify user unable to create a booking with checkout date before checkin date', async ({ bookingApi }) => {
        
        const invalidBookingData = {
            ...BOOKING_DATA.CREATE_BOOKING_DATA,
            bookingdates: {
                checkin: "2023-01-01",
                checkout: "2022-12-31"
            }
        };
        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, invalidBookingData);

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(500);
    });

    test('Verify user unable to create a booking without checkin and checkout dates', async ({ bookingApi }) => {
        
        const invalidBookingData = {
            ...BOOKING_DATA.CREATE_BOOKING_DATA,
            bookingdates: undefined
        };

        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, invalidBookingData);

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(500);
    });

    test('Verify user unable to create a booking with invalid data types', async ({ bookingApi }) => {
        
        const invalidBookingData = {
            ...BOOKING_DATA.CREATE_BOOKING_DATA,
            firstname: 123,
            lastname: 456
        };
        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, invalidBookingData);
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(500);
    });

    test('Verify user unable to create a booking with empty request body', async ({ bookingApi }) => {
        
        const response = await bookingApi.createBooking(URLS.API_BOOKING_URL, {});

        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(500);
    });
});