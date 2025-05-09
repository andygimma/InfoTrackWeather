# InfoTrack Weather

## Prerequisites

- Get an API key from [Geoapify](https://www.geoapify.com/reverse-geocoding-api/). This will allow you to do reverse geocoding.
- Save the api key in your .env file with the key REACT_APP_REVERSE_GEOCODE_API_KEY.

## Testing

`npm run test`

## Running the app

`npm run start`

## Implementation Overview

### Design Decisions

First and foremost I wanted my code to be reusable and testable. To that end I used multiple custom hooks as well as a higher order component to handle loading and error states. The decision to use hooks also allows us to hit multiple APIs, as you will see with useReverseGeocode. Using a hook for each API allows us to scale up and have as many API calls as is necessary. For a data-driven dashboard, this is ideal as we're never waiting for an API call to return before showing all of the data. The user can see the data as we get it. I've had to create multi-API data dashboards before, and this pattern served me well.

### Features

#### Home Page

The home page allows a user to accept location services and to see their local weather. It's important that this url is static so that users can share links to the home page, and each user will see their local weather. This is different from the search page, where we want the url to reflect the latitude and longitude searched. This makes the search page url shareable to see weather for a specific latitude and longitude.

#### Search Page

The search page shows the weather for a specific location. This location is read from the url as latitude and longitude. This can be shared as a link, or can be navigated to by adding latitude and longitude to the search bar, and clicking the submit button.

### Future Improvements

- Improve the design of loading and error states.
- Add validation to the Search Bar.
