import { APIRequestContext } from '@playwright/test';
import { URLS } from '../utils/urls';
import { BOOKING_DATA } from '../testData/apiData';


export class BookingApi {

     constructor(private request: APIRequestContext) {}


     async authorizeUser(): Promise<string> {
        let token = '';
        const response = await this.request.post(URLS.API_AUTH_URL, {
            data: BOOKING_DATA.CREDS,
        });


        const responseBody = await response.json();
        token = responseBody.token;

        if (!response.ok()) {
            throw new Error(`Authorization failed with status ${response.status()}`);
        }

        return token;
    }

    async createBooking(endpoint: string, bookingData: object ) {
        return await this.request.post(endpoint, {
            data: bookingData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    async deleteBooking(endpoint: string, token: string) {
        const deleteResponse = await this.request.delete(endpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }
        });

        return deleteResponse;
    }

    async getBooking(endpoint: string) {
        const getResponseBody = await this.request.get(endpoint);
        return getResponseBody;
    }

    async updateBooking(endpoint: string, bookingData: object, token: string) {
        const updateResponse = await this.request.put(endpoint, {
            data: bookingData,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            }
        });
        return updateResponse;
    }
}