# BookYourRide.com

A full-stack ride-hailing platform built with the MERN stack, replicating core features of modern ride-sharing applications like Uber. The platform enables users to book rides, track drivers in real-time, and manage their accounts seamlessly.

## Project Overview

BookYourRide.com is a comprehensive ride-booking application that connects passengers with drivers through an intuitive web interface. The platform leverages Google Maps API for real-time location tracking, route optimization, and accurate distance calculations. With secure JWT-based authentication, dynamic fare calculation, and real-time communication via Socket.IO, this project demonstrates a production-ready architecture for ride-hailing services.

### Key Features

- **Real-time Ride Booking**: Users can request rides instantly with live driver tracking
- **Google Maps Integration**: Interactive maps for location selection, route visualization, and distance estimation
- **Secure Authentication**: JWT-based token authentication for both users and drivers (captains)
- **Dynamic Fare Calculation**: Automatic fare estimation based on distance, vehicle type, and real-time factors
- **Multi-Vehicle Support**: Support for cars, motorcycles, and auto-rickshaws with different pricing
- **Driver Management**: Comprehensive captain registration and profile management system
- **Live Location Tracking**: Real-time GPS tracking using Socket.IO for seamless ride experience
- **OTP Verification**: Secure ride verification system using one-time passwords

## Tech Stack

### Frontend
- **React.js**: Component-based UI library for building interactive interfaces
- **HTML5**: Semantic markup for web structure
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Axios**: HTTP client for API communication
- **React Router**: Client-side routing for single-page application navigation
- **Socket.IO Client**: Real-time bidirectional communication with backend
- **Google Maps React**: Integration with Google Maps API for location services

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for building RESTful APIs
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB
- **JWT (JSON Web Tokens)**: Secure authentication and authorization
- **Socket.IO**: Real-time event-based communication
- **Google Maps API**: Geocoding, distance calculation, and autocomplete services
- **bcrypt**: Password hashing for secure authentication
- **Express Validator**: Request validation middleware

## API Documentation

### User Endpoints

#### Register User

**Endpoint:** `/users/register`

**Method:** `POST`

**Description:** Registers a new user account with provided credentials.

**Request Body:**

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): User's first name (minimum 3 characters).
  - `lastname` (string, optional): User's last name (minimum 3 characters).
- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

**Example Request:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Example Response:**

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
- `token` (string): JWT authentication token.

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Login User

**Endpoint:** `/users/login`

**Method:** `POST`

**Description:** Authenticates a user using their email and password, returning a JWT token upon successful login.

**Request Body:**

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address (must be a valid email).
- `password` (string, required): User's password (minimum 6 characters).

**Example Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Example Response:**

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.
- `token` (string): JWT authentication token.

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Get User Profile

**Endpoint:** `/users/profile`

**Method:** `GET`

**Description:** Retrieves the profile information of the currently authenticated user.

**Authentication:**

Requires a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

**Example Response:**

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
  - `email` (string): User's email address.

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

---

#### Logout User

**Endpoint:** `/users/logout`

**Method:** `GET`

**Description:** Logs out the current user and blacklists the token provided in cookie or headers.

**Authentication:**

Requires a valid JWT token in the Authorization header or cookie:
```
Authorization: Bearer <token>
```

**Example Response:**

- `message` (string): Logout confirmation message.

```json
{
  "message": "Logout successfully"
}
```

### Captain (Driver) Endpoints

#### Register Captain

**Endpoint:** `/captains/register`

**Method:** `POST`

**Description:** Registers a new captain by creating a captain account with the provided information.

**Request Body:**

The request body should be in JSON format and include the following fields:

- `fullname` (object):
  - `firstname` (string, required): Captain's first name (minimum 3 characters).
  - `lastname` (string, optional): Captain's last name (minimum 3 characters).
- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).
- `vehicle` (object):
  - `color` (string, required): Vehicle color (minimum 3 characters).
  - `plate` (string, required): Vehicle plate number (minimum 3 characters).
  - `capacity` (number, required): Vehicle passenger capacity (minimum 1).
  - `vehicleType` (string, required): Type of vehicle (must be 'car', 'motorcycle', or 'auto').

**Example Request:**
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Response:**

- `captain` (object):
  - `fullname` (object):
    - `firstname` (string): Captain's first name.
    - `lastname` (string): Captain's last name.
  - `email` (string): Captain's email address.
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (string): JWT authentication token.

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Login Captain

**Endpoint:** `/captains/login`

**Method:** `POST`

**Description:** Authenticates a captain using their email and password, returning a JWT token upon successful login.

**Request Body:**

The request body should be in JSON format and include the following fields:

- `email` (string, required): Captain's email address (must be a valid email).
- `password` (string, required): Captain's password (minimum 6 characters).

**Example Request:**
```json
{
  "email": "jane.smith@example.com",
  "password": "securepassword123"
}
```

**Example Response:**

- `captain` (object):
  - `fullname` (object):
    - `firstname` (string): Captain's first name.
    - `lastname` (string): Captain's last name.
  - `email` (string): Captain's email address.
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.
- `token` (string): JWT authentication token.

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### Get Captain Profile

**Endpoint:** `/captains/profile`

**Method:** `GET`

**Description:** Retrieves the profile information of the currently authenticated captain.

**Authentication:**

Requires a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

**Example Response:**

- `captain` (object):
  - `fullname` (object):
    - `firstname` (string): Captain's first name.
    - `lastname` (string): Captain's last name.
  - `email` (string): Captain's email address.
  - `vehicle` (object):
    - `color` (string): Vehicle color.
    - `plate` (string): Vehicle plate number.
    - `capacity` (number): Vehicle passenger capacity.
    - `vehicleType` (string): Type of vehicle.

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

#### Logout Captain

**Endpoint:** `/captains/logout`

**Method:** `GET`

**Description:** Logs out the current captain and blacklists the token provided in cookie or headers.

**Authentication:**

Requires a valid JWT token in the Authorization header or cookie:
```
Authorization: Bearer <token>
```

**Example Response:**

- `message` (string): Logout confirmation message.

```json
{
  "message": "Logout successfully"
}
```

### Maps Endpoints

#### Get Coordinates

**Endpoint:** `/maps/get-coordinates`

**Method:** `GET`

**Description:** Retrieves the coordinates (latitude and longitude) for a given address.

**Request Parameters:**

- `address` (string, required): The address for which to retrieve coordinates.

**Example Request:**
```
GET /maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
```

**Example Response:**

- `ltd` (number): Latitude coordinate.
- `lng` (number): Longitude coordinate.

```json
{
  "ltd": 37.4224764,
  "lng": -122.0842499
}
```

**Error Response:**

- `400 Bad Request`: If the address parameter is missing or invalid.
- `404 Not Found`: If the coordinates for the given address could not be found.

```json
{
  "message": "Coordinates not found"
}
```

---

#### Get Distance and Time

**Endpoint:** `/maps/get-distance-time`

**Method:** `GET`

**Description:** Retrieves the distance and estimated travel time between two locations.

**Request Parameters:**

- `origin` (string, required): The starting address or location.
- `destination` (string, required): The destination address or location.

**Example Request:**
```
GET /maps/get-distance-time?origin=New+York,NY&destination=Los+Angeles,CA
```

**Example Response:**

- `distance` (object):
  - `text` (string): Human-readable distance.
  - `value` (number): Distance in meters.
- `duration` (object):
  - `text` (string): Human-readable duration.
  - `value` (number): Duration in seconds.

```json
{
  "distance": {
    "text": "2,789 miles",
    "value": 4486540
  },
  "duration": {
    "text": "1 day 18 hours",
    "value": 154800
  }
}
```

**Error Response:**

- `400 Bad Request`: If the origin or destination parameter is missing or invalid.
- `404 Not Found`: If the distance and time for the given locations could not be found.

```json
{
  "message": "No routes found"
}
```

---

#### Get Address Suggestions

**Endpoint:** `/maps/get-suggestions`

**Method:** `GET`

**Description:** Retrieves autocomplete suggestions for a given input string.

**Request Parameters:**

- `input` (string, required): The input string for which to retrieve suggestions.

**Example Request:**
```
GET /maps/get-suggestions?input=1600+Amphitheatre
```

**Example Response:**

An array of address suggestions:

```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

**Error Response:**

- `400 Bad Request`: If the input parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error retrieving suggestions.

```json
{
  "message": "Unable to fetch suggestions"
}
```

### Ride Endpoints

#### Create Ride

**Endpoint:** `/rides/create`

**Method:** `POST`

**Description:** Creates a new ride with the provided information.

**Authentication:**

Requires a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

**Request Body:**

The request body should be in JSON format and include the following fields:

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).
- `vehicleType` (string, required): The type of vehicle (must be 'auto', 'car', or 'moto').

**Example Request:**
```json
{
  "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
  "destination": "1 Infinite Loop, Cupertino, CA",
  "vehicleType": "car"
}
```

**Example Response:**

- `ride` (object):
  - `user` (string): User ID.
  - `pickup` (string): Pickup address.
  - `destination` (string): Destination address.
  - `fare` (number): Fare amount.
  - `status` (string): Ride status.
  - `duration` (number): Duration in seconds.
  - `distance` (number): Distance in meters.
  - `otp` (string): OTP for the ride.

```json
{
  "ride": {
    "user": "60d5ec49f1b2c72b8c8e4f1a",
    "pickup": "1600 Amphitheatre Parkway, Mountain View, CA",
    "destination": "1 Infinite Loop, Cupertino, CA",
    "fare": 75.0,
    "status": "pending",
    "duration": 1800,
    "distance": 15000,
    "otp": "123456"
  }
}
```

**Error Response:**

- `400 Bad Request`: If any required field is missing or invalid.
- `500 Internal Server Error`: If there is an error creating the ride.

```json
{
  "message": "Error message"
}
```

---

#### Get Fare Estimate

**Endpoint:** `/rides/get-fare`

**Method:** `GET`

**Description:** Retrieves the fare estimate for a ride between the provided pickup and destination addresses.

**Authentication:**

Requires a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

**Request Parameters:**

- `pickup` (string, required): The pickup address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

**Example Request:**
```
GET /rides/get-fare?pickup=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
```

**Example Response:**

- `auto` (number): Fare for auto-rickshaw.
- `car` (number): Fare for car.
- `moto` (number): Fare for motorcycle.

```json
{
  "auto": 50.0,
  "car": 75.0,
  "moto": 40.0
}
```

**Error Response:**

- `400 Bad Request`: If any required parameter is missing or invalid.
- `500 Internal Server Error`: If there is an error calculating the fare.

```json
{
  "message": "Error message"
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Google Maps API Key
- npm or yarn

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookyourride.git
cd bookyourride/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookyourride
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_SOCKET_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3001`

## Project Structure

```
bookyourride/
├── backend/
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── captainController.js
│   │   ├── rideController.js
│   │   └── mapsController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Captain.js
│   │   └── Ride.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── captainRoutes.js
│   │   ├── rideRoutes.js
│   │   └── mapsRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validationMiddleware.js
│   ├── config/
│   │   └── database.js
│   ├── utils/
│   │   └── tokenBlacklist.js
│   └── server.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Map.jsx
    │   │   ├── RideBooking.jsx
    │   │   ├── VehicleSelection.jsx
    │   │   └── UserProfile.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── CaptainDashboard.jsx
    │   │   └── UserDashboard.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   └── socket.js
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Features in Detail

### Authentication System
- Secure password hashing using bcrypt
- JWT token-based authentication with expiration
- Token blacklisting for logout functionality
- Separate authentication flows for users and captains
- Protected routes with middleware validation

### Real-time Tracking
- Socket.IO integration for bidirectional communication
- Live location updates from drivers
- Real-time ride status notifications
- Instant driver assignment alerts

### Fare Calculation
- Distance-based pricing algorithm
- Vehicle-type specific rates (car, motorcycle, auto)
- Dynamic pricing based on demand (can be extended)
- Transparent fare breakdown for users

### Map Integration
- Interactive Google Maps interface
- Address autocomplete for easy location input
- Route visualization with estimated time
- Geocoding and reverse geocoding
- Distance matrix calculations

## Security Features

- Password encryption using bcrypt
- JWT token authentication with secure secret keys
- Token blacklisting to prevent reuse after logout
- Input validation using Express Validator
- Protected API endpoints with authentication middleware
- CORS configuration for cross-origin requests

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Driver rating and review system
- Ride history and analytics dashboard
- Push notifications for mobile apps
- Advanced surge pricing algorithm
- Multi-language support
- Ride scheduling feature
- In-app chat between users and drivers
- Admin panel for platform management


