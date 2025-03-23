# Uber Clone API Documentation

## User Registration
**Endpoint:** `POST /user/register`

### Description
Creates a new user account in the system. Returns an authentication token upon successful registration.

### Request Body
```json
{
  "fullname": {
    "firstname": "String", // Required, minimum 3 characters
    "lastname": "String"   // Required, minimum 3 characters
  },
  "email": "String",       // Required, valid email format
  "password": "String"     // Required, minimum 6 characters
}
```

### Response

#### Success (201 Created)
```json
{
  "token": "JWT_TOKEN_STRING",
  "newUser": {
    "fullname": {
      "firstname": "String",
      "lastname": "String"
    },
    "email": "String",
    "socketId": null,
    "_id": "String",
    "createdAt": "Date",
    "updatedAt": "Date"
  }
}
```

### Status Codes
- **201 Created** - User successfully registered
- **400 Bad Request** - Validation error or user already exists
  - Possible messages:
    - "Please fill in all fields"
    - "User already exists" 
    - "First name must be at least 3 characters long"
    - "Last name must be at least 3 characters long"
    - "Password must be at least 6 characters long"
    - "Please enter a valid email address"
- **500 Internal Server Error** - Server-side error

### Example
```bash
curl -X POST \
  http://localhost:4000/user/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

## User Login
**Endpoint:** `POST /user/login`

### Description
Authenticates a user and provides an authentication token for accessing protected resources.

### Request Body
```json
{
  "email": "String",       // Required, valid email format
  "password": "String"     // Required
}
```

### Response

#### Success (200 OK)
```json
{
  "token": "JWT_TOKEN_STRING",
  "user": {
    "fullname": {
      "firstname": "String",
      "lastname": "String"
    },
    "email": "String",
    "socketId": null,
    "_id": "String"
  }
}
```

### Status Codes
- **200 OK** - User successfully authenticated
- **400 Bad Request** - Validation error or invalid credentials
  - Possible messages:
    - "Please fill in all fields"
    - "Invalid Credentials"
    - "Please enter a valid email address"
- **500 Internal Server Error** - Server-side error

### Example
```bash
curl -X POST \
  http://localhost:4000/user/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

## Get User Profile
**Endpoint:** `GET /user/getProfile`

### Description
Retrieves the authenticated user's profile information. Requires authentication.

### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

### Response

#### Success (200 OK)
```json
{
  "user": {
    "fullname": {
      "firstname": "String",
      "lastname": "String"
    },
    "email": "String",
    "socketId": null,
    "_id": "String"
  }
}
```

### Status Codes
- **200 OK** - Profile successfully retrieved
- **401 Unauthorized** - Missing or invalid authentication token
- **500 Internal Server Error** - Server-side error

### Example
```bash
curl -X GET \
  http://localhost:4000/user/getProfile \
  -H 'Authorization: Bearer JWT_TOKEN_STRING'
```

## User Logout
**Endpoint:** `GET /user/logout`

### Description
Logs out the currently authenticated user by invalidating their token. Requires authentication.

### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

### Response

#### Success (200 OK)
```json
{
  "message": "Logged out successfully"
}
```

### Status Codes
- **200 OK** - User successfully logged out
- **401 Unauthorized** - Missing or invalid authentication token
- **500 Internal Server Error** - Server-side error

### Example
```bash
curl -X GET \
  http://localhost:4000/user/logout \
  -H 'Authorization: Bearer JWT_TOKEN_STRING'
```

## Captain Registration
**Endpoint:** `POST /captain/register`

### Description
Registers a new captain (driver) account in the system.

### Request Body
```json
{
  "fullname": {
    "firstname": "String",  // Required, minimum 3 characters
    "lastname": "String"    // Required, minimum 3 characters
  },
  "email": "String",        // Required, valid email format
  "password": "String",     // Required, minimum 6 characters
  "vehicle": {
    "color": "String",      // Required, minimum 3 characters
    "plate": "String",      // Required, minimum 3 characters
    "capacity": Number,     // Required, minimum 1
    "vehicleType": "String" // Required, one of: "car", "motorcycle", "auto"
  }
}
```

### Response

#### Success (201 Created)
```json
{
  "msg": "Captain registered successfully"
}
```

### Status Codes
- **201 Created** - Captain successfully registered
- **400 Bad Request** - Validation error or captain already exists
  - Possible messages:
    - "Please enter all fields"
    - "Captain already exists"
    - "First name must be at least 3 characters long"
    - "Last name must be at least 3 characters long"
    - "Password must be at least 6 characters long"
    - "Color must be at least 3 characters long"
    - "Plate must be at least 3 characters long"
    - "Capacity must be at least 1"
    - "Invalid vehicle type"
    - "Please enter a valid email address"
- **500 Internal Server Error** - Server-side error

### Example
```bash
curl -X POST \
  http://localhost:4000/captain/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.captain@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```
