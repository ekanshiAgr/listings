const axios = require('axios');
const fs = require('fs');
const moment = require('moment');

function getListings(place, radius) {
    return axios
        .post('https://www.vrbo.com/serp/g', {
            operationName: 'SearchRequestQuery',
            query: 'query SearchRequestQuery($request: SearchResultRequest!, $filterCounts: Boolean!, $optimizedBreadcrumb: Boolean!, $vrbo_web_global_messaging_banner: Boolean!) {\n  results: search(request: $request) {\n    ...querySelectionSet\n    ...DestinationBreadcrumbsSearchResult\n    ...DestinationMessageSearchResult\n    ...FilterCountsSearchRequestResult\n    ...HitCollectionSearchResult\n    ...ADLSearchResult\n    ...MapSearchResult\n    ...ExpandedGroupsSearchResult\n    ...PagerSearchResult\n    ...SearchTermCarouselSearchResult\n    ...InternalToolsSearchResult\n    ...SEOMetaDataParamsSearchResult\n    ...GlobalInlineMessageSearchResult\n    ...GlobalBannerContainerSearchResult @include(if: $vrbo_web_global_messaging_banner)\n    __typename\n  }\n}\n\nfragment querySelectionSet on SearchResult {\n  id\n  typeaheadSuggestion {\n    uuid\n    term\n    name\n    __typename\n  }\n  geography {\n    lbsId\n    gaiaId\n    location {\n      latitude\n      longitude\n      __typename\n    }\n    isGeocoded\n    shouldShowMapCentralPin\n    __typename\n  }\n  propertyRedirectUrl\n  __typename\n}\n\nfragment DestinationBreadcrumbsSearchResult on SearchResult {\n  destination(optimizedBreadcrumb: $optimizedBreadcrumb) {\n    breadcrumbs {\n      name\n      url\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HitCollectionSearchResult on SearchResult {\n  page\n  pageSize\n  pageCount\n  queryUUID\n  percentBooked {\n    currentPercentBooked\n    __typename\n  }\n  listings {\n    ...HitListing\n    __typename\n  }\n  resultCount\n  pinnedListing {\n    headline\n    listing {\n      ...HitListing\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment HitListing on Listing {\n  virtualTourBadge {\n    name\n    id\n    helpText\n    __typename\n  }\n  amenitiesBadges {\n    name\n    id\n    helpText\n    __typename\n  }\n  images {\n    altText\n    c6_uri\n    c9_uri\n    mab {\n      banditId\n      payloadId\n      campaignId\n      cached\n      arm {\n        level\n        imageUrl\n        categoryName\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ...HitInfoListing\n  __typename\n}\n\nfragment HitInfoListing on Listing {\n  listingId\n  ...HitInfoDesktopListing\n  ...HitInfoMobileListing\n  ...PriceListing\n  __typename\n}\n\nfragment HitInfoDesktopListing on Listing {\n  detailPageUrl\n  instantBookable\n  minStayRange {\n    minStayHigh\n    minStayLow\n    __typename\n  }\n  listingId\n  listingNumber\n  rankedBadges(rankingStrategy: SERP) {\n    id\n    helpText\n    name\n    __typename\n  }\n  propertyId\n  propertyMetadata {\n    headline\n    __typename\n  }\n  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {\n    id\n    helpText\n    name\n    __typename\n  }\n  unitMetadata {\n    unitName\n    __typename\n  }\n  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {\n    id\n    helpText\n    name\n    __typename\n  }\n  ...DetailsListing\n  ...GeoDistanceListing\n  ...PriceListing\n  ...RatingListing\n  __typename\n}\n\nfragment DetailsListing on Listing {\n  bathrooms {\n    full\n    half\n    toiletOnly\n    __typename\n  }\n  bedrooms\n  propertyType\n  sleeps\n  petsAllowed\n  spaces {\n    spacesSummary {\n      area {\n        areaValue\n        __typename\n      }\n      bedCountDisplay\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GeoDistanceListing on Listing {\n  geoDistance {\n    text\n    relationType\n    __typename\n  }\n  __typename\n}\n\nfragment PriceListing on Listing {\n  priceSummary: priceSummary {\n    priceAccurate\n    ...PriceSummaryTravelerPriceSummary\n    __typename\n  }\n  priceSummarySecondary: priceSummary(summary: "displayPriceSecondary") {\n    ...PriceSummaryTravelerPriceSummary\n    __typename\n  }\n  priceLabel: priceSummary(summary: "priceLabel") {\n    priceTypeId\n    pricePeriodDescription\n    __typename\n  }\n  prices {\n    ...VrboTravelerPriceSummary\n    __typename\n  }\n  __typename\n}\n\nfragment PriceSummaryTravelerPriceSummary on TravelerPriceSummary {\n  priceTypeId\n  edapEventJson\n  formattedAmount\n  roundedFormattedAmount\n  pricePeriodDescription\n  __typename\n}\n\nfragment VrboTravelerPriceSummary on PriceSummary {\n  perNight {\n    amount\n    formattedAmount\n    roundedFormattedAmount\n    pricePeriodDescription\n    __typename\n  }\n  total {\n    amount\n    formattedAmount\n    roundedFormattedAmount\n    pricePeriodDescription\n    __typename\n  }\n  label\n  mainPrice\n  __typename\n}\n\nfragment RatingListing on Listing {\n  averageRating\n  reviewCount\n  __typename\n}\n\nfragment HitInfoMobileListing on Listing {\n  detailPageUrl\n  instantBookable\n  minStayRange {\n    minStayHigh\n    minStayLow\n    __typename\n  }\n  listingId\n  listingNumber\n  rankedBadges(rankingStrategy: SERP) {\n    id\n    helpText\n    name\n    __typename\n  }\n  propertyId\n  propertyMetadata {\n    headline\n    __typename\n  }\n  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {\n    id\n    helpText\n    name\n    __typename\n  }\n  unitMetadata {\n    unitName\n    __typename\n  }\n  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {\n    id\n    helpText\n    name\n    __typename\n  }\n  ...DetailsListing\n  ...GeoDistanceListing\n  ...PriceListing\n  ...RatingListing\n  __typename\n}\n\nfragment ExpandedGroupsSearchResult on SearchResult {\n  expandedGroups {\n    ...ExpandedGroupExpandedGroup\n    __typename\n  }\n  __typename\n}\n\nfragment ExpandedGroupExpandedGroup on ExpandedGroup {\n  listings {\n    ...HitListing\n    ...MapHitListing\n    __typename\n  }\n  mapViewport {\n    neLat\n    neLong\n    swLat\n    swLong\n    __typename\n  }\n  __typename\n}\n\nfragment MapHitListing on Listing {\n  ...HitListing\n  geoCode {\n    latitude\n    longitude\n    __typename\n  }\n  __typename\n}\n\nfragment FilterCountsSearchRequestResult on SearchResult {\n  id\n  resultCount\n  filterGroups {\n    groupInfo {\n      name\n      id\n      __typename\n    }\n    filters {\n      count @include(if: $filterCounts)\n      checked\n      filter {\n        id\n        name\n        refineByQueryArgument\n        description\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MapSearchResult on SearchResult {\n  mapViewport {\n    neLat\n    neLong\n    swLat\n    swLong\n    __typename\n  }\n  page\n  pageSize\n  listings {\n    ...MapHitListing\n    __typename\n  }\n  pinnedListing {\n    listing {\n      ...MapHitListing\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PagerSearchResult on SearchResult {\n  fromRecord\n  toRecord\n  pageSize\n  pageCount\n  page\n  resultCount\n  __typename\n}\n\nfragment DestinationMessageSearchResult on SearchResult {\n  destinationMessage(assetVersion: 4) {\n    iconTitleText {\n      title\n      message\n      icon\n      messageValueType\n      link {\n        linkText\n        linkHref\n        __typename\n      }\n      __typename\n    }\n    ...DestinationMessageDestinationMessage\n    __typename\n  }\n  __typename\n}\n\nfragment DestinationMessageDestinationMessage on DestinationMessage {\n  iconText {\n    message\n    icon\n    messageValueType\n    __typename\n  }\n  __typename\n}\n\nfragment ADLSearchResult on SearchResult {\n  parsedParams {\n    q\n    coreFilters {\n      adults\n      children\n      pets\n      minBedrooms\n      maxBedrooms\n      minBathrooms\n      maxBathrooms\n      minNightlyPrice\n      maxNightlyPrice\n      minSleeps\n      __typename\n    }\n    dates {\n      arrivalDate\n      departureDate\n      __typename\n    }\n    sort\n    __typename\n  }\n  page\n  pageSize\n  pageCount\n  resultCount\n  fromRecord\n  toRecord\n  pinnedListing {\n    listing {\n      listingId\n      __typename\n    }\n    __typename\n  }\n  listings {\n    listingId\n    __typename\n  }\n  filterGroups {\n    filters {\n      checked\n      filter {\n        groupId\n        id\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  geography {\n    lbsId\n    name\n    description\n    location {\n      latitude\n      longitude\n      __typename\n    }\n    primaryGeoType\n    breadcrumbs {\n      name\n      countryCode\n      location {\n        latitude\n        longitude\n        __typename\n      }\n      primaryGeoType\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SearchTermCarouselSearchResult on SearchResult {\n  discoveryXploreFeeds {\n    results {\n      id\n      title\n      items {\n        ... on SearchDiscoveryFeedItem {\n          type\n          imageHref\n          place {\n            uuid\n            name {\n              full\n              simple\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  typeaheadSuggestion {\n    name\n    __typename\n  }\n  __typename\n}\n\nfragment InternalToolsSearchResult on SearchResult {\n  internalTools {\n    searchServiceUrl\n    __typename\n  }\n  __typename\n}\n\nfragment SEOMetaDataParamsSearchResult on SearchResult {\n  page\n  resultCount\n  pageSize\n  geography {\n    name\n    lbsId\n    breadcrumbs {\n      name\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalInlineMessageSearchResult on SearchResult {\n  globalMessages {\n    ...GlobalInlineAlertGlobalMessages\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalInlineAlertGlobalMessages on GlobalMessages {\n  alert {\n    action {\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    body {\n      text {\n        value\n        __typename\n      }\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    id\n    severity\n    title {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalBannerContainerSearchResult on SearchResult {\n  globalMessages {\n    ...GlobalBannerGlobalMessages\n    __typename\n  }\n  __typename\n}\n\nfragment GlobalBannerGlobalMessages on GlobalMessages {\n  banner {\n    body {\n      text {\n        value\n        __typename\n      }\n      link {\n        href\n        text {\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    id\n    severity\n    title {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n',
            variables: {
                filterCounts: true,
                optimizedBreadcrumb: false,
                request: {
                    q: place,
                    paging: {
                        page: 1,
                        pageSize: 50,
                    },
                },
                vrbo_web_global_messaging_banner: true,
            },
        })
        .then(res => {
            const result = res.data.data.results;
            const placeCoordinates = result.geography.location;
            const listings = result.listings
                .filter(listing => {
                    const listingCoordinates = listing.geoCode;
                    const distance = getDistance(
                        placeCoordinates,
                        listingCoordinates
										);
                    return distance <= radius;
                })
                .map(listing => getNightlyPrices(listing));
            return Promise.all(listings);
        })
        .catch(err => {
            console.error(err);
        });
}

getListings('73 W Monroe St, Chicago, IL USA', 2)
    .then(listings => {
        fs.writeFileSync('./listings.csv', listings.join('\n'));
    })
    .catch(err => {
        console.error(err);
    });

function getDistance(place1, place2) {
    const lat1 = (place1.latitude * Math.PI) / 180;
    const lat2 = (place2.latitude * Math.PI) / 180;
    const lon1 = (place1.longitude * Math.PI) / 180;
    const lon2 = (place2.longitude * Math.PI) / 180;
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a =
        Math.pow(Math.sin(dlat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    const c = 2 * Math.asin(Math.sqrt(a));
    const r = 6371;
    return c * r;
}

function getNightlyPrices(listing) {
    return axios
        .get(`https://www.vrbo.com${listing.detailPageUrl}`)
        .then(res => {
            let regex = new RegExp(/"rentNightsConverted":"([\d,]*)",/);
            const nightlyPrices = regex.exec(res.data)[1].split(',');
            const priciestDates = findPriciestDates(nightlyPrices);
            return [
                listing.propertyId,
                listing.propertyType,
                ...nightlyPrices,
                ...priciestDates,
            ];
        })
        .catch(err =>
            console.error(
                `error while fetching nightly prices for listing id ${listing.propertyId}: ${err} `
            )
        );
}

function findPriciestDates(nightlyPrices) {
    const today = moment();
    let first = {
        price: nightlyPrices[0],
        date: today,
    };
    let second = {
        price: 0,
        date: null,
    };
    let third = {
        price: 0,
        date: null,
    };
    for (let i = 1; i < nightlyPrices.length; i++) {
        if (nightlyPrices[i] > first.price) {
            third = { ...second };
            second = { ...first };
            first.price = nightlyPrices[i];
            first.date = moment(today).add(i, 'd');
        } else if (nightlyPrices[i] > second.price) {
            third = { ...second };
            second.price = nightlyPrices[i];
            second.date = moment(today).add(i, 'd');
        } else if (nightlyPrices[i] > third.price) {
            third.price = nightlyPrices[i];
            third.date = moment(today).add(i, 'd');
        }
    }
    return [
        moment(first.date).format('DD-MM-YYYY'),
        moment(second.date).format('DD-MM-YYYY'),
        moment(third.date).format('DD-MM-YYYY')
    ];
}

module.exports = getListings;
