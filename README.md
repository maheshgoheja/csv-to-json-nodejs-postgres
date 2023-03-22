# csv-to-json-nodejs-postgres
- CSV to JSON convertor API with headers having nested object

# Requried:
Node v8.16.0 or higher

# API invocation
GET http://localhost:8080/api/convert
GET http://localhost:8080/

# API output object
"result" - It will return the list of json objects converted from given CSV file.
"report" - It will return the distribution of age groups from the available data.

{
    "result": [
        {
            "name": {
                "firstName": "Ashlee",
                "lastName": "Iaverne"
            },
            "age": "50",
            "address": {
                "line1": "LSnVuuKoNHFfJrdvjyLKymuLsjZ",
                "line2": "OA LPcpyKNOjRElUd",
                "state": "eDm",
                "city": "pRevf"
            },
            "gender": "male",
        }
   ],
    "report": {
        "headers": [
            "Age-Group",
            "%Distribution"
        ],
        "details": [
            {
                "< 20": "0",
                "20 to 40": "0",
                "40 to 60": "1",
                "> 60": "0",
                "count": "1"
            }
        ]
    }
}