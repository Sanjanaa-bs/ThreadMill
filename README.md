# ThreadMill - Product Showcase Website

## Overview
This is a high-performance, interactive landing page and product showcase for **ThreadMill**. Built with the latest web technologies, it features immersive scroll animations, AI integration demos, and a modern aesthetic to effectively present the application's unique value proposition.

## Key Features
*   **Cutting-Edge Tech**: Built on **Next.js 16rc** and **React 19**.
*   **Interactive UI**:
    *   **Diagonal Hero Section**: Eye-catching entry point.
    *   **Dashboard Mockup**: Realistic preview of the application interface.
    *   **Thread Map**: Visual representation of the product journey.
    *   **Achievement Arcade**: Gamified features showcase.
*   **AI Integration**: Live demo section utilizing the Vercel AI SDK and Google models.
*   **Performance**: Optimized animations using **Framer Motion** and **GSAP**.
*   **Result-Oriented**: Includes Testimonials and Launch CTA sections.

## Tech Stack
*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS v4 (Alpha/Beta)
*   **Animations**: Framer Motion, GSAP
*   **AI**: Vercel AI SDK, Google Gemini
*   **Components**: Shadcn UI (Radix Primitives)

## Project Structure
```
ThreadMill/
├── app/                # App Router pages and layouts
│   ├── page.tsx        # Main landing page composition
│   └── layout.tsx      # Global layout
├── components/         # specialized UI components
│   ├── diagonal-hero.tsx
│   ├── ai-demo-section.tsx
│   ├── achievement-arcade.tsx
│   └── ...
├── lib/                # Utilities
└── public/             # Static assets
```

## Getting Started

### Prerequisites
*   Node.js 20+
*   pnpm (recommended)

### Installation
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd ThreadMill
    ```

2.  **Install dependencies**:
    ```bash
    pnpm install
    ```

3.  **Run Development Server**:
    ```bash
    pnpm dev
    ```
    The site will be available at `http://localhost:3000`.

## Customization
*   **Content**: Edit individual components in `components/` to update text and images.
*   **Theme**: The project supports light/dark mode toggling and uses CSS variables for easy theming in `globals.css` (or equivalent).

## Deployment
This project is optimized for deployment on **Vercel**.
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Add necessary Environment Variables (e.g., specific AI keys if checking out the AI demo capability).
4.  Deploy.
