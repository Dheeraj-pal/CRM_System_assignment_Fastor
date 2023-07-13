# Backend for CRM System

This project focuses on developing the backend of a Customer Relationship Management (CRM) system using Node.js, Express, MongoDB, and JWT authentication. The CRM system enables employees or counselors to effectively manage and track customer enquiries, claim leads, and access both public and private enquiries within the system.

## Features

The CRM system backend offers the following features:

- Employee/counselor registration and login functionality for secure access.
- API endpoints to handle public enquiry form submissions without requiring authentication.
- APIs to claim leads and assign them to specific employees.
- APIs to fetch unclaimed leads and view leads claimed by logged-in users.

## Getting Started

To set up the project, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Dheeraj-pal/CRM_System_assignment_Fastor.git
```

2. Install the dependencies:

```
cd CRM_System_assignment_Fastor
npm install
```

### Configuration

1. Create a `.env` file in the root directory.
2. Define the following variables in the `.env` file:

```
PORT=9090
MONGODB_URI=your-mongodb_uri
JWT_SECRET=your-secret-key
```

Replace `your-secret-key` & `your-mongodb_uri` with your own secret key for JWT authentication and MongoDB URI.

### Starting the Server

Run the following command to start the server:

```
npm run start
```

The server will start running on http://localhost:9090.

## API Endpoints

- POST /counselor/register - Register a new employee.
- POST /counselor/login - Employee login and generate JWT token.
- POST /enquiries/create - Submit a public enquiry form.
- PATCH /enquiries/claim/:enquiryID - Claim an enquiry by ID.
- GET /enquiries/unclaimed - Fetch unclaimed enquiries.
- GET /enquiries/claimed - Fetch enquiries claimed by the logged-in employee.

## Dependencies

The project uses the following main dependencies:

- Express - Web application framework for Node.js.
- Mongoose - MongoDB object modeling for Node.js.
- jsonwebtoken - JSON Web Token library for authentication.

Feel free to explore the codebase and modify it according to your specific needs.

