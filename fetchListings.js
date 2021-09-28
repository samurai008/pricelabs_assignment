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
      cookie:
        'ha-device-id=4fd76f32-6642-1bd4-5fc4-4f6449270b02; hav=4fd76f32-6642-1bd4-5fc4-4f6449270b02; site-header={%22discoveryTab%22:{%22isNewFeature%22:true%2C%22expiryDateTime%22:1634916366146}}; DUAID=4fd76f32-6642-1bd4-5fc4-4f6449270b02; _ga=GA1.2.1667770875.1632324366; _gcl_au=1.1.651178227.1632324369; xdid=d0310fae-10d4-44e2-b93e-a673987a793c|1632324372|vrbo.com; xdidp=d0310fae-10d4-44e2-b93e-a673987a793c|1632324372|vrbo.com; crumb=LoAO05GwkHeh2N3sje_PxD6yZu2Zl_xGyzLk1ZpQCXY; edge-polyfill-location=city%3DNEWDELHI%2C%20region%3DDL%2C%20country%3DIN%2C%20lat%3D28.60%2C%20lng%3D77.20%2C%20asn%3D24560%2C%20city%3DNEWDELHI%2C%20region%3DDL%2C%20country%3DIN%2C%20lat%3D28.60%2C%20lng%3D77.20%2C%20asn%3D24560; edge-polyfill-device-classification=10; HASESSIONV3=77f6e99a-e20b-4266-bfed-b364b7984db1; ha-gx-preferred-locale=en_US; tracker_device=f0684bf8-10b7-45f7-8624-5f378dfd38b4; a64683ad-84f6-63fa-ddad-ceeae7ae4f12UAL=1; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; a64683ad-84f6-63fa-ddad-ceeae7ae4f12SL=1; HMS=3cbed78b-d7c1-40bb-acea-10278906c75c; has=a64683ad-84f6-63fa-ddad-ceeae7ae4f12; eu-site=0; ak_bmsc=C90AA5DEB626056E8EE030AB888E7BFA~000000000000000000000000000000~YAAQfl06FwhcbWp7AQAAWRBsKA2h9n1TNo+VXNUEVjoFTAetUlPNj/+xOK4P4GBGIR0UVU2H6UeBA/tqWbUNEJq1XMmCU9MQXc4qS60OEjBMkqFVAdJLlkWpVBrUmAFFE6MMEXSJeMnmdEz3b5JeHahhmIpZLaPPoA9wbUN/GDpicHKcgBhLCXWHbwVqPTYRaAgsMhRAj0tOYcdjshL0WwOnjuxdIfEt6jRL4USIINjKk78FeQr7vRaqt8ZewJMnyx8d1ROd3EhFv5VEs4kwOOv/eXPKTDkLTgfb36XU7wDspx+BVb1vjhrx6l1JrdXUqmeWQ40rPyIIaKHimndhEDc/po/IQ9BZEkCjhSiwi18n+U65JA1hcgUkyrCXxmq7omx6qEq6iTm0; _gid=GA1.2.530441643.1632765745; site=vrbo; ta_timeout=1; __utmuaepi=home%20page:home; _gat_edap=1; _uetsid=12f021901fbd11ecb534c96f5d1f86f5; _uetvid=69745f101bb911ec9db4a9eba972bb8c; _gat_gtag_UA_160705394_1=1; g_state={\\"i_p\\":1632852150090,\\"i_l\\":2}; bm_sv=90D9DEDD286AD80B3CA8D75E976F8002~0k2MVWjXv9U+foCk9nnjQ/G7GtiBubvTdKq0q+LFmGTG5ICOV/K4U+t5gRp7O7R6QV74AdvnQ/iFSrLJXLPwKbNv/aK3iSAYsBFL4n6yIuyl0f5jN8XIzy483Hcy2CMjXbCUmKxdXsOn3rQlIWztrg==; ha-state-prst=%7B%22lbsKeywords%22%3A%2273%20w%20monroe%20st%20chicago%20il%2060603%20usa%22%2C%22lastSearchUrl%22%3A%22%2Fsearch%2Fkeywords%3A73-w-monroe-st-chicago-il-60603-usa%2Farrival%3A2021-09-27%2Fdeparture%3A2021-09-28%3FadultsCount%3D2%26petIncluded%3Dfalse%22%7D; ha-trip-prst=%7B%22numberOfAdults%22%3A2%2C%22numberOfChildren%22%3A0%2C%22petIncluded%22%3Afalse%2C%22arrival%22%3A%222021-09-27%22%2C%22departure%22%3A%222021-09-28%22%7D; HMS=3cbed78b-d7c1-40bb-acea-10278906c75c; ak_bmsc=C90AA5DEB626056E8EE030AB888E7BFA~000000000000000000000000000000~YAAQdAVaaBN0xpx6AQAAbUd6KA2hYV86Z64NOIwUyg4diIkCMHC7r6GQMNBuhAJcj/rPyjgu+o7e4/5edIriQI6WsaeGEI28IkUPEviLAAh3DBu8aVr29yqUrF4Yx0TdIsZxVTvL8R+zlFNy0/t5S0VA2ElsX+eETrJaFiiyCV+2qVs9vI5/Z6ZZwU4G+N0wlWnF5O3YdH1lN4Iflg/lqDBBn1TWSWA3z3W3HHwMz/8VxjtGJmZBwxgYvV3/Qo8MblTpymdcfNZ5+o3VqVhZcIS+PR6kZ/b3wZHklQoXTq/ycoNGFsjzoqe/0IGDmjgfFaUMgEvlcgesgr9cHslH4uaVNfxqVT48v2thb3NMLf1nOecozCiefP5UBxZ3EoxLIrGixOSeckyQ3xY=; bm_sv=90D9DEDD286AD80B3CA8D75E976F8002~0k2MVWjXv9U+foCk9nnjQ/G7GtiBubvTdKq0q+LFmGTG5ICOV/K4U+t5gRp7O7R6QV74AdvnQ/iFSrLJXLPwKbNv/aK3iSAYsBFL4n6yIuxcc8YrxmLmBRq8SAi5cf16YPHCy7DWuCJ1TfS4dZh2Lw==; eu-site=0; ha-device-id=4fd76f32-6642-1bd4-5fc4-4f6449270b02; hav=4fd76f32-6642-1bd4-5fc4-4f6449270b02',
      'Content-Type': 'application/json', //   'ha-device-id=4fd76f32-6642-1bd4-5fc4-4f6449270b02; hav=4fd76f32-6642-1bd4-5fc4-4f6449270b02; site-header={%22discoveryTab%22:{%22isNewFeature%22:true%2C%22expiryDateTime%22:1634916366146}}; DUAID=4fd76f32-6642-1bd4-5fc4-4f6449270b02; _ga=GA1.2.1667770875.1632324366; _gcl_au=1.1.651178227.1632324369; xdid=d0310fae-10d4-44e2-b93e-a673987a793c|1632324372|vrbo.com; xdidp=d0310fae-10d4-44e2-b93e-a673987a793c|1632324372|vrbo.com; crumb=LoAO05GwkHeh2N3sje_PxD6yZu2Zl_xGyzLk1ZpQCXY; edge-polyfill-location=city%3DNEWDELHI%2C%20region%3DDL%2C%20country%3DIN%2C%20lat%3D28.60%2C%20lng%3D77.20%2C%20asn%3D24560%2C%20city%3DNEWDELHI%2C%20region%3DDL%2C%20country%3DIN%2C%20lat%3D28.60%2C%20lng%3D77.20%2C%20asn%3D24560; edge-polyfill-device-classification=10; HASESSIONV3=77f6e99a-e20b-4266-bfed-b364b7984db1; ha-gx-preferred-locale=en_US; tracker_device=f0684bf8-10b7-45f7-8624-5f378dfd38b4; a64683ad-84f6-63fa-ddad-ceeae7ae4f12UAL=1; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; a64683ad-84f6-63fa-ddad-ceeae7ae4f12SL=1; HMS=3cbed78b-d7c1-40bb-acea-10278906c75c; has=a64683ad-84f6-63fa-ddad-ceeae7ae4f12; eu-site=0; ak_bmsc=C90AA5DEB626056E8EE030AB888E7BFA~000000000000000000000000000000~YAAQfl06FwhcbWp7AQAAWRBsKA2h9n1TNo+VXNUEVjoFTAetUlPNj/+xOK4P4GBGIR0UVU2H6UeBA/tqWbUNEJq1XMmCU9MQXc4qS60OEjBMkqFVAdJLlkWpVBrUmAFFE6MMEXSJeMnmdEz3b5JeHahhmIpZLaPPoA9wbUN/GDpicHKcgBhLCXWHbwVqPTYRaAgsMhRAj0tOYcdjshL0WwOnjuxdIfEt6jRL4USIINjKk78FeQr7vRaqt8ZewJMnyx8d1ROd3EhFv5VEs4kwOOv/eXPKTDkLTgfb36XU7wDspx+BVb1vjhrx6l1JrdXUqmeWQ40rPyIIaKHimndhEDc/po/IQ9BZEkCjhSiwi18n+U65JA1hcgUkyrCXxmq7omx6qEq6iTm0; _gid=GA1.2.530441643.1632765745; site=vrbo; ta_timeout=1; __utmuaepi=home%20page:home; _gat_edap=1; _uetsid=12f021901fbd11ecb534c96f5d1f86f5; _uetvid=69745f101bb911ec9db4a9eba972bb8c; _gat_gtag_UA_160705394_1=1; g_state={"i_p":1632852150090,"i_l":2}; bm_sv=90D9DEDD286AD80B3CA8D75E976F8002~0k2MVWjXv9U+foCk9nnjQ/G7GtiBubvTdKq0q+LFmGTG5ICOV/K4U+t5gRp7O7R6QV74AdvnQ/iFSrLJXLPwKbNv/aK3iSAYsBFL4n6yIuyl0f5jN8XIzy483Hcy2CMjXbCUmKxdXsOn3rQlIWztrg==; ha-state-prst=%7B%22lbsKeywords%22%3A%2273%20w%20monroe%20st%20chicago%20il%2060603%20usa%22%2C%22lastSearchUrl%22%3A%22%2Fsearch%2Fkeywords%3A73-w-monroe-st-chicago-il-60603-usa%2Farrival%3A2021-09-27%2Fdeparture%3A2021-09-28%3FadultsCount%3D2%26petIncluded%3Dfalse%22%7D; ha-trip-prst=%7B%22numberOfAdults%22%3A2%2C%22numberOfChildren%22%3A0%2C%22petIncluded%22%3Afalse%2C%22arrival%22%3A%222021-09-27%22%2C%22departure%22%3A%222021-09-28%22%7D',
      // // 'HMS=79f22147-053a-4a3b-8985-3f764ae209a7; ak_bmsc=8D0A9913FC6C5FD2F3C279372FBDB451~000000000000000000000000000000~YAAQdAVaaI9Nvpx6AQAA8JxDDg3RMXiVBDyNtWQS7rB3xEr2SKpw48bmUhRyNyl9owT56nCVaQcr205oIRWwTdOzEX2Fb2ekMPGT49Ju0EuXmIumkli3IAymQg8oYrRcrD6f2s3NTGNkod3HdEa1SmTZG9k/wF+o3lVC6mwn3X1BBVVVL2iVRSky2IrgQAbWV+QeVctipQe+NtPG1v/iX1kZq1IlTdxYlAbwOkX6q2fLwYVXWJTHR3q6cWrthUjJEfTUSSEtSQAJvNeE6Nh4tkpMEz7L1VHZNCp+q0zTQCl/FZQphrU/DKHzh7a5m5iIu0j4IEQLIjcdCkJIZu0Psf4/EsXbvhmHnSbEh5OGEwICP63/kpBuDT+MTA==; bm_sv=B75A9574228995B722816D31979D8AB5~s+KcXSI8T3efw5GpbQHUULzwo9nbMGKmRiEY24l4Xs1r+3w3hoV7LMIMoZob6M/qI/Bli1LHhyNDK1T2z1vvpnsCwNDquxdt9fUv9uEdwskwRQGs6bypqOWTJvNQdoC0WQqeSkgw2zJPEJhiWyLGaw==; 297546bc-88ef-d8a7-09bc-b2c684e448b7SL=1; eu-site=0; ha-device-id=307a9557-7c66-4f00-095f-029f4fe07e90; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; has=297546bc-88ef-d8a7-09bc-b2c684e448b7; hav=307a9557-7c66-4f00-095f-029f4fe07e90',
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

      console.log('Prices for unit', unitId, propertyName);

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
            // const amt = priceData.data.priceDetails.totals[0].amount;
            // monthlyPrices.push(
            //   parseFloat(amt.slice(1, amt.length).split(',').join(''))
            // );
            // console.log(
            //   parseFloat(amt.slice(1, amt.length).split(',').join(''))
            // );
            const amt =
              priceData.data.priceDetails.totalNumeric.totalInCents / 100;
            monthlyPrices.push(amt);
            console.log([date[0][0], date[0][1], i], amt);
          } catch (err) {
            console.error('err! cannot fetch data', err.message);
            // insert 0 if prices not available for the date
            monthlyPrices.push(0);
          }
        }
        yearlyPrices.push(...monthlyPrices);

        // break after first month
        if (curr_month === 0) break;
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
    if (br_idx === 0) break;
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
