### README

1. To get results of fixed string and radius in a csv file named listings.csv in the same path, run the following command:

```
node index.js
```

The csv file has following columns: property id, property type, prices of all the dates and then three days with max prices

2. To run the api server, run following command:

```
node server.js
```

The server will run at port 3000.

Example curl request:

```
curl --location --request POST 'localhost:3000/listings' \
--header 'Content-Type: application/json' \
--data-raw '{
    "place": "73 W Monroe St, Chicago, IL USA",
    "radius": 2
}'
```

Please note that radius has to be passed in km.
