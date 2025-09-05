🎓 Post-Graduate Application Backend

A backend system for managing student applications, payments, and admin/staff records in a postgraduate admission process. Built with Node.js, Express, Sequelize, and MySQL.

🚀 Features

👩‍🎓 Student

Register and login

Submit application

Upload payment receipt

Track application/payment status

💳 Payment

Upload payment receipts (with file support)

Approve/reject payments

View all payment records

🛠️ Admin / Staff

ICT admin can create new staff/admin accounts

Manage and view student/staff records

Role-based access control (Academic / Non-Teaching staff)

📚 Programme

List programme types (MSc, PhD, etc.)

List programme modes (Full-time, Part-time)

🛠️ Tech Stack

Backend: Node.js + Express.js

Database: MySQL (via Sequelize ORM)

Auth: JWT (students & staff only)

Testing: Mocha + Chai + Supertest

File Uploads: Multer

📂 Project Structure
Post-Graduate-backend/
├── controllers/       # Business logic
├── models/            # Sequelize models
├── routes/            # API routes
├── middleware/        # Auth & custom middlewares
├── config/            # Database config
├── tests/             # Automated tests
├── server.js          # Entry point
└── package.json

⚙️ Setup & Installation
1. Clone the repo
git clone https://github.com/your-username/Post-Graduate-backend.git
cd Post-Graduate-backend

2. Install dependencies
npm install

3. Configure environment

Create a .env file:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=postgraduate_db
JWT_SECRET=supersecret

4. Run migrations & sync DB
npx sequelize-cli db:migrate

5. Start the server
npm start


Server runs on: http://localhost:5000

🔑 API Endpoints
🎓 Student
Method	Endpoint	Description
POST	/api/student/apply	Register a new student
POST	/api/student/login	Student login (returns JWT)
POST	/api/student/payment	Upload payment receipt (auth required)
GET	/api/student/status	View application/payment status (auth required)
💳 Payment
Method	Endpoint	Description
POST	/api/payment/upload	Upload receipt file (auth required)
PUT	/api/payment/approve/:id	Approve/reject a payment (auth required)
GET	/api/payment	List all payments (auth required)
🛠️ Admin / Staff
Method	Endpoint	Description
POST	/api/admin/register	ICT admin creates staff/admin account
POST	/api/admin/login	Admin login
GET	/api/admin/admins	List all admins
GET	/api/admin/students	List all registered students
GET	/api/admin/staff/:id	Fetch staff record by ID
📚 Programme
Method	Endpoint	Description
GET	/api/programme/modes	List available programme modes
GET	/api/programme/types	List available programme types
🧪 Running Tests

Run all tests:

npm test

📌 Notes

JWT authentication is only used for students and staff.

Admin creation does not require JWT (ICT staff can register others directly).

Sequelize is configured for MySQL, but can be adapted for PostgreSQL or SQLite.

🤝 Contributing

Fork this repo

Create your feature branch (git checkout -b feature/xyz)

Commit your changes (git commit -m "Add xyz feature")

Push to branch (git push origin feature/xyz)

Open a Pull Request
