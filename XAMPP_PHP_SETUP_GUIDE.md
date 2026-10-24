# 🐘 Running The Human Mind Museum on PHP & MySQL (XAMPP Guide)

This project now supports a **PHP + MySQL** backend architecture alongside the Node.js backend.

---

## 📋 System Architecture

- **Backend Language**: **PHP 7.4+ / PHP 8.x**
- **Database Engine**: **MySQL / MariaDB** (via PDO with prepared statements)
- **Database Name**: `mind_museum_db`
- **Frontend**: Universal Single Page Application (HTML5, Tailwind CSS, Lucide Icons, Canvas)
- **Local Server Stack**: **XAMPP** (Apache + MySQL)

---

## 🚀 Quick Setup Instructions (3 Steps)

### Step 1: Copy Project to XAMPP `htdocs`
1. Copy the entire `human-mind-museum` folder into your XAMPP web root directory:
   ```
   C:\xampp\htdocs\human-mind-museum
   ```

### Step 2: Start Apache & MySQL in XAMPP
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.

### Step 3: Import the MySQL Database Schema
1. Open your browser and navigate to **phpMyAdmin**:
   ```
   http://localhost/phpmyadmin
   ```
2. Click the **Import** tab at the top.
3. Choose the schema file from your project:
   ```
   C:\xampp\htdocs\human-mind-museum\backend_php\schema.sql
   ```
4. Click **Go** (or **Import**) at the bottom.
   > This automatically creates the `mind_museum_db` database and all 6 tables with initial curator accounts and badges.

---

## 🌐 Launch the Museum
Once the database is imported, open your browser and visit:
```
http://localhost/human-mind-museum/
```

---

## 🗄️ Database Tables Overview

| Table Name | Description | Stored Information |
|---|---|---|
| `users` | Visitor Accounts | User ID, username, email, bcrypt password hash, visitor badge ID (`HMM-VIS-XXXX`), visitor rank/level. |
| `user_visited_rooms` | Room Exploration Tracker | User ID, room ID (`memory`, `emotion`, etc.), timestamp. |
| `user_quiz_results` | Mastery Quizzes | User ID, room ID, score out of 4, date completed. |
| `user_badges` | Unlocked Honors | User ID, badge name (e.g. *Memory Architect*, *Grand Scholar*), date unlocked. |
| `game_scores` | Arcade Records | User ID, username, game ID, cognitive score, timestamp. |
| `journal_entries` | Subconscious Vault | User ID, room category, reflection title, content, timestamp. |

---

## 🛡️ Default Administrator / Curator Login
To sign into the museum with Chief Curator privileges:
- **Email**: `curator@mindmuseum.org`
- **Password**: `mindcurator2026`
- **Role**: `Chief Neuro-Curator` (`HMM-CUR-001`)

---

## 🔍 How to Check Registered Visitors & Database Activity

### Option 1: Via phpMyAdmin (Visual Database GUI)
1. Go to `http://localhost/phpmyadmin`.
2. Click on `mind_museum_db` in the left sidebar.
3. Click on the `users` table to see every visitor who registered.
4. Click on `user_visited_rooms` and `user_quiz_results` to see room activity.

### Option 2: Via the Live API Endpoint
Open this URL in your browser to view a live JSON report of all visitors and activity:
```
http://localhost/human-mind-museum/api/auth/visitors
```
