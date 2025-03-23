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
