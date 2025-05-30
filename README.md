# RevoShop E-Commerce Project

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Mhcdhc_H)

## Overview

RevoShop is an e-commerce website built with Next.js that allows users to browse products, view product details, and add items to their shopping cart. This project demonstrates the use of modern React and Next.js concepts including Static Site Generation (SSG), Server-Side Rendering (SSR), and client-side data fetching.

## Features Implemented

### Checkpoint 1
- Home page with product listing (Static Site Generation)
- Product detail page with dynamic routing (Server-Side Rendering)
- Navigation between pages using Next.js Link component
- Responsive design with Tailwind CSS
- Data fetching from FakeStoreAPI

## Technologies Used

- **Next.js**: For server-side rendering, static site generation, and routing
- **React**: For building the user interface
- **TypeScript**: For type-safe code
- **Tailwind CSS**: For styling
- **Axios**: For data fetching
- **FakeStoreAPI**: For product data

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/revoshop.git
cd revoshop
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
revoshop/
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── page.tsx       # Home page
│   │   └── product/[id]/  # Product detail page
│   ├── components/        # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── lib/              # Utility functions and API calls
│   │   └── api.ts
│   └── styles/           # Global styles
│       └── globals.css
├── public/              # Static assets
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Screenshots

(Will add screenshots once deployed)

## Future Enhancements (Checkpoint 2)

- User authentication with NextAuth.js
- Shopping cart functionality with Context API
- Admin dashboard with CRUD operations
- Unit testing with Jest and React Testing Library
- Performance optimizations
