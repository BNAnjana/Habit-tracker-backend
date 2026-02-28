
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

### Reports Routes

GET /api/reports

---

### Analytics Routes

GET /api/analytics  

---

### Challenges Routes

GET /api/challenges 

---

## 🗄 Database Schema

### USERS
- id (UUID)
- name
- email
- password
- created_at

### HABITS
- id (UUID)
- user_id
- title
- difficulty
- target_value
- created_at

### HABIT_LOGS
- id (UUID)
- habit_id
- completed_date
- value
- created_at

### STREAKS
- id (UUID)
- habit_id
- current_streak
- longest_streak
- updated_at

### ACHIEVEMENTS
- id (UUID)
- user_id
- title
- description
- unlocked_at
- created_at

### GOALS
- id (UUID)
- habit_id
- goal_target
- goal_type
- progress
- created_at

### CHALLENGES
- id (UUID)
- title 
- description
- duration_days
- start_date
- created_at

### CHALLENGE_PARTICIPANTS
- id (UUID)
- challenge_id
- user_id
- progress
- joined_at

### CATEGORIES
- id (UUID)
- user_id
- name
- created_at

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

