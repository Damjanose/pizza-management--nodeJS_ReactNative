# Pizza Store Management System Backend

A Node.js backend API built with Express, TypeScript, and PostgreSQL for managing pizza orders in a restaurant.

## Features

- **Role-based Authentication**: Static login system with two roles (waiter/cooker)
- **Order Management**: Create, update, and track pizza orders through different statuses
- **Ingredient Management**: Manage pizza ingredients and order compositions
- **Status Workflow**: Orders flow through waiting → confirmed → ready states
- **Role-based Permissions**: Different access levels for waiters and cookers

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your PostgreSQL database and update the `.env` file:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/pizza_store?schema=public"
```

3. Generate Prisma client and push schema:
```bash
npm run db:generate
npm run db:push
```

4. Seed the database with sample data:
```bash
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/login` - Login with credentials

### Orders
- `POST /api/orders` - Create new order (waiter only)
- `PUT /api/orders/:id` - Update order (waiter only)
- `GET /api/orders` - Get all orders (both roles)
- `PATCH /api/orders/:id/confirm` - Confirm order (cooker only)
- `PATCH /api/orders/:id/ready` - Mark order ready (cooker only)

### Ingredients
- `GET /api/ingredients` - Get all ingredients (both roles)
- `POST /api/ingredients` - Add new ingredient (dev only)

## Authentication

### Login Credentials
- **Waiter**: `{ "name": "waiter", "pass": "waiter" }`
- **Cooker**: `{ "name": "cook", "pass": "cook" }`

### Using the API
After login, include the role in the `x-role` header for all requests:
```
x-role: waiter
```
or
```
x-role: cooker
```

## Order Status Flow

1. **WAITING** - Initial status when order is created
2. **CONFIRMED** - Cooker confirms the order
3. **READY** - Cooker marks order as ready for pickup

## Database Schema

- **Orders**: Table number, status, timestamps, and linked ingredients
- **Ingredients**: Available pizza ingredients
- **OrderIngredients**: Many-to-many relationship between orders and ingredients

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:reset` - Reset database and reseed
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── controllers/     # Route handlers
├── routes/         # API route definitions
├── middlewares/    # Authentication and error handling
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
├── seed/           # Database seeding scripts
└── index.ts        # Application entry point
```