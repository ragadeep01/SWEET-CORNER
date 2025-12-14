Sweet Shop Management System

TDD Kata – Full Stack Application

A full-stack Sweet Shop Management System built using modern web technologies.
The application allows users to browse, search, and purchase sweets, while admin users can manage inventory securely.
The project follows Test-Driven Development (TDD) principles and demonstrates clean architecture, authentication, role-based access, and responsible AI usage.


🚀 Features 

👤 Authentication
- User Registration
- User Login
- JWT-based Authentication
- Role-based access (User / Admin)

🍭 Sweets Management
- Add new sweets (Admin)
- View all available sweets

Search sweets by:
- Name
- Category
- Price range

- Update sweet details (Admin)
- Delete sweets (Admin)


📦 Inventory Management
- Purchase sweets (quantity decreases)
- Restock sweets (Admin only)
- Purchase button disabled when stock is 0


🧪 Test-Driven Development
- Backend logic implemented using TDD

🛠️ Tech Stack
Backend: 
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Jest + Supertest for testing

Frontend:
- React.js
- CSS (custom styling, no Tailwind)
- Fetch API for backend communication

Tools & Workflow:
- Git & GitHub
- Postman (API testing)
- VS Code

⚙️ Setup & Installation
🔧 Prerequisites:
   - Node.js (v18+ recommended)
   - MongoDB (local)
   - Git

Backend Setup:
- cd backend
- npm install

Run the backend server:
- npm run back-end

Frontend Setup:
- cd frontend
- npm install
- npm run front-end

Frontend will run on:
- http://localhost:5173

for frontend: 
- npm run front-end

to run entire application:
- npm run fullstack

for testing:
- npm test

Screenshots:

Landing Page:
![WhatsApp Image 2025-12-14 at 10 09 59 PM](https://github.com/user-attachments/assets/b868c5a4-7d33-4d6e-8331-6710ec1d9801)
<img width="1280" height="592" alt="image" src="https://github.com/user-attachments/assets/09b1a186-6b6f-4b01-82a1-8a4c6a2c610c" />


Login Page:
![WhatsApp Image 2025-12-14 at 10 18 54 PM](https://github.com/user-attachments/assets/e7cd37ce-e90f-4eff-8760-8d7c153235ce)


Dashboard(Admin):
<img width="1280" height="578" alt="image" src="https://github.com/user-attachments/assets/05f39465-ea31-4a0a-bce1-bc291fcdeebb" />


Add Sweet:
<img width="1280" height="585" alt="image" src="https://github.com/user-attachments/assets/3beed535-8def-46e1-9f33-9c408cb58e3c" />


Admin can update and delete sweets:
![WhatsApp Image 2025-12-14 at 10 19 51 PM](https://github.com/user-attachments/assets/f1b28a08-7e48-4383-8732-3a3131c311eb)


Order Management Dashboard (Admin)
![WhatsApp Image 2025-12-14 at 10 21 17 PM](https://github.com/user-attachments/assets/0ef22a68-a130-4908-9574-8210f21723de)


Dashboard(Buyer):
<img width="1280" height="587" alt="image" src="https://github.com/user-attachments/assets/c1239ffe-9b13-419e-9964-d21283f2f290" />


Category-wise:
<img width="1280" height="584" alt="image" src="https://github.com/user-attachments/assets/52389b61-d3eb-496c-a88a-1c94ee859a72" />


Search Feature(Customer):
![WhatsApp Image 2025-12-14 at 10 28 10 PM](https://github.com/user-attachments/assets/f7e54a6c-125f-412c-bcb2-c8fe7ec691e8)


Customer can order sweets:
<img width="1280" height="580" alt="image" src="https://github.com/user-attachments/assets/ca55cd85-2f40-43c2-aae6-e0de44a2a91a" />


Order Details(Buyer-side):
<img width="1280" height="610" alt="image" src="https://github.com/user-attachments/assets/fd07aa96-bb3c-4b71-9a7e-9054aaf80c00" />
<img width="1280" height="553" alt="image" src="https://github.com/user-attachments/assets/8977fc30-0f86-4e81-9398-87cf781c61d5" />

