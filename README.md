# 🥊 Clash - Real-Time Voting Platform

<div align="center">
  <p>A modern, real-time voting platform where users create clashes and let the community decide the winner!</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue?style=for-the-badge&logo=postgresql&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
</div>

## 🚀 Features

### 📱 User Experience
- **Modern UI/UX** - Clean, responsive design with Tailwind CSS and shadcn/ui components
- **User Authentication** - Secure JWT-based authentication with NextAuth.js
- **Real-time Updates** - Live vote counting and comments with Socket.io
- **Email Verification** - Complete user verification system with email templates
- **Password Reset** - Secure password reset functionality
- **Responsive Design** - Mobile-first approach with seamless desktop experience

### 🥊 Clash Management
- **Create Clashes** - Upload comparison images with titles and descriptions
- **Timed Voting** - Set expiration dates for voting periods
- **Image Upload** - File upload system with validation and storage
- **Clash Categories** - Organize clashes with custom descriptions
- **Edit/Delete** - Full CRUD operations for clash management

### ⚡ Real-time Features
- **Live Voting** - Real-time vote counting with Socket.io
- **Live Comments** - Instant comment updates across all users
- **Vote Animations** - Smooth count-up animations for votes
- **Socket Broadcasting** - Real-time data synchronization
- **Queue Processing** - Background job processing with BullMQ

### 🔒 Security & Performance
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - API rate limiting for security
- **Input Validation** - Zod schema validation on both client and server
- **File Validation** - Image upload validation and processing
- **Environment Variables** - Secure configuration management

## 🏗️ Architecture

### Frontend (Next.js 14)
```
front/
├── src/
│   ├── app/
│   │   ├── (auth)/             # Authentication pages
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── clash/              # Clash pages
│   │   │   ├── [id]/           # Individual clash voting
│   │   │   └── items/[id]/     # Clash items management
│   │   ├── dashboard/          # User dashboard
│   │   ├── actions/            # Server actions
│   │   ├── api/                # API routes
│   │   └── fetch/              # Data fetching utilities
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   ├── clash/              # Clash-related components
│   │   ├── base/               # Base layout components
│   │   ├── common/             # Shared components
│   │   └── ui/                 # shadcn/ui components
│   └── lib/                    # Utilities and configurations
```

### Backend (Node.js + Express)
```
server/
├── src/
│   ├── routing/                # API routes
│   │   ├── authRoutes.ts
│   │   ├── clashRoutes.ts
│   │   └── verifyRoutes.ts
│   ├── middleware/             # Custom middleware
│   │   └── AuthMiddleware.ts
│   ├── validations/            # Zod schemas
│   │   ├── authValidation.ts
│   │   └── clashValidation.ts
│   ├── jobs/                   # Background jobs
│   │   ├── VotingQueue.ts
│   │   ├── EmailQueue.ts
│   │   └── CommentQueue.ts
│   ├── config/                 # Configuration files
│   │   ├── database.ts
│   │   ├── logger.ts
│   │   ├── mail.ts
│   │   └── queue.ts
│   └── views/                  # Email templates
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── public/images/              # Uploaded images
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js with JWT strategy
- **Real-time**: Socket.io-client for live updates
- **Animations**: CountUp.js for vote animations
- **HTTP Client**: Axios for API communication
- **Icons**: Lucide React for modern icons
- **Date Handling**: date-fns for date utilities

### Backend
- **Runtime**: Node.js with Express.js and TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io for live communication
- **File Upload**: express-fileupload for image handling
- **Background Jobs**: BullMQ with Redis for queue processing
- **Email**: Nodemailer with EJS templates
- **Validation**: Zod for schema validation
- **Security**: bcrypt, helmet, CORS, rate limiting

### DevOps & Tools
- **Database**: PostgreSQL with Prisma migrations
- **Queue**: Redis for BullMQ job processing
- **File Storage**: Local file system with organized structure
- **Logging**: Winston for structured logging
- **Environment**: Environment variables for configuration

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **PostgreSQL** (v13 or higher)
- **Redis** (for background job processing)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/TusharVashishth/clash.git
cd clash
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file with the following variables:
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/clash_db
APP_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_key
REDIS_URL=redis://localhost:6379
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# Set up the database
npx prisma migrate dev --name init
npx prisma generate

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd front
npm install

# Create .env.local file with:
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000

# Start the frontend development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Clash Management
- `GET /api/clash` - Get user's clashes
- `GET /api/clash/:id` - Get clash by ID with items and comments
- `POST /api/clash` - Create new clash
- `PUT /api/clash/:id` - Update clash
- `DELETE /api/clash/:id` - Delete clash
- `POST /api/clash/items` - Add items to clash

### Real-time Events (Socket.io)
- `clashing-{clashId}` - Vote updates
- `clashing_comment-{clashId}` - Comment updates

## 🌟 Key Features Breakdown

### Real-time Voting System
- Live vote counting with Socket.io broadcasting
- Background job processing with BullMQ for vote persistence
- Animated vote counters with smooth transitions
- Vote validation and duplicate prevention

### Clash Management
- Image upload with validation and organized storage
- Timed voting with expiration date management
- Full CRUD operations with proper authorization
- Rich clash descriptions and metadata

### User Authentication
- Secure JWT-based authentication system
- Email verification with custom templates
- Password reset functionality with secure tokens
- Session management with NextAuth.js

### Real-time Communication
- Socket.io integration for live updates
- Comment system with instant broadcasting
- Vote updates across all connected clients
- Background job processing for data consistency

## 🔧 Background Jobs

The application uses BullMQ for background job processing:

- **VotingQueue**: Processes vote increments asynchronously
- **EmailQueue**: Handles email sending (verification, password reset)
- **CommentQueue**: Manages comment processing and notifications

## 🚦 Development

### Running in Development Mode
```bash
# Backend (with auto-reload)
cd server && npm run dev

# Frontend (with hot reload)
cd front && npm run dev

# Watch Prisma schema changes
cd server && npx prisma studio
```

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing React framework
- **Prisma** for the excellent database toolkit
- **Socket.io** for real-time communication
- **shadcn/ui** for the beautiful component library
- **TailwindCSS** for the utility-first CSS framework

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Setujha90">Setu Kumar</a></p>
  
</div>
