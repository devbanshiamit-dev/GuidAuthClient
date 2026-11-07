# GuidAuthClient

A frontend authentication application built with **React, TypeScript, and Tailwind CSS**, integrated with an ASP.NET Core Web API using GUID-based access and refresh tokens.

The project demonstrates how to implement a complete authentication flow on the client side, including token management, automatic token refresh, session restoration, and protected routes.

## Features

- User Registration
- User Login
- Access Token Management
- Refresh Token Rotation
- Automatic Access Token Refresh
- Session Restoration after Browser Refresh
- Protected Routes
- Current User Information
- User Logout
- Centralized API Request Handling
- Authentication State Management using React Context API

## Tech Stack

**Frontend**
- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Fetch API

**Backend**
- ASP.NET Core Web API
- GUID-based Access Tokens
- GUID-based Refresh Tokens

## Project Structure

```text
src/
├── components/
│   └── ProtectedRoute.tsx
├── config/
│   ├── api.ts
│   └── endpoint.ts
├── context/
│   └── AuthContext.tsx
├── hooks/
│   └── useAuth.ts
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── services/
│   ├── apiClient.ts
│   └── authService.ts
├── types/
│   ├── auth.ts
│   └── AuthContextType.ts
├── utils/
│   └── tokenStorage.ts
├── App.tsx
└── main.tsx
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/GuidAuthClient.git
```

### 2. Install Dependencies

```bash
cd GuidAuthClient
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://localhost:5000
```

Replace the URL with your ASP.NET Core API's actual base URL.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Authentication Flow

1. A user registers or logs in using their credentials.
2. The backend returns an access token and a refresh token.
3. The frontend stores the tokens in session storage.
4. The access token is attached to protected API requests.
5. When the access token expires, the frontend uses the refresh token to request a new token pair.
6. The old refresh token is replaced with the newly issued refresh token.
7. The application restores the user's session when the browser is refreshed.
8. Logging out clears locally stored tokens and requests backend token revocation.

## Backend API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| POST | `/api/auth/refresh` | Refresh tokens |
| POST | `/api/auth/logout` | Revoke refresh token |
| GET | `/api/auth/me` | Get current user |

## Learning Objectives

This project was built to understand:

- React Context API for global authentication state.
- Custom hooks for reusable authentication logic.
- TypeScript interfaces for API requests and responses.
- Centralized API service architecture.
- Access and refresh token lifecycle.
- Asynchronous API integration.
- Protected routing with React Router.
- Session persistence and restoration.

## Important Notes

- This frontend requires the corresponding ASP.NET Core authentication API to be running.
- The backend practice API uses in-memory storage, so users and tokens may be lost when the backend restarts.
- Tokens are stored in session storage for this learning project. This is not a production-grade token storage strategy.
- Configure HTTPS and CORS appropriately when connecting the frontend and backend.

## Author

Built as a hands-on project to practice React, TypeScript, and real-world frontend-backend authentication integration.