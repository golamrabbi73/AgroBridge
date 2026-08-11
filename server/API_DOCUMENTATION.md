# AgriBridge SCIC/EJP-13 REST API Documentation

Production-ready, scalable REST API built with Express.js, TypeScript, Prisma ORM, and PostgreSQL.

- **Base URL**: `http://localhost:5000/api`
- **Response Format**: `application/json`
- **Authentication**: JWT Bearer Token (`Authorization: Bearer <token>`)

---

## Response Structure

All API responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "message": "Operation description",
  "data": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 1. Authentication Module (`/api/auth`)

### 1.1 Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user with hashed password (bcrypt).
- **Authentication**: None required.
- **Request Body**:
  ```json
  {
    "name": "John Farmer",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Format** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "id": 1,
      "name": "John Farmer",
      "email": "john@example.com",
      "role": "FARMER"
    }
  }
  ```
- **Status Codes**: `201 Created`, `400 Bad Request`

### 1.2 User Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticates user credentials and returns a JWT token.
- **Authentication**: None required.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "name": "John Farmer",
        "email": "john@example.com",
        "role": "FARMER"
      },
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
  }
  ```
- **Status Codes**: `200 OK`, `401 Unauthorized`

### 1.3 Get Current User Profile
- **Endpoint**: `GET /api/auth/me`
- **Description**: Retrieves profile of authenticated user.
- **Authentication**: `Bearer <token>` required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "User profile retrieved successfully",
    "data": {
      "id": 1,
      "name": "John Farmer",
      "email": "john@example.com",
      "role": "FARMER",
      "status": "ACTIVE",
      "createdAt": "2026-08-11T18:00:00.000Z",
      "updatedAt": "2026-08-11T18:00:00.000Z"
    }
  }
  ```
- **Status Codes**: `200 OK`, `401 Unauthorized`, `404 Not Found`

---

## 2. Users Module (`/api/users`)

### 2.1 Get All Users
- **Endpoint**: `GET /api/users`
- **Description**: Retrieves all non-deleted users.
- **Authentication**: None required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Users retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "John Farmer",
        "email": "john@example.com",
        "role": "FARMER",
        "status": "ACTIVE",
        "createdAt": "2026-08-11T18:00:00.000Z"
      }
    ]
  }
  ```
- **Status Codes**: `200 OK`, `500 Internal Server Error`

### 2.2 Get User By ID
- **Endpoint**: `GET /api/users/:id`
- **Description**: Retrieves user details by primary key ID along with their products and bookings.
- **Authentication**: None required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "User retrieved successfully",
    "data": {
      "id": 1,
      "name": "John Farmer",
      "email": "john@example.com",
      "role": "FARMER",
      "status": "ACTIVE",
      "products": [],
      "bookings": []
    }
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `404 Not Found`

### 2.3 Update User
- **Endpoint**: `PATCH /api/users/:id`
- **Description**: Updates user profile (name, role, status).
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "name": "Johnathan Farmer",
    "role": "FARMER",
    "status": "ACTIVE"
  }
  ```
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "User updated successfully",
    "data": {
      "id": 1,
      "name": "Johnathan Farmer",
      "email": "john@example.com",
      "role": "FARMER",
      "status": "ACTIVE"
    }
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`, `404 Not Found`

### 2.4 Delete User (Soft Delete)
- **Endpoint**: `DELETE /api/users/:id`
- **Description**: Performs soft delete (`isDeleted = true`).
- **Authentication**: `Bearer <token>` required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

---

## 3. Categories Module (`/api/categories`)

### 3.1 Create Category
- **Endpoint**: `POST /api/categories`
- **Description**: Creates a new product category.
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "name": "Organic Vegetables",
    "description": "Fresh and organic produce"
  }
  ```
- **Response Format** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Category created successfully",
    "data": {
      "id": 1,
      "name": "Organic Vegetables",
      "description": "Fresh and organic produce",
      "isDeleted": false,
      "createdAt": "2026-08-11T18:00:00.000Z"
    }
  }
  ```
- **Status Codes**: `201 Created`, `400 Bad Request`, `401 Unauthorized`

### 3.2 Get All Categories
- **Endpoint**: `GET /api/categories`
- **Description**: Retrieves all non-deleted categories.
- **Authentication**: None required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Categories retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Organic Vegetables",
        "description": "Fresh and organic produce"
      }
    ]
  }
  ```
- **Status Codes**: `200 OK`, `500 Internal Server Error`

### 3.3 Get Category By ID
- **Endpoint**: `GET /api/categories/:id`
- **Description**: Retrieves single category by ID including associated products.
- **Authentication**: None required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Category retrieved successfully",
    "data": {
      "id": 1,
      "name": "Organic Vegetables",
      "description": "Fresh and organic produce",
      "products": []
    }
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `404 Not Found`

### 3.4 Update Category
- **Endpoint**: `PATCH /api/categories/:id` or `PUT /api/categories/:id`
- **Description**: Updates category details.
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "name": "Organic Fresh Vegetables",
    "description": "Certified organic produce"
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

### 3.5 Delete Category (Soft Delete)
- **Endpoint**: `DELETE /api/categories/:id`
- **Description**: Performs soft delete (`isDeleted = true`).
- **Authentication**: `Bearer <token>` required.
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

---

## 4. Products Module (`/api/products`)

### 4.1 Create Product
- **Endpoint**: `POST /api/products`
- **Description**: Creates a new agricultural product listing.
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "name": "Organic Rice",
    "description": "High quality Basmati Rice",
    "price": 120.50,
    "quantity": 500,
    "categoryId": 1,
    "userId": 1
  }
  ```
- **Response Format** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": {
      "id": 1,
      "name": "Organic Rice",
      "description": "High quality Basmati Rice",
      "price": "120.50",
      "quantity": 500,
      "categoryId": 1,
      "userId": 1,
      "status": "AVAILABLE"
    }
  }
  ```
- **Status Codes**: `201 Created`, `400 Bad Request`, `401 Unauthorized`

### 4.2 Get All Products
- **Endpoint**: `GET /api/products`
- **Description**: Retrieves all non-deleted product listings with category and seller details.
- **Authentication**: None required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Products retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "Organic Rice",
        "price": "120.50",
        "quantity": 500,
        "category": { "id": 1, "name": "Organic Vegetables" },
        "user": { "id": 1, "name": "John Farmer", "email": "john@example.com" }
      }
    ]
  }
  ```
- **Status Codes**: `200 OK`, `500 Internal Server Error`

### 4.3 Get Product By ID
- **Endpoint**: `GET /api/products/:id`
- **Description**: Retrieves product by ID including full category, seller, and review information.
- **Authentication**: None required.
- **Response Format** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Product retrieved successfully",
    "data": {
      "id": 1,
      "name": "Organic Rice",
      "description": "High quality Basmati Rice",
      "price": "120.50",
      "quantity": 500,
      "category": { "id": 1, "name": "Organic Vegetables" },
      "user": { "id": 1, "name": "John Farmer" },
      "reviews": []
    }
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `404 Not Found`

### 4.4 Update Product
- **Endpoint**: `PATCH /api/products/:id` or `PUT /api/products/:id`
- **Description**: Updates product pricing, quantity, or description.
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "price": 115.00,
    "quantity": 450
  }
  ```
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

### 4.5 Delete Product (Soft Delete)
- **Endpoint**: `DELETE /api/products/:id`
- **Description**: Soft deletes product (`isDeleted = true`).
- **Authentication**: `Bearer <token>` required.
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

---

## 5. Reviews Module (`/api/reviews`)

### 5.1 Create Review
- **Endpoint**: `POST /api/reviews`
- **Description**: Creates a product review.
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "rating": 5,
    "comment": "Excellent quality rice!",
    "userId": 1,
    "productId": 1
  }
  ```
- **Status Codes**: `201 Created`, `400 Bad Request`, `401 Unauthorized`

### 5.2 Get All Reviews
- **Endpoint**: `GET /api/reviews`
- **Description**: Retrieves all non-deleted reviews.
- **Authentication**: None required.
- **Status Codes**: `200 OK`, `500 Internal Server Error`

### 5.3 Get Product Reviews
- **Endpoint**: `GET /api/reviews/product/:productId`
- **Description**: Retrieves reviews for a specific product.
- **Authentication**: None required.
- **Status Codes**: `200 OK`, `400 Bad Request`

### 5.4 Get Review By ID
- **Endpoint**: `GET /api/reviews/:id`
- **Description**: Retrieves review by ID.
- **Authentication**: None required.
- **Status Codes**: `200 OK`, `404 Not Found`

### 5.5 Update Review
- **Endpoint**: `PATCH /api/reviews/:id` or `PUT /api/reviews/:id`
- **Description**: Updates review rating or comment.
- **Authentication**: `Bearer <token>` required.
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

### 5.6 Delete Review (Soft Delete)
- **Endpoint**: `DELETE /api/reviews/:id`
- **Description**: Soft deletes review (`isDeleted = true`).
- **Authentication**: `Bearer <token>` required.
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

---

## 6. Bookings Module (`/api/bookings`)

### 6.1 Create Booking
- **Endpoint**: `POST /api/bookings`
- **Description**: Creates a product booking/order and decrements stock quantity transactionally.
- **Authentication**: `Bearer <token>` required.
- **Request Body**:
  ```json
  {
    "quantity": 10,
    "productId": 1,
    "userId": 2
  }
  ```
- **Status Codes**: `201 Created`, `400 Bad Request`, `401 Unauthorized`

### 6.2 Get All Bookings
- **Endpoint**: `GET /api/bookings`
- **Description**: Retrieves all active bookings.
- **Authentication**: None required.
- **Status Codes**: `200 OK`, `500 Internal Server Error`

### 6.3 Get Booking By ID
- **Endpoint**: `GET /api/bookings/:id`
- **Description**: Retrieves booking details by ID.
- **Authentication**: None required.
- **Status Codes**: `200 OK`, `404 Not Found`

### 6.4 Update Booking
- **Endpoint**: `PATCH /api/bookings/:id` or `PUT /api/bookings/:id`
- **Description**: Updates booking quantity or status (`PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`).
- **Authentication**: `Bearer <token>` required.
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`

### 6.5 Delete Booking (Soft Delete)
- **Endpoint**: `DELETE /api/bookings/:id`
- **Description**: Soft deletes booking (`isDeleted = true`).
- **Authentication**: `Bearer <token>` required.
- **Status Codes**: `200 OK`, `400 Bad Request`, `401 Unauthorized`
