# 📚 University Library Management System

<div align="center">
  <img src="public/images/auth-illustration.png" alt="Library Management System" width="800" />
  
  **A modern, full-stack library management system with authentication, book borrowing, and admin features**
  
  [![Live Demo](https://img.shields.io/badge/Live%20Demo-university--library--v2.vercel.app-blue?style=for-the-badge&logo=vercel)](https://university-library-v2-nu.vercel.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

---

## 👋 About

Welcome to the **University Library Management System**! This is a comprehensive, modern web application built to manage library operations including user authentication, book cataloging, borrowing systems, and administrative functions. The system features a clean, responsive design with real-time data updates and secure user management.

Built with cutting-edge technologies, this project demonstrates full-stack development capabilities including database design, authentication flows, file uploads, email workflows, and responsive UI/UX design.

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js with credentials provider and session management
- 📚 **Book Management** - Complete CRUD operations for library catalog
- 👥 **User Management** - User registration, profile management, and activity tracking
- 📖 **Borrowing System** - Book checkout, due dates, and return tracking
- 🏛️ **Admin Dashboard** - Administrative controls for books and user management
- 📧 **Email Workflows** - Automated onboarding emails with Upstash Workflow
- 🖼️ **Image Upload** - ImageKit integration for book cover uploads
- 📱 **Responsive Design** - Mobile-first design with Tailwind CSS
- 🔄 **Real-time Updates** - Redux state management for dynamic UI updates
- 🚀 **Performance Optimized** - Server-side rendering and caching with Next.js 15

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | Authentication | File Storage |
|----------|---------|----------|----------------|--------------|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | ![Next.js API](https://img.shields.io/badge/Next.js_API-000000?style=flat&logo=next.js&logoColor=white) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) | ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=flat&logo=next.js&logoColor=white) | ![ImageKit](https://img.shields.io/badge/ImageKit-FF6B6B?style=flat&logoColor=white) |
| React 18 | Node.js | Neon Database | Credentials Provider | Cloud Storage |
| TypeScript | Server Actions | Drizzle ORM | Session Management | Image Optimization |

</div>

### Core Technologies

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router, Server Actions, and optimization
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development with full IDE support
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[NextAuth.js](https://next-auth.js.org/)** - Complete authentication solution with session management
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM for PostgreSQL with type safety
- **[Neon Database](https://neon.tech/)** - Serverless PostgreSQL database with automatic scaling
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management for complex UI interactions
- **[ImageKit](https://imagekit.io/)** - Real-time image resizing and CDN delivery
- **[Upstash](https://upstash.com/)** - Redis and workflow automation services
- **[Resend](https://resend.com/)** - Modern email API for transactional emails

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- PostgreSQL database (Neon recommended)
- ImageKit account for file uploads
- Upstash account for Redis and workflows

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Authentication
AUTH_SECRET="your-auth-secret"

# ImageKit
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-id"
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your-public-key"
IMAGEKIT_PRIVATE_KEY="your-private-key"

# Upstash Redis
UPSTASH_REDIS_REST_URL="https://your-redis-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"

# QStash (Workflows)
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="your-qstash-token"

# Email
RESEND_TOKEN="your-resend-token"

# Cron Security
CRON_SECRET="your-cron-secret"

# API Endpoints
NEXT_PUBLIC_API_ENDPOINT="http://localhost:3000"
NEXT_PUBLIC_PROD_API_ENDPOINT="https://your-domain.vercel.app"
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/OliWebDevO/university-library-v2.git
   cd university-library-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx drizzle-kit push:pg
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── sign-in/         # Sign-in page
│   │   └── sign-up/         # Registration page
│   ├── (root)/              # Protected routes
│   │   ├── admin/           # Admin dashboard
│   │   ├── books/           # Book details pages
│   │   └── my-profile/      # User profile
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth configuration
│   │   ├── cron/            # Scheduled tasks
│   │   └── workflows/       # Email workflows
│   ├── globals.css          # Global styles
│   └── layout.tsx           # Root layout
├── components/              # Reusable UI components
│   ├── ui/                  # Shadcn/ui components
│   ├── BookCard.tsx         # Book display component
│   ├── BookList.tsx         # Book listing component
│   ├── Header.tsx           # Navigation header
│   └── ...                  # Other components
├── database/                # Database configuration
│   ├── drizzle.ts          # Database connection
│   └── schema.ts           # Database schema
├── lib/                     # Utility functions
│   ├── actions/            # Server actions
│   ├── config.ts           # Configuration
│   ├── ratelimite.ts      # Rate limiting
│   └── workflow.ts         # Upstash workflows
├── store/                   # Redux store
│   ├── userSlice.ts        # User state management
│   └── index.ts            # Store configuration
└── types/                   # TypeScript definitions
    └── index.d.ts          # Global type definitions
```

## 🎯 Key Features

### Authentication System
- **Secure Login/Registration** with bcrypt password hashing
- **Session Management** with JWT tokens
- **Rate Limiting** to prevent brute force attacks
- **User Status Management** (pending/approved)

### Book Management
- **Complete CRUD Operations** for book catalog
- **Image Upload** with ImageKit for book covers
- **Search and Filtering** capabilities
- **Borrowing System** with due date tracking

### Admin Features
- **User Management** with approval system
- **Book Administration** with add/edit/delete functions
- **Borrowing Overview** and management
- **System Analytics** and reporting

### Email Automation
- **Welcome Emails** for new users
- **Automated Workflows** with Upstash
- **Transactional Emails** with Resend

## 🌐 Deployment

This application is deployed on [Vercel](https://vercel.com/) with:

- **Automatic deployments** from the main branch
- **Environment variables** configured in Vercel dashboard
- **Cron jobs** for Redis keep-alive and maintenance
- **Edge functions** for optimal performance

### Deployment Steps

1. Fork this repository
2. Connect your Vercel account
3. Import the project
4. Configure environment variables
5. Deploy with zero configuration

## 📱 Pages & Routes

- **`/`** - Home page with book catalog
- **`/sign-in`** - User authentication
- **`/sign-up`** - User registration
- **`/books/[id]`** - Individual book details
- **`/my-profile`** - User profile and borrowed books
- **`/admin`** - Admin dashboard
- **`/admin/books`** - Book management
- **`/admin/books/new`** - Add new books

## 🔧 Development

### Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database changes
npm run db:studio    # Open Drizzle Studio
```

### Database Management

The project uses Drizzle ORM with PostgreSQL. Key tables include:

- **`users`** - User accounts and profiles
- **`books`** - Book catalog with metadata
- **`borrow_records`** - Borrowing history and status

## 📊 Features Showcase

### User Experience
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Updates** - Redux for dynamic state management
- **Toast Notifications** - User feedback for all actions
- **Loading States** - Smooth user experience with loading indicators

### Security Features
- **Password Hashing** with bcryptjs
- **CSRF Protection** with NextAuth.js
- **Rate Limiting** on authentication endpoints
- **Secure File Uploads** with ImageKit

### Performance
- **Server-Side Rendering** for fast initial load
- **Image Optimization** with Next.js and ImageKit
- **Database Indexing** for efficient queries
- **Caching Strategies** for improved performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Oliver Van Droogenbroeck**

- **Website**: [olivervdb.com](https://olivervdb.com)
- **LinkedIn**: [Oliver Van Droogenbroeck](https://www.linkedin.com/in/oliver-van-droogenbroeck-44b699151/)
- **GitHub**: [@OliWebDevO](https://github.com/OliWebDevO)

---

<div align="center">
  <p>⭐ If you found this project useful, please give it a star!</p>
  <p>🔗 <strong>Live Demo:</strong> <a href="https://university-library-v2-nu.vercel.app/">university-library-v2.vercel.app</a></p>
</div>

---

*This project demonstrates modern full-stack development practices with TypeScript, Next.js 15, and cloud-