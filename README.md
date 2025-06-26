# 🍕 Pizza Store App

A full-stack application for managing a pizza store, organized into two folders:

- **`backend/`** — A Node.js + TypeScript API for handling authentication, orders, and kitchen workflows.
- **`mobile/`** — A React Native app with role-based interfaces for waiters and cooks.

---

## 📁 Project Structure


---

## 🔙 Backend (`/backend`)

### 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT-based authentication

### 📦 Features

- User authentication (JWT)
- Role-based access: `waiter`, `cook`
- APIs for:
    - Login
    - Creating/updating orders
    - Listing/filtering orders by status
- Modular architecture

### 🚀 Getting Started

```bash
  cd backend
  npm install
```
🔧 Create .env file
```aiignore
  DATABASE_URL=postgresql://user:password@localhost:5432/pizzastore
  PORT=5000
  JWT_SECRET=your_jwt_secret
```

▶️ Run the server
```bash
  npx prisma generate
  npx prisma migrate dev --name init
  npm run dev
```


## 📱 Mobile App (`/mobile`)

### 🛠 Tech Stack

- **React Native CLI**
- **TypeScript**
- **React Navigation** (drawer + bottom tabs)
- **Zustand** or **Redux** for state management
- **Firebase** (optional, for push notifications)

### 📦 Features

- Role-based user interface:
    - Dynamic routing based on logged-in user role
- Clean, dark mode UI
- Bottom tab navigation + animated drawer
- Order lifecycle management with real-time updates

### 👥 Role-Based Views

The app provides different features depending on the authenticated user's role:

#### 👨‍🍳 Cook

- Access to three tabs:
    - **Waiting Orders**
    - **OnGoing Orders**
    - **Completed Orders**
- View real-time order status
- Mark orders as ready or completed

#### 🧑‍💼 Waiter

- View all current table orders
- Create new pizza orders
- Edit existing orders:
    - Change quantity
    - Add/remove items
- See assigned tables and manage them

### 🔐 Login Flow

- On launch, users see a login screen
- After successful login:
    - App redirects to a role-specific dashboard
- Role and authentication token are stored securely


