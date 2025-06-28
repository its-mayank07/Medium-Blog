# 📝 Medium Blog – Full Stack Blog Platform

A fully functional, Medium-like blog platform built with the **MERN** stack and **PostgreSQL**. Authenticated users can write, edit, and read blogs with a clean and modern UI.

---

## 🚀 Overview

> A full-stack project built to replicate the core experience of [Medium](https://medium.com). Features include user authentication, protected blog routes, JWT-based auth, blog CRUD operations, and PostgreSQL with Prisma.

---

## 🧰 Tech Stack

| Layer       | Tech Stack                           |
|-------------|--------------------------------------|
| Frontend    | React, TypeScript, Tailwind CSS      |
| Backend     | Node.js, Express.js                  |
| Database    | PostgreSQL via Prisma ORM            |
| Auth        | JWT (JSON Web Tokens)                |
| Styling     | Tailwind CSS                         |
| Routing     | React Router                         |
| API Testing | Thunder Client / Postman             |

---

## 📁 Folder Structure

Medium-Blog-/
│
├── client/ # React Frontend
│ ├── components/ # Reusable UI components
│ ├── pages/ # App pages like Home, Blog, Login
│ └── main.tsx # Root file
│
├── server/ # Backend (Node + Express)
│ ├── prisma/ # Prisma schema & migrations
│ ├── routes/ # Auth & Blog APIs
│ ├── middleware/ # Auth middleware
│ └── index.ts # Express server entry
│
├── .env # Environment variables
└── README.md # You’re reading it!

yaml
Copy
Edit

---

## ⚙️ Getting Started

### 📋 Prerequisites

- Node.js ≥ 18
- PostgreSQL (local or cloud e.g. [Railway](https://railway.app), [Supabase](https://supabase.com))
- `pnpm`, `npm`, or `yarn`

---

### 🔌 Backend Setup

```bash
cd server
pnpm install
npx prisma generate
npx prisma migrate dev
pnpm run dev
Update .env in /server:

env
Copy
Edit
DATABASE_URL="postgresql://user:password@host:port/dbname"
JWT_SECRET_KEY="your_secret_jwt_key"
💻 Frontend Setup
bash
Copy
Edit
cd client
pnpm install
pnpm run dev
The app will be running at:
🔗 http://localhost:5173

🔐 Authentication System
JWT-based authentication

Tokens stored securely

Protected routes (both frontend & backend)

Auto-login using saved token

✍️ Blog Features
Feature	Status
Create Blog	✅
Edit Blog	✅
Delete Blog	✅
View Blog List	✅
View Blog Details	✅
Author-only Access	✅

🔗 API Endpoints
Method	Endpoint	Description
POST	/api/signup	Register new user
POST	/api/login	Login existing user
GET	/api/blogs	Get all blogs
GET	/api/blog/:id	Get blog by ID
POST	/api/blog	Create new blog
PUT	/api/blog/:id	Update blog by ID
DELETE	/api/blog/:id	Delete blog by ID

Note: Protected routes require JWT in Authorization header.

📸 Screenshots
(Include screenshots or GIFs of your UI here)

📌 Todo / Future Improvements
 Comments system

 Blog categories & tags

 Follow users & feeds

 Rich text / Markdown support

 Search & filtering

 Responsive improvements

 Dark mode

👨‍💻 Author
Mayank Maini
🔗 GitHub
📧 mayankmaini04@gmail.com
🐦 Twitter

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🙌 Contributing
Pull requests and issues are welcome!

bash
Copy
Edit
# Fork it 🍴
# Create your feature branch 🔧
git checkout -b feature/amazing-feature

# Commit your changes 📦
git commit -m "Add amazing feature"

# Push to the branch 🚀
git push origin feature/amazing-feature

# Open a Pull Request ❤️
