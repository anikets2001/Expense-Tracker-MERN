# 📡 API Reference Documentation

Quick reference guide for all API endpoints.

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## 💰 Expense Endpoints

### Get All Expenses
```http
GET /api/expenses?page=1&limit=10&category=Food&startDate=2024-01-01&endDate=2024-01-31&minAmount=10&maxAmount=1000&search=lunch
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)
- `category` (optional) - Filter by category
- `startDate` (optional) - Start date (YYYY-MM-DD)
- `endDate` (optional) - End date (YYYY-MM-DD)
- `minAmount` (optional) - Minimum amount
- `maxAmount` (optional) - Maximum amount
- `search` (optional) - Search in description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "507f1f77bcf86cd799439012",
      "amount": 50,
      "date": "2024-01-15T00:00:00.000Z",
      "category": "Food & Drinks",
      "description": "Lunch",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### Get Single Expense
```http
GET /api/expenses/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "amount": 50,
    "date": "2024-01-15T00:00:00.000Z",
    "category": "Food & Drinks",
    "description": "Lunch",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Create Expense
```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 100,
  "date": "2024-01-15",
  "category": "Food & Drinks",
  "description": "Dinner at restaurant"
}
```

**Required Fields:**
- `amount` (number) - Must be > 0
- `date` (string) - Date in YYYY-MM-DD format
- `category` (string) - Must be one of the predefined categories

**Optional Fields:**
- `description` (string) - Max 500 characters

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "amount": 100,
    "date": "2024-01-15T00:00:00.000Z",
    "category": "Food & Drinks",
    "description": "Dinner at restaurant",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

---

### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 120,
  "description": "Updated description"
}
```

**Note:** You can update any field. Only include fields you want to update.

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "amount": 120,
    "date": "2024-01-15T00:00:00.000Z",
    "category": "Food & Drinks",
    "description": "Updated description",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

---

### Get Expense Statistics
```http
GET /api/expenses/stats?startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate` (optional) - Start date for statistics
- `endDate` (optional) - End date for statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "totalExpenses": 1500,
    "expensesByCategory": [
      {
        "_id": "Food & Drinks",
        "total": 500,
        "count": 10
      },
      {
        "_id": "Transport",
        "total": 300,
        "count": 5
      }
    ],
    "monthlyExpenses": [
      {
        "_id": "2024-01",
        "total": 1500,
        "count": 15
      }
    ],
    "totalCount": 15
  }
}
```

---

## 📋 Valid Categories

- Food & Drinks
- Transport
- Housing
- Entertainment
- Shopping
- Utilities
- Healthcare
- Education
- Travel
- Other

---

## 🔒 Authentication

All expense endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide amount, date, and category"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Expense not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 📝 Example Usage with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Expense
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"amount":100,"date":"2024-01-15","category":"Food & Drinks","description":"Lunch"}'
```

### Get Expenses
```bash
curl -X GET "http://localhost:5000/api/expenses?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🧪 Testing with Postman

1. **Create a Collection:**
   - Create a new collection called "Expense Tracker API"

2. **Set Environment Variables:**
   - Create an environment with:
     - `base_url`: `http://localhost:5000/api`
     - `token`: (will be set after login)

3. **Create Requests:**
   - Register → Save token from response
   - Login → Save token from response
   - Get Me → Use token in Authorization header
   - Create Expense → Use token
   - Get Expenses → Use token
   - etc.

4. **Use Pre-request Scripts:**
   - Automatically add token to requests:
   ```javascript
   pm.request.headers.add({
     key: 'Authorization',
     value: 'Bearer ' + pm.environment.get('token')
   });
   ```

---

**Happy Coding! 🚀**

