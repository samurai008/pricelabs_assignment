# Readme

### Script

- Run the script using `node index.js` or `node .`
- The output will be saved in a file `output.csv`
- Prices for the next 12 months will be calculated from today

### API

- Run `node server.js` to start the express server
- Payload must contain the following keys
  ```json
  {
    "arrivalDate": "2021-10-01",
    "departureDate": "2021-10-02",
    "address": "73-w-monroe-st-chicago-il-60603-usa"
  }
  ```
- Response returns the listings and the rate for the dates provided
