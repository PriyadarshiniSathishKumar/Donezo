# Donezo - Collaborative Task Management Application

## Overview

Donezo is a professional, real-time collaborative task management web application designed for productivity-focused individuals and teams. The platform combines modern UI/UX with advanced 3D animations to create an engaging task management experience similar to Trello and Notion-lite.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and better developer experience
- **Styling**: Tailwind CSS for utility-first styling with ShadCN UI components for consistent design
- **Animations**: Framer Motion for smooth page transitions and micro-interactions
- **3D Graphics**: Three.js integration for subtle background animations and visual effects
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js for RESTful API endpoints
- **Language**: TypeScript for consistency across the stack
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Firebase Authentication with Google OAuth
- **Middleware**: Express middleware for logging, error handling, and request processing

### Database Design
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle migrations in the `/migrations` directory
- **Core Tables**:
  - `users`: User profiles with Firebase UID as primary key
  - `tasks`: Task management with priority, status, due dates, and sharing capabilities

## Key Components

### Authentication System
- **Provider**: Firebase Authentication with Google OAuth integration
- **Flow**: Automatic user creation/update in local database upon authentication
- **Session**: JWT-based session management with persistent login
- **Security**: Protected routes with authentication state management

### Task Management
- **CRUD Operations**: Full create, read, update, delete functionality for tasks
- **Sharing**: Tasks can be shared with other users via email addresses
- **Filtering**: Tasks filterable by date, priority, status, and ownership
- **Real-time Updates**: Prepared for real-time collaboration features

### UI/UX Features
- **Theme Support**: Light/dark mode toggle with system preference detection
- **Responsive Design**: Mobile-first approach with PWA capabilities
- **Animations**: Smooth transitions, hover effects, and celebratory animations
- **Notifications**: Toast-based feedback system for user actions
- **3D Elements**: Floating particles background for visual appeal

## Data Flow

1. **Authentication Flow**:
   - User initiates Google OAuth through Firebase
   - Firebase returns user credentials
   - Frontend stores user in local database via API
   - Session persisted with Firebase tokens

2. **Task Management Flow**:
   - User creates/modifies tasks through React components
   - TanStack Query handles API requests and caching
   - Express routes process requests with Drizzle ORM
   - Database operations return updated data
   - UI automatically updates through query invalidation

3. **Real-time Features**:
   - Architecture prepared for Socket.io integration
   - Query client configured for real-time data synchronization

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, TypeScript, Tailwind CSS
- **Component Library**: Radix UI primitives via ShadCN
- **Animation**: Framer Motion, Three.js
- **State Management**: TanStack React Query
- **Authentication**: Firebase SDK
- **Utilities**: date-fns, clsx, class-variance-authority

### Backend Dependencies
- **Server**: Express.js, cors, body parsing middleware
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Authentication**: Firebase Admin SDK (prepared)
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite with React plugin
- **TypeScript**: Strict mode configuration
- **Linting**: Path aliases for clean imports
- **Database**: Drizzle Kit for migrations

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with nodemon-like reloading
- **Database**: Neon serverless PostgreSQL
- **Environment**: Replit integration with runtime error overlays

### Production Deployment
- **Build Process**: 
  - Frontend: Vite production build to `/dist/public`
  - Backend: esbuild bundling to `/dist`
- **Hosting**: Prepared for Vercel (frontend) and Render/Railway (backend)
- **Database**: Neon PostgreSQL with connection pooling
- **Environment Variables**: Firebase config, database URLs, API keys

### Architecture Benefits
- **Type Safety**: End-to-end TypeScript ensures consistency
- **Developer Experience**: Hot reloading, error overlays, and modern tooling
- **Scalability**: Serverless database and modular architecture
- **Performance**: Query caching, optimized builds, and lazy loading
- **User Experience**: Smooth animations, responsive design, and real-time features

## Changelog
```
Changelog:
- June 28, 2025. Initial setup
- June 28, 2025. Removed 3D background effects from both auth and dashboard pages per user request
- June 28, 2025. Fixed confetti and congratulations popup functionality
- June 28, 2025. Standardized task card dimensions for uniform layout
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```