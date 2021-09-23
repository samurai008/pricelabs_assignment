var axios = require('axios');
const graphQlStr = require('./graphQlStr');
var perPropertyPrices = require('./perProperty').perPropertyPrices;
var listingGqlStr = graphQlStr.listings;
const makeCalendar = require('./makeCalendar');

async function fetchListings({ arrivalDate, departureDate, address, server }) {
  var d = new Date();
  var genArrivalDate = [d.getFullYear(), d.getMonth() + 2, 1].join('-');
  var genDepartureDate = [d.getFullYear(), d.getMonth() + 2, 2].join('-');

  var data = JSON.stringify({
    operationName: 'SearchRequestQuery',
    variables: {
      filterCounts: true,
      request: {
        paging: { page: 1, pageSize: 50 },
        filterVersion: '1',
        coreFilters: {
          adults: 2,
          children: 0,
          maxBathrooms: null,
          maxBedrooms: null,
          maxNightlyPrice: null,
          maxTotalPrice: null,
          minBathrooms: 0,
          minBedrooms: 0,
          minNightlyPrice: 0,
          minTotalPrice: 0,
          pets: 0,
        },
        dates: {
          arrivalDate: server ? arrivalDate : genArrivalDate,
          departureDate: server ? departureDate : genDepartureDate,
        },
        filters: [],
        // q: '73-w-monroe-st-chicago-il-60603-usa',
        q: address,
      },
      optimizedBreadcrumb: false,
      vrbo_web_global_messaging_banner: true,
      Vrbo_reco_large_search_destino: false,
    },
    extensions: { isPageLoadSearch: false },
    query: listingGqlStr,
  });

  var config = {
    method: 'post',
    url: 'https://www.vrbo.com/serp/g',
    headers: {
      'Content-Type': 'application/json',
      Cookie:
        'HMS=79f22147-053a-4a3b-8985-3f764ae209a7; ak_bmsc=8D0A9913FC6C5FD2F3C279372FBDB451~000000000000000000000000000000~YAAQdAVaaI9Nvpx6AQAA8JxDDg3RMXiVBDyNtWQS7rB3xEr2SKpw48bmUhRyNyl9owT56nCVaQcr205oIRWwTdOzEX2Fb2ekMPGT49Ju0EuXmIumkli3IAymQg8oYrRcrD6f2s3NTGNkod3HdEa1SmTZG9k/wF+o3lVC6mwn3X1BBVVVL2iVRSky2IrgQAbWV+QeVctipQe+NtPG1v/iX1kZq1IlTdxYlAbwOkX6q2fLwYVXWJTHR3q6cWrthUjJEfTUSSEtSQAJvNeE6Nh4tkpMEz7L1VHZNCp+q0zTQCl/FZQphrU/DKHzh7a5m5iIu0j4IEQLIjcdCkJIZu0Psf4/EsXbvhmHnSbEh5OGEwICP63/kpBuDT+MTA==; bm_sv=B75A9574228995B722816D31979D8AB5~s+KcXSI8T3efw5GpbQHUULzwo9nbMGKmRiEY24l4Xs1r+3w3hoV7LMIMoZob6M/qI/Bli1LHhyNDK1T2z1vvpnsCwNDquxdt9fUv9uEdwskwRQGs6bypqOWTJvNQdoC0WQqeSkgw2zJPEJhiWyLGaw==; 297546bc-88ef-d8a7-09bc-b2c684e448b7SL=1; eu-site=0; ha-device-id=307a9557-7c66-4f00-095f-029f4fe07e90; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; has=297546bc-88ef-d8a7-09bc-b2c684e448b7; hav=307a9557-7c66-4f00-095f-029f4fe07e90',
    },
    data: data,
  };

  try {
    // get the listings
    var response = await axios(config);
    var listings = response.data.data.results.listings;
  } catch (err) {
    console.log(err);
  }

  let listOfProperties = [];
  const dates = makeCalendar();

  let br_idx = 0;

  // columns for csv
  let cols = ['Name'];

  for (let date of dates) {
    for (let i = date[0][2]; i <= date[1][2]; i++) {
      cols.push(
        [
          [date[0][0], date[0][1], i]
            .map((d) => (d.toString().length === 1 ? '0' + d : d))
            .join('-'),
          [date[0][0], date[0][1], i + 1]
            .map((d) => (d.toString().length === 1 ? '0' + d : d))
            .join('-'),
        ].join(' to ')
      );
    }
  }

  for (let listing of listings) {
    var propertyName = listing.propertyMetadata.headline;
    // parse details page to fetch unitId
    // try {
    if (!server) {
      const markup = await axios({
        method: 'GET',
        url: `https://vrbo.com${listing.detailPageUrl}`,
      });

      // var patt = /^\s+window.__INITIAL_STATE__ = .+$/;
      var unitId = markup.data.split('unitApiUrl')[1].split(',')[0];
      unitId = unitId
        .slice(3, unitId.length - 1)
        .split('\\u002F')
        .join('/')
        .toString();
      var listingId = listing.listingId;

      var yearlyPrices = [];

      let curr_month = 0;
      const top3Dates = [];
      for (let date of dates) {
        const monthlyPrices = [];
        for (let i = date[0][2]; i <= date[1][2]; i++) {
          try {
            const priceData = await perPropertyPrices({
              arrivalDate: [date[0][0], date[0][1], i]
                .map((d) => (d.toString().length === 1 ? '0' + d : d))
                .join('-'),
              departureDate: [date[0][0], date[0][1], i + 1]
                .map((d) => (d.toString().length === 1 ? '0' + d : d))
                .join('-'),
              listingId,
              unitId,
            });
            const amt = priceData.data.priceDetails.totals[0].amount;
            monthlyPrices.push(parseFloat(amt.slice(1, amt.length)));
            console.log(parseFloat(amt.slice(1, amt.length)));
          } catch (err) {
            console.error('err! cannot fetch data');
            // insert 0 if prices not available for the date
            monthlyPrices.push(0);
          }
        }
        yearlyPrices.push(...monthlyPrices);

        // break after first month
        // if (curr_month === 0) break;
      }

      // find top 3 prices for listings
      const yearlyPricesClone = [...yearlyPrices];

      for (let i = 0; i < 3; i++) {
        let maxIdx = 0,
          price = yearlyPricesClone[maxIdx];
        for (let j = 1; j < yearlyPricesClone.length; j++) {
          if (yearlyPricesClone[j] > yearlyPricesClone[maxIdx]) {
            maxIdx = j;
            price = yearlyPricesClone[maxIdx];
          }
        }
        top3Dates.push([cols[maxIdx + 1], price].join('='));
        // top3Dates.push(price);
        yearlyPricesClone[maxIdx] = 0;
      }

      listOfProperties.push([
        propertyName,
        ...yearlyPrices,
        top3Dates.join('|'),
      ]);

      // prepare csv string
      var csv =
        cols.join(',') +
        '\n' +
        listOfProperties.map((m) => m.join(',')).join('\n');
    } else {
      // console.log(listing);
      // listOfProperties.push([propertyName, 0]);
      listOfProperties.push([
        propertyName,
        listing.priceSummary.formattedAmount,
      ]);
    }

    // break after first listing
    // if (br_idx === 0) break;
    // } catch (err) {
    //   console.error('cannot fetch details for listing', listing.listingId);
    // }
  }

  return {
    csv,
    listOfProperties,
  };
}

module.exports = fetchListings;
