# 🚀 FileNest - Secure Cloud Storage for Everyone

<div align="center">
  <img src="./public/Dashboard.png" alt="FileNest Dashboard" width="800"/>
  <br/>
  <p><em>A full-stack cloud storage platform built with Next.js 15, featuring real-time file management, user authentication, and a sleek modern interface.</em></p>

  ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)
  ![Clerk](https://img.shields.io/badge/Clerk-6B46C1?style=for-the-badge&logo=clerk)
  ![ImageKit](https://img.shields.io/badge/ImageKit-0093E5?style=for-the-badge)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer)
  ![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js)

  <h3>
    <a href="#-getting-started">🚀 Get Started</a> •
    <a href="#-features">✨ Features</a> •
    <a href="#-tech-stack">🛠️ Tech Stack</a> •
    <a href="#-api-endpoints">📡 API</a>
  </h3>
</div>

## ✨ Features

### 🎯 Core Functionality
- **🔐 Secure Authentication** - Powered by Clerk with email verification and OTP support
- **📁 File Management** - Upload, organize, star, and delete files with drag-and-drop support
- **📂 Folder Structure** - Create and navigate through nested folder hierarchies
- **💾 Storage Management** - 150MB per user limit with real-time usage tracking
- **🗑️ Trash System** - Soft delete with restore functionality

### 🎨 User Experience
- **🎭 Modern UI** - Clean, minimal design inspired by Apple's aesthetics
- **📱 Responsive Design** - Works seamlessly across desktop, tablet, and mobile
- **⚡ Real-time Updates** - Instant feedback for all file operations
- **🧠 Smart Validation** - Pre-upload file size and type validation
- **📊 Progress Tracking** - Visual upload progress with error handling

### 🛠️ Technical Features
- **🔒 Type-Safe** - Full TypeScript implementation
- **🗄️ Database Integration** - PostgreSQL with Drizzle ORM
- **☁️ Cloud Storage** - Quadruple redundancy with ImageKit + Cloudinary fallback
- **🚀 Performance** - Optimized with Next.js 15 and Turbopack
- **🛡️ Security** - Protected API routes with user authorization
- **🎨 File Type Colors** - Different colors for PDF, images, videos, and documents
- **📧 Contact System** - Email notifications with IP tracking
- **🔍 Login Monitoring** - Silent user activity tracking (admin only)

## Project Structure

```
filenest/
├── 📂 app/                    # Next.js App Router
│   ├── 📂 api/                # API Routes
│   │   ├── files/             # File operations (upload, delete, star, trash)
│   │   ├── folders/           # Folder management
│   │   └── storage/           # Storage usage tracking
│   ├── dashboard/             # Main app interface
│   ├── login/                 # Authentication pages
│   └── page.tsx               # Landing page
├── 📂 components/             # React Components
│   ├── ui/                    # shadcn/ui base components
│   ├── FileUploadForm.tsx     # Upload interface with storage limits
│   ├── FileList.tsx           # File management table
│   ├── StorageIndicator.tsx   # Storage usage display
│   └── ...                    # Other UI components
├── 📂 database/               # Database setup
│   ├── schema.ts              # File & user data models
│   └── drizzleClient.ts       # DB connection
├── 📂 lib/                    # Utilities
│   └── storageUtils.ts        # 150MB limit calculations
└── 📄 Config files            # ENV, TypeScript, Tailwind, etc.
```

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm
- **PostgreSQL** database
- **ImageKit** + **Cloudinary** accounts for redundant file storage
- **Clerk** account for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/CodewithEvilxd/FileNest.git
cd FileNest
```

### 2. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Setup

Copy the sample environment file and configure your variables:

```bash
cp .env.sample .env
```

Add your environment variables to `.env`:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# ImageKit Configuration (Primary)
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_imagekit_id"

# ImageKit Configuration (Secondary - Fallback)
IMAGEKIT2_PUBLIC_KEY="your_second_public_key"
IMAGEKIT2_PRIVATE_KEY="your_second_private_key"
IMAGEKIT2_URL_ENDPOINT="https://ik.imagekit.io/your_second_id"

# ImageKit Configuration (Tertiary - Second Fallback)
IMAGEKIT3_PUBLIC_KEY="your_third_public_key"
IMAGEKIT3_PRIVATE_KEY="your_third_private_key"
IMAGEKIT3_URL_ENDPOINT="https://ik.imagekit.io/your_third_id"

# Cloudinary Configuration (Final Fallback)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 4. Database Setup

```bash
# Generate and run database migrations
pnpm drizzle-kit generate
pnpm drizzle-kit migrate
```

### 5. Start Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application running!

## 🛠️ Technology Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Three.js](https://threejs.org/)** - 3D graphics library

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL

### Authentication & Storage
- **[Clerk](https://clerk.com/)** - User authentication and management
- **[ImageKit](https://imagekit.io/)** - Primary cloud storage with redundancy
- **[Cloudinary](https://cloudinary.com/)** - Backup cloud storage

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** - Database migrations

## Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
pnpm db:generate  # Generate database migrations
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Drizzle Studio (database GUI)
```

## API Endpoints

### File Management
- `GET /api/files` - List user files and folders
- `POST /api/files/upload` - Upload new files
- `POST /api/files/[fileId]/star` - Toggle file star status
- `POST /api/files/[fileId]/trash` - Move file to trash
- `DELETE /api/files/[fileId]/delete` - Permanently delete file
- `POST /api/files/empty-trash` - Empty trash folder

### Folder Management
- `POST /api/folders/create` - Create new folder

### Storage Management
- `GET /api/storage/usage` - Get current storage usage

### Authentication
- `GET /api/imagekit-auth` - Get ImageKit authentication token


## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📞 Contact & Support

- **Email**: codewithevilxd@gmail.com
- **Discord**: raj.dev_
- **GitHub**: [@CodewithEvilxd](https://github.com/CodewithEvilxd)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>Built with ❤️ by <a href="https://github.com/CodewithEvilxd">CodewithEvilxd</a></strong></p>
  <p>Star ⭐ this repo if you found it helpful!</p>
</div>