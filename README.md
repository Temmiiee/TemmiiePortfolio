# Matthéo Termine - Portfolio Website

A modern, accessible portfolio website for Matthéo Termine, a freelance web integrator specializing in creating fast, SEO-optimized, and RGAA-compliant websites.

## 🚀 Features

- **Modern Design**: Built with Next.js 15 and React 18
- **Accessibility First**: RGAA compliant with proper semantic HTML and ARIA labels
- **Performance Optimized**: Fast loading times and SEO optimization
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth animations and interactive components
- **Contact Forms**: Functional contact form with validation
- **Quote Calculator**: Interactive pricing calculator for services
- **AI Integration**: Google Genkit AI integration for enhanced functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **AI**: Google Genkit for AI-powered features
- **Deployment**: Firebase App Hosting

## 🎨 Design System

- **Primary Color**: Deep Indigo (#3F51B5) - Professional and stable
- **Background**: Light Grayish-Blue (#ECEFF1) - Clean and modern
- **Accent Color**: Teal (#009688) - For highlights and CTAs
- **Typography**:
  - Body: PT Sans (humanist sans-serif)
  - Headlines: Space Grotesk (modern geometric)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage with all sections
│   ├── layout.tsx         # Root layout with fonts and metadata
│   ├── globals.css        # Global styles and design tokens
│   ├── devis/             # Quote calculator page
│   └── declaration-accessibilite/ # Accessibility statement
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── ContactForm.tsx   # Contact form component
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   └── ProjectCard.tsx   # Project showcase cards
├── lib/                  # Utility functions and data
│   ├── utils.ts         # Utility functions
│   └── projects.ts      # Project data and types
├── hooks/               # Custom React hooks
└── ai/                  # AI integration with Genkit
```

## 🚦 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:9002`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit AI with file watching

## 🎯 Key Sections

1. **Hero Section**: Introduction and main call-to-action
2. **Services**: Web development services offered
3. **Process**: Step-by-step work methodology
4. **Projects**: Portfolio showcase with detailed project cards
5. **Pricing**: Transparent pricing plans with quote calculator
6. **About**: Personal background and expertise
7. **Contact**: Multiple contact methods including form

## ♿ Accessibility Features

- RGAA compliance for French accessibility standards
- Semantic HTML structure
- Proper ARIA labels and roles
- Keyboard navigation support
- Skip links for screen readers
- High contrast color scheme
- Focus management

## 🔧 Configuration

The project uses several configuration files:
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

The project is configured for Firebase App Hosting with the `apphosting.yaml` configuration file.
