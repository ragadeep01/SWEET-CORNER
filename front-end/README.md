Sweet Shop Management System

TDD Kata – Full Stack Application

A full-stack Sweet Shop Management System built using modern web technologies.
The application allows users to browse, search, and purchase sweets, while admin users can manage inventory securely.
The project follows Test-Driven Development (TDD) principles and demonstrates clean architecture, authentication, role-based access, and responsible AI usage.


🚀 Features
👤 Authentication

User Registration

User Login

JWT-based Authentication

Role-based access (User / Admin)

🍭 Sweets Management

Add new sweets (Admin)

View all available sweets

Search sweets by:

Name

Category

Price range

Update sweet details (Admin)

Delete sweets (Admin)

📦 Inventory Management

Purchase sweets (quantity decreases)

Restock sweets (Admin only)

Purchase button disabled when stock is 0

🧪 Test-Driven Development

Backend logic implemented using TDD
Clear Red → Green → Refactor flow in commit history



🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Jest + Supertest for testing

Frontend

React.js

CSS (custom styling, no Tailwind)

Fetch API for backend communication

Tools & Workflow

Git & GitHub

Postman (API testing)

VS Code


⚙️ Setup & Installation
🔧 Prerequisites

Node.js (v18+ recommended)

MongoDB (local)

Git

Backend Setup
cd backend
npm install

Run the backend server:

npm run back-end

Frontend Setup
cd frontend
npm install
npm start


Frontend will run on:

http://localhost:5173


for backend

npm run back-end

for frontend
npm run front-end

entire application

npm run fullstack

for testing
npm test

