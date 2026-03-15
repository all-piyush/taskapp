Task Manager MERN App

A full-stack Task Manager application built using the MERN stack.  
Users can create, update, delete, search, filter and paginate tasks.

## Tech Stack

Frontend:
- React.js
- React Router
- CSS
- React Icons

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

Other Tools:
- dotenv
- cookie-parser
- cors
- dayjs

## Project Setup

### 1. Clone the repository

git clone https://github.com/yourusername/task-manager.git

cd task-manager


### 2. Install dependencies

Frontend

cd frontend
npm install

Backend

cd backend
npm install


### 3. Setup environment variables

Create a `.env` file inside the backend folder.

Example:

PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key


### 4. Run the backend server

cd backend
npm start


### 5. Run the frontend

cd frontend
npm start

## Architecture

This application follows a client-server architecture.

Frontend (React)
Handles UI rendering, task creation, editing, searching, filtering, and pagination.

Backend (Express)
Provides REST API endpoints for managing tasks.

Database (MongoDB)
Stores task data including title, description, status, and creation date.

## Folder Structure

project-root

frontend/
  src/
    components/
    pages/
    App.js

backend/
  routes/
  controllers/
  models/
  config/
  server.js
