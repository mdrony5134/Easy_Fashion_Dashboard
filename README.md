# Easy Fashion Dashboard

## Overview
Easy Fashion Dashboard is an administrative interface built with Next.js to manage the e-commerce operations of the Easy Fashion platform. It provides a robust suite of tools for managing products, users, and orders, utilizing a secure Role-Based Access Control (RBAC) system.

## Live Link: https://easy-fashion-dashboard.vercel.app/login

## Technologies Used
- Next.js
- React
- TypeScript
- Tailwind CSS
- Redux Toolkit & RTK Query
- JWT Decode

## Features

### Role-Based Access Control
- SUPER_ADMIN: Full access to all dashboard routes and features.
- ADMIN: Access to Product Management, User Management (View Only), and Orders.
- MANAGER: Access to Dashboard view, Product view, and Order Management.

### Product Management
- Create, read, update, and delete products (based on role).
- Manage product attributes like categories, sizes, and styles.

### User Management
- View all registered users.
- Create new users and toggle active statuses (restricted to SUPER_ADMIN).

### Order Management
- View incoming orders and update fulfillment statuses.

## Getting Started

### Prerequisites
- Node.js (version 18 or above)
- npm or yarn

### Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
   npm install

4. Create a .env file based on your environment requirements.
5. Run the development server:
   npm run dev

6. Open http://localhost:3000 in your browser (default port as per package.json).

## Project Structure
- src/app: Next.js routing and page components.
- src/components: Reusable UI components and feature-specific blocks (Dashboard, Tables, Auth).
- src/redux: State management using Redux Toolkit and API integration using RTK Query.
- src/types: TypeScript interface definitions.
- src/proxy.ts: Next.js proxy middleware for role-based route protection.
