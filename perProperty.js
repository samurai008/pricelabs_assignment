var axios = require('axios');

function perPropertyPrices({ arrivalDate, departureDate, unitId, listingId }) {
  var data = JSON.stringify({
    query:
      'query priceDetails($createTravelerCheckoutRequest: CreateTravelerCheckoutRequest) {\n  priceDetails(createTravelerCheckoutRequest: $createTravelerCheckoutRequest) {\n    notes {\n      title\n      description\n    }\n    merchandisingSpaceItems {\n      message\n      type\n    }\n    totalNumeric {\n      totalInCents\n    }\n    totals {\n      title\n      amount\n      tooltip\n      subItems {\n        title\n      }\n    }\n    checkoutUrl\n    instantBooking\n    dueNow {\n      title\n      amount\n      tooltips {\n        title\n        amount\n        tooltip\n      }\n    }\n    payments {\n      title\n      amount\n      paidText\n      infoText\n      status\n      viewUrl\n    }\n    averageNightlies {\n      perNightCost {\n        currency\n        amount\n        localized\n      }\n      type\n    }\n    edapEventJson\n    edapQuoteSuccess\n    edapPriceQuotePresented\n    lineItems {\n      title\n      amount\n      mixedCurrencyDisclaimer\n      type\n      discountTitle\n      tooltip\n      subItems {\n        title\n        amount\n        type\n        tooltip\n        subItems {\n          title\n          amount\n        }\n      }\n    }\n    currencyConversionLabel\n    cancellationPolicy {\n      unstructuredPolicyFreeText\n      cancellationPolicyPeriods {\n        label\n      }\n      cancellationPolicyLabel {\n        label\n        date\n        isFullRefundWindow\n      }\n      cancellationTimelinePeriods {\n        timelineLabel\n        refundPercent\n        refundWindowLabel\n        shortDateLocalized\n        isPast\n        isActive\n        iconCode\n      }\n      policyType\n    }\n  }\n}\n',
    variables: {
      createTravelerCheckoutRequest: {
        unit: unitId,
        arrivalDate,
        departureDate,
        children: 0,
        adults: 2,
        pets: 0,
        listingRef: listingId,
        currency: 'USD',
      },
    },
    operation: 'graphql_get_pricing_quote',
  });

  var config = {
    method: 'post',
    url: 'https://www.vrbo.com/pdp/graphql',
    headers: {
      'x-csrf-jwt-pdp':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6ImI4YzZhZmU2MzFiMWEwYmZkODA4ZWZkZmY3YmFlODY5MDk2ZmMwZDllYzEwYTgwMjcyODlmYWI0ZGY1MzY5MDUxYmM4YmVjNjFlZmFiZDMzYjY3NWY3MTU0NzdhM2U4MjBhYTRiZTFiMzBlMWE1NTMyM2QxNTViZGQ4YzBkNDQyZGE3MzRkYjdlMWU1MTllZTQzNTEyNzdlMTY3MTFiYzViYWIzM2I2OTJkNTg5YmNhMGYzMWNjNmQ2YzIwZDMzNGU5ZDcwN2IyYjEwOGQ2MzllZjI4NWEyZmE3MDVmZDljYzUzZWMwNmJiMTI2NGMxMmYwYjFhZTUyYjgxNWY5OGY4MCIsImlhdCI6MTYzMjMzODExNSwiZXhwIjoxNjMyOTQyOTE1fQ.6CAXHB_aHrbhv-6noXf9mUytraOHjvxQ-9qyW2z8IX8',
      cookie:
        'hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; e5462ae9-93cc-48e0-bc2d-7278d3a40948SL=1; ha-device-id=4fd76f32-6642-1bd4-5fc4-4f6449270b02; hav=4fd76f32-6642-1bd4-5fc4-4f6449270b02; has=e5462ae9-93cc-48e0-bc2d-7278d3a40948; eu-site=0; site-header={%22discoveryTab%22:{%22isNewFeature%22:true%2C%22expiryDateTime%22:1634916366146}}; DUAID=4fd76f32-6642-1bd4-5fc4-4f6449270b02; _ga=GA1.2.1667770875.1632324366; _gid=GA1.2.1732519935.1632324366; e5462ae9-93cc-48e0-bc2d-7278d3a40948UAL=1; ensighten:source={"source":null,"medium":null,"lastAffiliate":null,"sessionid":"e5462ae9-93cc-48e0-bc2d-7278d3a40948"}; site=vrbo; _gcl_au=1.1.651178227.1632324369; g_state={"i_p":1632331571338,"i_l":1}; xdid=d0310fae-10d4-44e2-b93e-a673987a793c|1632324372|vrbo.com; xdidp=d0310fae-10d4-44e2-b93e-a673987a793c|1632324372|vrbo.com; crumb=LoAO05GwkHeh2N3sje_PxD6yZu2Zl_xGyzLk1ZpQCXY; edge-polyfill-location=city%3DNEWDELHI%2C%20region%3DDL%2C%20country%3DIN%2C%20lat%3D28.60%2C%20lng%3D77.20%2C%20asn%3D24560%2C%20city%3DNEWDELHI%2C%20region%3DDL%2C%20country%3DIN%2C%20lat%3D28.60%2C%20lng%3D77.20%2C%20asn%3D24560; edge-polyfill-device-classification=10; HASESSIONV3=77f6e99a-e20b-4266-bfed-b364b7984db1; ha-gx-preferred-locale=en_US; tracker_device=f0684bf8-10b7-45f7-8624-5f378dfd38b4; ha-access-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IntcImlkXCI6XCI0ZmQ3NmYzMi02NjQyLTFiZDQtNWZjNC00ZjY0NDkyNzBiMDJcIn0iLCJpYXQiOjE2MzIzMzA1NDEsImV4cCI6MTYzMjQxNjk0MX0.B68FY_0KguTmbsGJM0KR6htPg113bJ7CBKoG5IWWuK8; HMS=8bbc85f9-fd02-4aa5-89d4-20957e07f64d; ak_bmsc=2C8EBA6654E0E3F5CC275D0B3A430EFD~000000000000000000000000000000~YAAQdAVaaAtuvpx6AQAADmGzDg2rjR1q/Wwh3PATRKtpygibajA2AHLVgm35OegllucNtfrI7WbV5bHUWeb9d1/YPPAGorqYUJTT1Xy3Vxo73CpSV9y4bkARIi8DA5/2F9RoxWSV5z+EDX+QYvBUHygjsEFyyXAKBbIRRjU42WPSDGIyOpOWrmAbHF3X4tIy+u77U3ID5dlcdNFtnbgK6Fkd5PnowQwORnwH9/wUpEHoCEwuGSojyrt22j01bwdr9EvIYOW7ViAo9oVuwMN3SkAlE5eLz3p1li5FVZGzJYwrOQpvKMl8hEw2SNcidJ4xlxMQugUepF22OmN4MhV1Xsj8LPU5E6ntWuOp3JN7+QUx1jP+TvwTGQy/+LggaLwt+wrwZ/Iod2Qe; ta_timeout=1; __utmuaepi=search_world:search; ha-state-prst=%7B%22lbsKeywords%22%3A%2273%20w%20monroe%20st%20chicago%20il%2060603%20usa%22%2C%22lastSearchUrl%22%3A%22%2Fsearch%2Fkeywords%3A73-w-monroe-st-chicago-il-60603-usa%2Farrival%3A2021-09-24%2Fdeparture%3A2021-09-25%2FminNightlyPrice%2F0%2FminTotalPrice%2F0%3FfilterByTotalPrice%3Dtrue%26petIncluded%3Dfalse%26ssr%3Dtrue%26adultsCount%3D2%26childrenCount%3D0%26noDates%3Dfalse%22%7D; ha-trip-prst=%7B%22arrival%22%3A%222021-09-24%22%2C%22departure%22%3A%222021-09-25%22%2C%22numberOfAdults%22%3A2%2C%22numberOfChildren%22%3A0%2C%22petIncluded%22%3Afalse%7D; _gat_edap=1; _uetsid=6973ef601bb911ecb4b657b1492f078b; _uetvid=69745f101bb911ec9db4a9eba972bb8c; _gat_gtag_UA_160705394_1=1; bm_sv=4A30D9CFA2C51BB36F9CF27C05525CE9~s+KcXSI8T3efw5GpbQHUUADDjQnd/W76iZ+2sawUv7eSrw37kdbDG3y7iJUcjkt9RlP7Tx9uXacxpGzENV8ncAzKlnbAHieRHM92NaSgEq2AarrBCmIl9ShgI/5D1+Jv1dxYEF5TuV3BkYW3Ls+X4sIkPv7w69PhL1WLNGT9CYM=; HMS=8bbc85f9-fd02-4aa5-89d4-20957e07f64d; ak_bmsc=2C8EBA6654E0E3F5CC275D0B3A430EFD~000000000000000000000000000000~YAAQfl06F9Epe2l7AQAAgbDyDg3609NcIJ5OFNTfSjRo3g0Ih8YZNzUKaYtpxpkoto/kZes4PszdPFH4ezlv821COrysxTS6dMPuEjCZeujf8SgGV8VHTrJoRNRgkY4j0jm6TTdeKwcHsn6eQms3kfwJZzLCXSyQBDE9kWR7Yvlt3A1SxivEsTlFpA4PNvVihlYk7LibLjZ+TQXcfGtxDewfcdMF+J+FCISSbmephBzE6G8BUp2LHATCmVS6HkFTei0O1QbjbzMPZB8Mtq80Sf8FtRaGhe7Jkik4JxwVMTXyZasZkcBhN0UYjHgpU4krmJ09YKoWYLMmcnoQ5FBGKdJeOYM8F/zclp0ZxoM+Hqdh6UzYav/t4MIhQOZSH16D/w6i++dX9hUptrI2tA==; bm_sv=4A30D9CFA2C51BB36F9CF27C05525CE9~s+KcXSI8T3efw5GpbQHUUADDjQnd/W76iZ+2sawUv7eSrw37kdbDG3y7iJUcjkt9RlP7Tx9uXacxpGzENV8ncAzKlnbAHieRHM92NaSgEq0EHqqAIDofGJUTzeXvkO0jRW4BYBMy7WyiQLA3Icq8nfA1y19up4cBRORfch2fMbE=; 297546bc-88ef-d8a7-09bc-b2c684e448b7SL=1; eu-site=0; ha-device-id=4fd76f32-6642-1bd4-5fc4-4f6449270b02; hal=ga=1&ua=1&si=1&ui=1&vi=1&pr=0; has=297546bc-88ef-d8a7-09bc-b2c684e448b7; hav=4fd76f32-6642-1bd4-5fc4-4f6449270b02',
      'Content-Type': 'application/json',
    },
    data: data,
  };

  return axios(config).then(function (response) {
    // console.log(JSON.stringify(response.data));
    // response.data.listing.priceSummary
    return response.data;
  });
}

module.exports = { perPropertyPrices };
