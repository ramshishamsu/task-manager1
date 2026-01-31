# Task Manager App

A simple task management application where you can add, edit, delete, and organize your daily tasks.


**Frontend (What you see):**
- React - Modern user interface
- CSS - Clean styling and layout
- Vite - Fast development tool

**Backend (The brain):**
- Node.js - Server environment
- Express.js - Handles web requests
- MongoDB - Stores your tasks safely

## 🚀 How to Run This App

### Step 1: Backend Setup
```bash
# Go to backend folder
cd backend

# Install required packages
npm install

# Create environment file
# Make a file named ".env" and add:
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager

# Start the backend server
npm start
```
*Backend will run on http://localhost:5000*

### Step 2: Frontend Setup
```bash
# Go to frontend folder (in a new terminal)
cd frontend

# Install required packages
npm install

# Start the frontend app
npm run dev
```
*Frontend will run on http://localhost:5173*

### Step 3: Open the App
1. Make sure both backend and frontend are running
2. Open your browser and go to `http://localhost:5173`
3. Start adding and managing your tasks! 🎉

## 📱 How to Use the App

1. **Add Task**: Fill in the form and click "Add Task"
2. **Search**: Type in the search box to find specific tasks
3. **Filter**: Click the filter buttons to see tasks by status
4. **Edit**: Click "Edit" on any task to update it
5. **Delete**: Click "Delete" to remove a task

## 📁 Project Files

```
task-manager/
├── backend/          # Server code
│   ├── controllers/   # Task logic
│   ├── models/       # Database structure
│   ├── routes/       # API endpoints
│   └── server.js     # Main server file
├── frontend/         # User interface
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx      # Main app
│   │   └── App.css      # Styling
│   └── package.json
└── README.md         # This file
```



- **Frontend**: React components, state management, user interfaces
- **Backend**: REST APIs, database connections, server setup
- **Full-Stack**: How frontend and backend work together
- **Database**: MongoDB for storing data
- **Tools**: Modern development with Vite and npm


**Perfect for:**
- Daily task management
- Learning full-stack development
- Portfolio projects

---


