# Mayura LMS - Elevating Learning Excellence

A stunning, production-ready Learning Management System with a captivating landing page, holographic animations, and enterprise-grade UX. Built exclusively for modern training needs with the signature HUD Gold Ring loader.

## Features

### Landing Page Experience
- **Stunning Hero Section** - Eye-catching gradient animations and holographic effects
- **Live Stats Display** - Showcasing platform success metrics
- **Interactive Features Grid** - Animated feature cards with hover effects
- **User Testimonials** - Social proof with 5-star ratings
- **Smooth Scroll Navigation** - Anchor links with smooth scrolling
- **Holographic Branding** - Shimmer effects on logo and key elements
- **Floating Background Elements** - Animated gradient orbs
- **Call-to-Action Flow** - Clear conversion paths to registration

### Core Functionality
- **Role-Based Authentication** - Separate experiences for Trainers and Trainees
- **Course Management** - Create, publish, and organize courses with modules and materials
- **Assignment System** - Create assignments and manage submissions
- **Grading Workflow** - Inline grading interface with feedback system
- **Course Enrollment** - Browse and enroll in published courses
- **Discussion Forums** - Course-specific discussions for collaboration
- **Progress Tracking** - Track completion and progress for trainees

### User Experience & Design
- **HUD Gold Ring Loader** - Signature animated loader with two variants:
  - Micro inline spinner for quick operations (<300ms)
  - Full-screen HUD overlay for longer operations
  - Respects `prefers-reduced-motion` with static fallbacks
- **Holographic Animations** - Shimmer effects and gradient transitions throughout
- **Smooth Transitions** - Fade-in, slide-up, and floating animations
- **Large Scannable Cards** - Easy-to-read course and content cards with hover effects
- **One-Click Primary Actions** - Minimal clicks for common tasks
- **Gradient Accents** - Amber to orange gradients for visual appeal
- **Keyboard Accessible** - Full keyboard navigation support
- **High Contrast** - WCAG-compliant contrast ratios
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: Lucide React
- **State Management**: React Context (Auth & Data)
- **Storage**: LocalStorage (for demo - ready for backend integration)
- **Build Tool**: Vite
- **Deployment**: Vercel/Render/Railway ready

## Project Structure

```
project-root/
├── client/                             # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   └── HUDLoader.tsx           # Signature gold ring loader
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx         # Authentication & user management
│   │   │   └── DataContext.tsx         # Course, assignment, submission data
│   │   ├── pages/
│   │   │   ├── Landing.tsx             # Stunning landing page with animations
│   │   │   ├── Login.tsx               # Authentication page
│   │   │   ├── Register.tsx            # User registration
│   │   │   ├── TrainerDashboard.tsx    # Trainer home
│   │   │   ├── TraineeDashboard.tsx    # Trainee home
│   │   │   ├── CourseBrowser.tsx       # Browse available courses
│   │   │   ├── CreateCourse.tsx        # Course creation form
│   │   │   ├── CourseDetail.tsx        # Course content & discussions
│   │   │   └── GradingQueue.tsx        # Assignment grading interface
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript type definitions
│   │   ├── App.tsx                     # Main app routing
│   │   └── index.css                   # Global styles & holographic animations
│   └── package.json                    # Frontend dependencies & scripts
│
├── server/                             # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.ts                       # MongoDB Atlas connection setup
│   ├── models/                         # MongoDB data models (Mongoose)
│   │   ├── User.ts                     # User schema (Trainer, Trainee)
│   │   ├── Course.ts                   # Course schema (title, desc, trainer, etc.)
│   │   ├── Assignment.ts               # Assignment schema (courseId, content, dueDate)
│   │   ├── Submission.ts               # Trainee submissions & grading info
│   │   └── Discussion.ts               # Forum-style discussions & comments
│   ├── routes/                         # Express routes (API endpoints)
│   │   ├── authRoutes.ts               # Login, Register, JWT auth
│   │   ├── courseRoutes.ts             # CRUD for courses
│   │   ├── assignmentRoutes.ts         # Assignments management
│   │   ├── submissionRoutes.ts         # Upload & grade submissions
│   │   └── discussionRoutes.ts         # Threaded discussions per course
│   ├── controllers/                    # Business logic
│   │   ├── authController.ts
│   │   ├── courseController.ts
│   │   ├── assignmentController.ts
│   │   ├── submissionController.ts
│   │   └── discussionController.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts           # JWT validation
│   │   └── errorHandler.ts             # Centralized error handler
│   ├── utils/
│   │   └── generateToken.ts            # JWT helper function
│   ├── server.ts                       # Entry point (Express app)
│   └── package.json                    # Backend dependencies & scripts
│
├── .env                                # MongoDB URI, JWT secrets, API keys
├── README.md                           # Project documentation
└── tsconfig.json                       # TypeScript config for both client & server

```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Usage Guide

### For Trainers

1. **Register** as a Trainer
2. **Create a Course** from your dashboard
3. **Add Modules** to organize course content
4. **Add Materials** (lessons, resources) to each module
5. **Create Assignments** for assessment
6. **Publish** the course when ready
7. **Grade Submissions** from the grading queue

### For Trainees

1. **Register** as a Trainee
2. **Browse Courses** and enroll
3. **View Course Content** - modules and materials
4. **Submit Assignments** with text content
5. **Track Progress** through enrolled courses
6. **Participate in Discussions** with trainers and peers

## Key Components

### HUD Gold Ring Loader

The signature loader is available in two variants:

```tsx
import { HUDLoader } from './components/HUDLoader';

// Micro variant for inline loading
<HUDLoader variant="micro" />

// Full-screen variant with message
<HUDLoader variant="fullscreen" message="Loading Course..." />
```

**Animation Features:**
- Concentric golden rings with gradient effects
- Upward translation (rise effect) on mount
- Continuous rotation with dash offset animation
- Subtle glow effects
- Respects prefers-reduced-motion accessibility setting

### Authentication Context

```tsx
const { user, login, register, logout } = useAuth();
```

### Data Context

```tsx
const {
  courses, modules, materials, assignments, submissions, enrollments,
  addCourse, updateCourse, deleteCourse,
  // ... other CRUD methods
} = useData();
```

## Accessibility

- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full keyboard support throughout
- **High Contrast**: WCAG AA compliant contrast ratios
- **Reduced Motion**: Respects user motion preferences
- **Semantic HTML**: Proper heading hierarchy and landmarks

## Performance Optimizations

- Lazy evaluation with useMemo hooks
- Optimized re-renders with React Context
- CSS animations over JavaScript for better performance
- Minimal bundle size with tree-shaking
- Fast first paint with Vite

## Deployment

The application is ready for deployment to:

- **Vercel**: `vercel deploy`
- **Render**: Connect GitHub repository
- **Railway**: Connect GitHub repository
- **Netlify**: `netlify deploy`

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Achievement Levels

- ✅ **Bronze** - Authentication + Course CRUD
- ✅ **Silver** - Enrollment + Dashboards
- ✅ **Gold** - Assignment Submission + Grading
- ✅ **Platinum** - Discussion Forums

## License

Internal use only.

# Mayura 
# Team Details 
## Naare Sudharshan Kumar
## Tatikoda Jaideep
## Bapanapalle Naredra 
## Akkala Pavan Kalyan

