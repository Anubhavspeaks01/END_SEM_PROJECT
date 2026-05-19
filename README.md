# AI-Based Smart Complaint Management System

This is the complete source code for the AI-Based Smart Complaint Management System, developed for the ESE Examination AIML (AI308B).

## Technology Stack
- **Frontend**: React.js, Vite, Axios, Pure Premium CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Security**: JWT & bcrypt

## Features
- **Authentication**: Secure Signup and Login with hashed passwords.
- **Complaint Registration**: Submit complaints with dynamic categories, geolocation, and descriptions.
- **AI Analysis**: Automatically classifies complaints by urgency (Low/Medium/High), suggests the relevant administrative department, provides an executive summary, and generates a polite auto-response.
- **Dashboard**: Track, filter by location/category, and update status (Pending, In Progress, Resolved).
- **Admin Actions**: Full CRUD including Complaint Deletion.

## Local Setup

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas URI
- Google Gemini API Key

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_key
```
Start the server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Deployment on Render
1. Create a Web Service for the **Backend** on Render. Add the `.env` variables to the Render dashboard.
2. Create a Static Site for the **Frontend** on Render. Build command: `npm run build`, Publish directory: `dist`. Ensure the API base URL in `frontend/src/services/api.js` points to your deployed backend URL.

## Folder Structure
Strict adherence to production modularity.
```text
├── backend
│   ├── config/ (Database connect)
│   ├── controllers/ (Auth, Complaint, AI logic)
│   ├── middleware/ (JWT Auth, Error handling)
│   ├── models/ (Mongoose schemas)
│   ├── routes/ (Express routers)
│   └── utils/ (Validation logic)
└── frontend
    └── src
        ├── components/
        ├── pages/
        ├── services/
        └── styles/
```
