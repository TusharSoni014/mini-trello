# Crework Trello Clone

A full-stack Trello clone project built with Next.js, Express, and MongoDB.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Frontend (Next.js)](#frontend-nextjs)
4. [Backend (Express)](#backend-express)
5. [Database (MongoDB)](#database-mongodb)
6. [Authentication](#authentication)
7. [API Routes](#api-routes)
8. [Deployment](#deployment)

## Getting Started

### Prerequisites

- Node.js (version 16.0.0 or later)
- MongoDB

### Installation

1. Clone the repository:
`git clone https://github.com/your-username/crework-trello-clone.git`

2. Install dependencies for both client and server:
`cd client && npm install cd ../server && npm install`

3. Set up environment variables:
- Create a `.env` file in the server directory
- Add necessary environment variables (e.g., `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`)

4. Start the development servers:
- For the client: `npm run dev` (runs on http://localhost:3000)
- For the server: `npm run dev` (runs on http://localhost:4000)

## Project Structure

The project is divided into two main parts:

1. `client/`: Next.js frontend application
2. `server/`: Express backend application

## Frontend (Next.js)

The frontend is built using Next.js, a React framework that enables server-side rendering and generates static websites.

Key features:
- Server-side rendering
- API routes
- Tailwind CSS and Shadcn UI for styling
- TypeScript as a language

To start the frontend development server:
`cd client npm run dev`

## Backend (Express)

The backend is built using Express.js, a minimal and flexible Node.js web application framework.

Key features:
- RESTful API design with MVC Architecture
- JWT authentication
- Middleware for request processing

To start the backend development server:
`cd server npm run dev`

## Database (MongoDB)

MongoDB is used as the database for this project. Ensure you have MongoDB installed and running locally, or use a cloud-hosted solution like MongoDB Atlas.

## Authentication

User authentication is implemented using JSON Web Tokens (JWT). The `verifyToken` middleware in `server/src/middlewares/verifyToken.ts` handles token verification for protected routes.

## API Routes

The main API routes are defined in:
- `server/src/routes/userRouter.ts`: User-related operations
- `server/src/routes/tasksRouter.ts`: Task-related operations

## Deployment

### Frontend Deployment

The easiest way to deploy the Next.js frontend is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Backend Deployment

The Express backend can be deployed to various platforms such as Heroku, DigitalOcean, or AWS.

For more detailed deployment instructions, refer to the documentation of your chosen hosting platform.