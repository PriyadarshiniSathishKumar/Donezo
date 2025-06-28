# TaskMaster Pro or Donezo - Collaborative Task Management Application

A professional, full-stack todo task management web application built for the hackathon challenge. Features real-time collaboration, Google OAuth authentication, and a modern, responsive UI.

## Architecture diagram
![Architecture Diagram](https://github.com/user-attachments/assets/a38bba1f-86f4-46ee-b243-75ecc582024d)


## 🚀 Live Demo - https://aura-task-canvas-bloom.lovable.app/

## 📹 Demo Video
https://drive.google.com/file/d/1w4wc17yHdAfVcgX4ZiYbTm9rrFjXRdiW/view?usp=sharing

## 🎯 Features

### Core Functionality
- **Google OAuth Authentication** - Secure login via Firebase
- **Full CRUD Operations** - Create, read, update, delete tasks
- **Task Sharing** - Collaborate by sharing tasks with other users via email
- **Real-time Updates** - Automatic UI updates without page refresh
- **Advanced Filtering** - Filter by status, priority, due date, completion
- **Responsive Design** - Optimized for desktop and mobile devices
- **Toast Notifications** - User feedback for all actions
- **Task Completion Celebrations** - Confetti effects and congratulations modal

### Task Management
- ✅ Create tasks with title, description, priority, and due dates
- 📝 Edit existing tasks with inline editing
- 🎯 Set priority levels (High, Medium, Low)
- 📅 Due date management with overdue indicators
- 👥 Share tasks with other users via email
- 🎉 Completion celebrations with visual feedback
- 🔍 Filter tasks by: All, Today, Overdue, Completed

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Drizzle ORM with TypeScript
- **Authentication:** Firebase Authentication (Google OAuth)
- **API:** RESTful endpoints with proper error handling
- **Validation:** Zod schema validation

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite for fast development and builds
- **Styling:** Tailwind CSS with ShadCN UI components
- **State Management:** TanStack React Query for server state
- **Routing:** Wouter for lightweight client-side routing
- **Animations:** Framer Motion for smooth transitions
- **UI Components:** Radix UI primitives via ShadCN

### Database Schema
```sql
-- Users table
users (
  id: string (Firebase UID)
  email: string
  name: string
  avatar: string
)

-- Tasks table
tasks (
  id: serial primary key
  title: string
  description: text
  priority: enum (low, medium, high)
  status: enum (pending, in_progress, completed)
  due_date: timestamp
  owner_id: string (references users.id)
  shared_with: string[] (email addresses)
  created_at: timestamp
  updated_at: timestamp
)
```

### Deployment
- **Frontend:** Prepared for Vercel/Netlify deployment
- **Backend:** Prepared for Railway/Render deployment
- **Database:** Neon PostgreSQL serverless
- **Domain:** Ready for custom domain configuration

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   React Client  │◄───┤  Express API    │◄───┤  PostgreSQL DB  │
│                 │    │                 │    │                 │
│  • UI Components│    │  • RESTful API  │    │  • Users        │
│  • State Mgmt   │    │  • Auth Middleware   │  • Tasks        │
│  • Routing      │    │  • Validation   │    │  • Relations    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         │              │                 │
         └──────────────┤ Firebase Auth   │
                        │                 │
                        │  • Google OAuth │
                        │  • JWT Tokens   │
                        │                 │
                        └─────────────────┘
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Firebase project with Google OAuth enabled

### Environment Variables
```bash
# Database
DATABASE_URL=your_neon_database_url

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd donezo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 📱 API Endpoints

### Authentication
- `POST /api/users` - Create/update user profile

### Tasks
- `GET /api/tasks` - Get user's tasks (own + shared)
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Real-time Features
- Automatic UI updates via React Query
- Optimistic updates for better UX
- Error handling with rollback capabilities

## 🎨 UI/UX Features

- **Modern Design System** - Consistent, accessible components
- **Glassmorphism Effects** - Modern visual styling with backdrop blur
- **Smooth Animations** - Framer Motion for delightful interactions
- **Responsive Layout** - Mobile-first design approach
- **Dark/Light Mode** - Theme switching with system preference detection
- **Loading States** - Skeleton loading and progress indicators
- **Error Handling** - Graceful error messages and recovery options

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run db:push      # Push database schema changes
npm run db:studio    # Open database studio
```

## 📋 Assumptions Made

1. **Single Social Login:** Implemented Google OAuth only as requirements stated "any 1 is fine"
2. **Task Sharing:** Implemented via email addresses rather than usernames for simplicity
3. **Real-time Updates:** Used React Query for automatic updates instead of WebSockets for MVP
4. **Pagination:** Not implemented due to scope - assumed reasonable task limits per user
5. **Rate Limiting:** Basic implementation - can be enhanced for production
6. **Mobile-first:** Prioritized mobile experience as primary use case

## 🚀 Deployment Guide

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway)
1. Connect GitHub repository to Railway
2. Set environment variables
3. Configure build and start commands
4. Deploy with automatic SSL

### Database (Neon)
- Already configured and running
- Automatic backups and scaling
- Connection pooling enabled

## 🔐 Security Features

- Firebase Authentication with Google OAuth
- JWT token validation
- CORS configuration
- Input validation with Zod schemas
- SQL injection prevention via Drizzle ORM
- XSS protection via React's built-in escaping

## 🧪 Testing Strategy

- **Unit Tests:** Component testing with React Testing Library
- **Integration Tests:** API endpoint testing
- **E2E Tests:** User flow testing with Playwright
- **Manual Testing:** Cross-browser and device testing

## 📈 Performance Optimizations

- Vite for fast development and builds
- React Query for efficient data caching
- Lazy loading for code splitting
- Image optimization and compression
- Minification and bundling optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

---

This project is a part of a hackathon run by https://www.katomaran.com
