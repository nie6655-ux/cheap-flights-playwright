# Cheap Flights – Playwright Test Automation

An automated testing project developed using **Playwright and TypeScript**, covering UI and API test scenarios.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Test Coverage

### UI Testing
- Flight-related UI scenarios.

### API Testing
- Create Booking
- Retrieve Booking
- Update Booking
- Delete Booking
- Positive and negative validation scenarios.

### Known Findings

Two negative API test scenarios failed due to unexpected booking-date validation behavior.

**Finding 1: Create Booking accepts invalid date ranges**

- Endpoint: `POST /booking`
- Scenario: Checkout date is earlier than check-in date.
- Expected: Request should be rejected based on the assumed booking-date business rule.
- Actual: API accepts the request and creates the booking.

**Finding 2: Update Booking accepts invalid date ranges**

- Endpoint: `PUT /booking/{id}`
- Scenario: Checkout date is not later than check-in date.
- Expected: Request should be rejected based on the assumed booking-date business rule.
- Actual: API accepts the update request.

### UI Testing Limitation

UI automation scenarios have been implemented using Playwright and the Page Object Model.

However, execution and validation of the affected UI scenarios remain blocked by an application issue encountered during testing. Troubleshooting was performed, including reviewing the URL configuration, but the issue persists.

As a result, the affected UI scenarios have not been fully verified. Further validation is required once the application issue is resolved.

