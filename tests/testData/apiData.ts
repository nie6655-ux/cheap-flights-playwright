import { ENV } from '../utils/env';

export const BOOKING_DATA = {
    CREDS: {
        "username": ENV.USERNAME,
        "password": ENV.PASSWORD
    },
    CREATE_BOOKING_DATA: {
        "firstname" : "Jim",
        "lastname" : "Brown",
        "totalprice" : 111,
        "depositpaid" : true,
        "bookingdates" : {
            "checkin" : "2018-01-01",
            "checkout" : "2019-01-01"
        },
        "additionalneeds" : "Breakfast"
    }
};