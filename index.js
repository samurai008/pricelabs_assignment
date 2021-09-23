var fetchListings = require('./fetchListings');
var fs = require('fs');

(async function () {
  let response = await fetchListings({
    arrivalDate: '2021-10-01',
    departureDate: '2021-10-02',
    address: '73-w-monroe-st-chicago-il-60603-usa',
  });

  fs.writeFile('output.csv', response.csv, 'utf8', function (err) {
    if (err) {
      console.log(
        'Some error occured - file either not saved or corrupted file saved.'
      );
    } else {
      console.log("It's saved!");
    }
  });

  // console.log(response.listOfProperties);
})();
