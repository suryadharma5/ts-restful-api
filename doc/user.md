# User API Spec

## Register User

Endpoint : **POST /api/users**

Request Body: 
```json
{
    "username": "surya",
    "password": "rahasia",
    "name": "Surya Dharma"
}
```

Response Body (Success) : 
```json
{
    "data": {
        "username": "surya",
        "name": "Surya Dharma"
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Username is required"
}
```

## Login User

Endpoint : **POST /api/users/login**

Request Body: 
```json
{
    "username": "surya",
    "password": "rahasia",
}
```

Response Body (Success) : 
```json
{
    "data": {
        "username": "surya",
        "name": "Surya Dharma",
        "token": "(UUID)"
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Enter a correct password and username"
}
```

## Get User

Endpoint : **GET /api/users/current**

Request Header : 
- X-API-TOKEN : token

Response Body (Success) : 
```json
{
    "data": {
        "username": "surya",
        "name": "Surya Dharma",
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Unauthorized"
}
```

## Update User

Endpoint : **PATCH /api/users/current**

Request Header : 
- X-API-TOKEN : token

Request Body: 
```json
{
    "password": "rahasia", //optional
    "name": "Surya Dharma", //optional
}
```

Response Body (Success) : 
```json
{
    "data": {
        "username": "surya",
        "name": "Surya Dharma",
    }
}
```

Response Body (Failed) : 
```json
{
    "errors": "Unauthorized"
}
```

## Logout

Endpoint : **DELETE /api/users/current**

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
    "errors": "Unauthorized"
}
```