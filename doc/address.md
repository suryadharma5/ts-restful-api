# Contact API Spec

## Create Address

Endpoint : **POST /api/contacts/:idContact/addresses**

Request Header :
- X-API-TOKEN : token

Request Body : 
```json
{
    "street": "nama jalan",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "22312"
}
```

Response Body (Success) : 
```json
{
    "data": {
        "id": 1,
        "street": "nama jalan",
        "city": "kota apa",
        "province": "provinsi apa",
        "country": "negara apa",
        "postal_code": "22312"
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "postal_code is required"
}
```

## Get Address

Endpoint : **POST /api/contacts/:idContact/addresses/:idAddresses**

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data": {
        "id": 1,
        "street": "nama jalan",
        "city": "kota apa",
        "province": "provinsi apa",
        "country": "negara apa",
        "postal_code": "22312"
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Address is not found"
}
```

## Update Address

Endpoint : **PUT /api/contacts/:idContact/addresses/:idAddresses**

Request Header :
- X-API-TOKEN : token

Request Body : 
```json
{
    "street": "nama jalan",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "22312"
}
```

Response Body (Success) : 
```json
{
    "data": {
        "id": 1,
        "street": "nama jalan",
        "city": "kota apa",
        "province": "provinsi apa",
        "country": "negara apa",
        "postal_code": "22312"
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "postal_code is required"
}
```

## Remove Address

Endpoint : **DELETE /api/contacts/:idContact/addresses/:idAddresses**

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data": "OK"
}
```

Response Body (Failed) : 
```json
{
    "errors": "Address is not found"
}
```

## List Address

Endpoint : **PUT /api/contacts/:idContact/addresses/:idAddresses**

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data": [
        {
            "id": 1,
            "street": "nama jalan",
            "city": "kota apa",
            "province": "provinsi apa",
            "country": "negara apa",
            "postal_code": "22312"
        },
        {
            "id": 2,
            "street": "nama jalan",
            "city": "kota apa",
            "province": "provinsi apa",
            "country": "negara apa",
            "postal_code": "22312" 
        }
    ]
}
```

Response Body (Failed) : 
```json
{
    "errors": "Contact is not found"
}
```

