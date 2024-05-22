# Contact API Spec

## Create Contact

Endpoint : **POST /api/contacts**

Request Header :
- X-API-TOKEN : token

Request Body : 
```json
{
    "first_name": "Surya",
    "last_name": "Dharma",
    "email": "surya@mail.com",
    "phone": "0811111111"
}
```

Response Body (Success) : 
```json
{
    "data": {
        "id": 1,
        "first_name": "Surya",
        "last_name": "Dharma",
        "email": "surya@mail.com",
        "phone": "0811111111" 
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "First name must not blank"
}
```

## Get Contact

Endpoint : **GET /api/contacts/:id**

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data": {
        "id": 1,
        "first_name": "Surya",
        "last_name": "Dharma",
        "email": "surya@mail.com",
        "phone": "0811111111" 
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Contact is not found"
}
```

## Update Contact

Endpoint : **PUT /api/contacts/:id**

Request Header :
- X-API-TOKEN : token

Request Body : 
```json
{
    "first_name": "Surya",
    "last_name": "Dharma",
    "email": "surya@mail.com",
    "phone": "0811111111"
}
```

Response Body (Success) : 
```json
{
    "data": {
        "id": 1,
        "first_name": "Surya",
        "last_name": "Dharma",
        "email": "surya@mail.com",
        "phone": "0811111111" 
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "First name must not blank"
}
```

## Remove Contact

Endpoint : **DELETE /api/contacts/:id**

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
    "errors": "Contact is not found"
}
```

## Search Contact

Endpoint : **GET /api/contacts**

Query Parameter :
- name: string, contact firstname or last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header :
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Surya",
            "last_name": "Dharma",
            "email": "surya@mail.com",
            "phone": "0811111111" 
        },
        {
            "id": 2,
            "first_name": "Surya",
            "last_name": "Dharma",
            "email": "surya@mail.com",
            "phone": "0811111111" 
        }
    ],
    "pagging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Unauthorized"
}
```