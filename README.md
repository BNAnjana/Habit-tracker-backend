
# 🧠 Habit Tracker Backend API

## 📌 Project Overview

This backend powers the Habit Tracker application.  
It provides RESTful APIs for authentication, habits, goals, streaks, achievements, reports, and analytics.

The backend uses Supabase PostgreSQL as the database and JWT for authentication.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL)
- JWT Authentication
- bcrypt
- CORS
- Helmet
- Rate Limiter

---

## 📚 API Documentation

### Auth Routes

POST /api/auth/register  
POST /api/auth/login  

---

### Habit Routes

GET /api/habits  
POST /api/habits  
PUT /api/habits/:id  
DELETE /api/habits/:id  
POST /api/habits/:id/log  

---

### Goals Routes

GET /api/goals  
POST /api/goals  

---

### Achievements Routes

GET /api/achievements  

---

### Analytics Routes

GET /api/analytics  

---

## 🗄 Database Schema

### USERS
- id (UUID)
- name
- email
- password

### HABITS
- id
- user_id
- title
- difficulty
- target_value

### HABIT_LOGS
- id
- habit_id
- completed_date
- value

### STREAKS
- habit_id
- current_streak
- longest_streak

### ACHIEVEMENTS
- user_id
- title
- description

(etc…)

---

## ⚙ Installation

```bash
git clone <backend-repo-link>
cd habit-tracker-backend
npm install
npm start
```

---

Backend Deployment Link: https://habit-tracker-backend-dig4.onrender.com

