# 📝 Medium Blog – Full Stack Blog Platform

A fully functional, Medium-like blog platform built with **React**, **Node.js**, and **PostgreSQL**. Features include user authentication, blog CRUD operations, following system, and a modern responsive UI.

---

## 🚀 Features

### ✨ Core Features
- **User Authentication** - JWT-based secure authentication
- **Blog Management** - Create, read, update, and delete blogs
- **User Profiles** - View user profiles with follower/following system
- **Following System** - Follow/unfollow users and view their blogs
- **Responsive Design** - Works perfectly on mobile and desktop
- **Real-time Updates** - Immediate UI updates for better UX

### 🎨 UI/UX Features
- **Modern Design** - Clean, Medium-inspired interface
- **Loading States** - Smooth shimmer loading components
- **Sticky Navigation** - Sub-navbar that stays in place while scrolling
- **Tab Navigation** - Classic Medium-style tab switching
- **Mobile Optimized** - Touch-friendly mobile interface
- **Search & Discovery** - Browse all users and their content

---

## 🧰 Tech Stack

| Layer       | Technology                           |
|-------------|--------------------------------------|
| **Frontend** | React 18, TypeScript, Vite          |
| **Backend**  | Node.js, Express.js, TypeScript     |
| **Database** | PostgreSQL with Prisma ORM          |
| **Auth**     | JWT (JSON Web Tokens)               |
| **Styling**  | Tailwind CSS                        |
| **Routing**  | React Router v6                     |
| **Deployment**| Vercel (Frontend), Cloudflare (Backend) |

---

## 📁 Project Structure

```
Medium-Blog/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # App pages (Home, Blogs, UserBlogs, etc.)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── stored/         # State management
│   │   └── config.ts       # Configuration
│   └── package.json
│
├── backend/                 # Node.js Backend
│   ├── src/
│   │   ├── routes/         # API routes (blog, user)
│   │   └── index.ts        # Express server
│   ├── prisma/             # Database schema & migrations
│   └── package.json
│
├── common/                  # Shared types and utilities
│   └── src/
│       └── index.ts
│
└── README.md
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** database (local or cloud)
- **npm**, **npm**, or **yarn**

---

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/its-mayank07/Medium-Blog.git
   cd Medium-Blog
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   
   # Install common dependencies
   cd ../common
   npm install
   ```

3. **Database Setup**
   ```bash
   cd ../backend
   npx prisma generate
   npx prisma migrate dev
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the backend directory (for local development):

   ```env
   DATABASE_URL="postgresql://user:password@host:port/dbname"
   ```

   > **Note:**  
   > When deploying to Cloudflare Workers, environment variables are set in `backend/wrangler.jsonc` under the `vars` field, not from `.env`.  
   > Example (`wrangler.jsonc`):
   > ```jsonc
   > {
   >   "vars": {
   >     "DATABASE_URL": "",
   >     "JWT_SECRET_KEY": ""
   >   }
   > }
   > ```

5. **Start the servers**
   ```bash
   # Start backend (from backend directory)
   npm run dev
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

The app will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 🔐 Authentication System

- **JWT-based authentication** with secure token storage
- **Protected routes** on both frontend and backend
- **Auto-login** using saved session tokens
- **User session management** with proper logout functionality

---

## ✍️ Blog Features

| Feature | Status | Description |
|---------|--------|-------------|
| **Create Blog** | ✅ | Write and publish new blogs |
| **Edit Blog** | ✅ | Update existing blog content |
| **Delete Blog** | ✅ | Remove blogs (author only) |
| **View All Blogs** | ✅ | Browse all published blogs |
| **View Blog Details** | ✅ | Read full blog posts |
| **Author-only Access** | ✅ | Secure edit/delete permissions |
| **Following Blogs** | ✅ | View blogs from followed users |
| **User Profiles** | ✅ | View user profiles and stats |

---

## 🔗 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/user/signup` | Register new user |
| `POST` | `/api/v1/user/signin` | Login existing user |

### User Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/user/profile` | Get current user profile |
| `GET` | `/api/v1/user/all` | Get all users with stats |
| `GET` | `/api/v1/user/:id/profile` | Get specific user profile |
| `POST` | `/api/v1/user/:id/follow` | Follow a user |
| `DELETE` | `/api/v1/user/:id/unfollow` | Unfollow a user |
| `GET` | `/api/v1/user/:id/followers` | Get user's followers |
| `GET` | `/api/v1/user/:id/following` | Get user's following |

### Blog Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/blog/bulk` | Get all blogs |
| `GET` | `/api/v1/blog/following` | Get blogs from followed users |
| `GET` | `/api/v1/blog/:id` | Get specific blog |
| `GET` | `/api/v1/blog/user/:id` | Get user's blogs |
| `POST` | `/api/v1/blog` | Create new blog |
| `PUT` | `/api/v1/blog/:id` | Update blog |
| `DELETE` | `/api/v1/blog/:id` | Delete blog |

> **Note**: Protected routes require JWT token in `Authorization` header.

---

## 🎨 UI Components

### Core Components
- **AppBar** - Main navigation with search and user menu
- **BlogCard** - Blog preview cards with author info
- **ProfileSidebar** - User profile with follow functionality
- **SubNavbar** - Sticky tab navigation (Medium-style)
- **Shimmer Components** - Loading states for better UX

### Pages
- **Home** - Landing page with featured content
- **Blogs** - All blogs with "For You" and "Following" tabs
- **UserBlogs** - User profiles with blogs and stats
- **Publish** - Blog creation and editing
- **AllUsers** - Discover and follow other users

---

## 📱 Mobile Features

- **Responsive Design** - Optimized for all screen sizes
- **Touch-friendly** - Mobile-optimized interactions
- **Tab Navigation** - Swipe-friendly tab switching
- **Mobile Access** - Access via local network IP
- **Progressive Loading** - Smooth loading states

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Cloudflare Workers)
```bash
cd backend
wrangler deploy
```

---

## 🔮 Future Enhancements

- [ ] **Rich Text Editor** - Markdown support for better content
- [ ] **Search & Filtering** - Advanced search capabilities
- [ ] **Categories & Tags** - Organize content better
- [ ] **Dark Mode** - Theme switching
- [ ] **Notifications** - Real-time notifications
- [ ] **Image Upload** - Support for blog images


---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository** 🍴
2. **Create a feature branch** 🔧
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** ✏️
4. **Commit your changes** 📦
   ```bash
   git commit -m "Add amazing feature"
   ```
5. **Push to the branch** 🚀
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request** ❤️

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Jeeti**  
🔗 [GitHub](https://github.com/your-username)  
📧 your-email@example.com

---

## 🙏 Acknowledgments

- Inspired by [Medium](https://medium.com)'s clean design
- Built with modern web technologies
- Thanks to all contributors and supporters

---

## 📞 Support

If you have any questions or need help, please:
- Open an [issue](https://github.com/your-username/Medium-Blog/issues)
- Contact us at your-email@example.com
- Check our [documentation](https://github.com/your-username/Medium-Blog/wiki)

---

**⭐ Star this repository if you found it helpful!**
