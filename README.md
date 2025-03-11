# Apollo GraphQL Full-Stack Application

This project consists of a full-stack application using Apollo GraphQL. It includes a backend server built with Apollo Server and Express.js and a frontend client built with React, Apollo Client, and React Router.

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js
- Yarn

### Installation & Setup

1. Clone the Repository

2. Start the Server

Navigate to the server folder and install dependencies:

```
cd server
yarn install
```

Then, start the server:

```
yarn start
```

The GraphQL server will run at http://localhost:4000/graphql.

3. Start the Client

Open a new terminal, navigate to the client folder, and install dependencies:

```
cd client
yarn install
```

Then, start the React application:

```
yarn start
```

The client will run at http://localhost:3000/.

## Project Structure

```
.
├── client/ # React app with Apollo Client and React Router
├── server/ # Apollo Server with Express.js
└── README.md # Project documentation
```

## Features

- GraphQL API using Apollo Server
- React frontend with Apollo Client
- React Router for navigation
- CRUD operations for managing people and cars
