# 📚 BookStore - Full Stack E-commerce Application

A modern, responsive e-commerce platform built for book lovers to discover, browse, and purchase books online. This full-stack application features a beautiful user interface with smooth animations, comprehensive admin dashboard, and secure user authentication.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Contact](#-contact)

## 🌟 Overview

BookStore is a comprehensive e-commerce solution designed specifically for book retailers. It provides both customer-facing features for browsing and purchasing books, as well as administrative tools for managing inventory, orders, and user accounts.

### Key Highlights

- **Modern UI/UX**: Built with Next.js 15 and Tailwind CSS for a responsive, mobile-first design
- **Smooth Animations**: GSAP-powered animations for enhanced user experience
- **Secure Authentication**: JWT-based authentication with role-based access control
- **Admin Dashboard**: Comprehensive admin panel for managing books, users, and orders
- **Shopping Cart**: Full cart functionality with persistent storage
- **Image Management**: Multer-based image upload and management system
- **Database**: MongoDB with Mongoose for robust data management

## ✨ Features

### 🛍️ Customer Features

- **Book Catalog**: Browse books by categories with advanced filtering
- **Book Details**: Detailed book information with reviews and ratings
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Secure login/register with JWT tokens
- **Responsive Design**: Optimized for all device sizes
- **Book Reviews**: Customer review system with ratings

### 👨‍💼 Admin Features

- **Dashboard**: Overview of all Books
- **Book Management**: Add, edit, delete books with image uploads
- **Profile** : Display information about admin

### 🔧 Technical Features

- **RESTful API**: Well-structured API endpoints
- **Image Upload**: Multer-based file handling
- **Data Validation**: Comprehensive input validation
- **Error Handling**: Graceful error handling and user feedback
- **Security**: Password hashing, CORS protection, and input sanitization
- **Performance**: Optimized queries and caching strategies

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP (GreenSock)
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State Management**: React Context API

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: bcrypt for password hashing
- **CORS**: Cross-Origin Resource Sharing

### Development Tools

- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint
- **Development**: Nodemon for hot reloading
- **Deployment**: Render.com

## 🚀 Installation

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (local or cloud instance)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Adhamxiii/bookstore.git
cd bookstore
```

### Step 2: Install Dependencies

#### Install Root Dependencies

```bash
npm install
```

#### Install Backend Dependencies

```bash
cd backend
npm install
```

#### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 3: Environment Setup

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/bookstore
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/bookstore

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Server
PORT=3001
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Step 4: Database Setup

#### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. The application will automatically connect

#### Option 2: MongoDB Atlas (Recommended)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in your `.env` file

### Step 5: Seed Database (Optional)

```bash
cd backend
npm run seed
```

## 💻 Usage

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:3001`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Production Server

```bash
cd backend
npm start
```

### Default Admin Account

After seeding the database, you can login with:

- **Email**: admin@bookstore.com
- **Password**: admin123

## 📡 API Documentation

### Authentication Endpoints

```
POST /api/users/register    - Register new user
POST /api/users/login       - User login
POST /api/users/logout      - User logout
GET  /api/users/:id         - Get user profile
GET  /api/users/verify      - User verify
```

### Book Endpoints

```
GET    /api/books           - Get all books
GET    /api/books/:id       - Get book by ID
POST   /api/books           - Create new book (Admin)
PUT    /api/books/:id       - Update book (Admin)
DELETE /api/books/:id       - Delete book (Admin)
```

### Category Endpoints

```
GET    /api/categories      - Get all categories
POST   /api/categories      - Create category (Admin)
```

### Cart Endpoints

```
GET    /api/carts           - Get user cart
POST   /api/carts           - Add item to cart
PUT    /api/carts/:id       - Update cart item
DELETE /api/carts/:id       - Remove item from cart
```

## 🌐 Live Demo

### Production Deployment

- **Frontend**: [https://book-store-dun-one.vercel.app/](https://book-store-dun-one.vercel.app/)
- **Backend API**: [https://bookstore-wrxt.onrender.com](https://bookstore-wrxt.onrender.com)

### Test Credentials

- **Customer Account**: test@bookstore.com / password123
- **Admin Account**: admin@bookstore.com / admin123

## 📁 Project Structure

```
bookstore/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── middlewares/    # Authentication middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── public/         # Static files
│   │   └── server.js       # Main server file
│   ├── images/             # Uploaded book images
│   └── package.json
├── frontend/               # Next.js Frontend
│   ├── app/               # App Router pages
│   │   ├── (site)/        # Public pages
│   │   ├── admin/         # Admin dashboard
│   │   └── globals.css    # Global styles
│   ├── components/        # Reusable components
│   ├── context/           # React Context providers
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript type definitions
│   └── package.json
├── render.yaml            # Deployment configuration
└── README.md
```

## 🤝 Contributing

We welcome contributions to improve BookStore! Here's how you can contribute:

### 1. Fork the Repository

```bash
git fork https://github.com/Adhamxiii/bookstore.git
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Your Changes

```bash
git commit -m "Add amazing feature"
```

### 5. Push to Your Branch

```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request

- Provide a clear description of your changes
- Reference any related issues
- Ensure all tests pass

### Development Guidelines

- Use TypeScript for frontend development
- Follow ESLint rules and fix all warnings
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation for new features

## 📞 Contact

### Developer Information

- **Name**: Adham Nasser
- **Email**: [adhamxiii22](mailto:adhamxiii22@gmail.com)
- **LinkedIn**: [Adham](https://www.linkedin.com/in/adhamnasser/)
- **GitHub**: [Adhamxiii](https://github.com/Adhamxiii)
- **Portfolio**: [adhamz](https://adhamz.com)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star! ⭐**

Made with ❤️ by [Adham Nasser](https://github.com/Adhamxiii)

</div>
