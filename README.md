# Task Management API

## 📌 Description

The Task Management API allows users to create, manage, and track tasks efficiently. Users can categorize tasks, set deadlines, and mark tasks as complete or incomplete. The API supports user authentication, role-based access control, and CRUD operations for tasks.

## 🚀 Features

- User registration and login
- CRUD operations for tasks
- Task categorization and deadlines
- User-specific task management

## 🛠 Technologies Used  

- **Express.js** – Backend framework  
- **MongoDB & Mongoose** – Database and ODM  
- **bcrypt** – Password hashing  
- **jsonwebtoken** – JWT authentication  
- **cookie-parser** – Handling cookies  
- **CORS** – Handling cross-origin requests  

## 📂 Project Structure

```
├── config
│   ├── db.connect.js
├── controllers
│   ├── admin.controller.js
│   ├── auth.controller.js
│   ├── task.controller.js
│   ├── user.controller.js
├── middleware
│   ├── auth.middleware.js
│   ├── error.middleware.js
├── models
│   ├── user.model.js
│   ├── task.model.js
├── routes
│   ├── admin.route.js
│   ├── auth.route.js
│   ├── task.route.js
│   ├── user.route.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
```

## 🔧 Installation

```sh
git clone <repository_url>
cd task-management-api
npm install
```

## 🌍 Environment Variables

Create a `.env` file in the root directory and add the following:

```sh
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret_key>
```

## ▶️ Running the Application

```sh
npm start
```

## 📌 API Endpoints

| Method           | Endpoint                      | Description           | Authorization |
| --------------- | ---------------------------- | --------------------- | ------------- |
|                 | **Auth Routes**               |                       |               |
| POST            | `/api/login`                  | User login            | No            |
| GET             | `/api/refresh`                | Refresh access token  | Yes (Cookie)  |
| **User Routes** |                               |                       |               |
| POST            | `/api/register`               | Create a new user     | No            |
| GET             | `/api/user`                   | Get all users         | Yes           |
| GET             | `/api/user/:id`               | Get user by ID        | Yes           |
| PUT             | `/api/user/:id`               | Update user profile   | Yes           |
| DELETE          | `/api/user/:id`               | Delete user account   | Yes           |
| **Admin Routes**|                               |                       |               |
| POST            | `/api/admin/register`         | Register an admin     | No            |
| DELETE          | `/api/admin/deleteuser/:id`   | Delete a user         | Yes (Admin)   |
| **Task Routes** |                               |                       |               |
| POST            | `/api/task`                   | Create a task         | Yes           |
| GET             | `/api/task`                   | Get all tasks         | Yes           |
| GET             | `/api/task/category/:category`| Get tasks by category | Yes           |
| GET             | `/api/task/:id`               | Get task by ID        | Yes           |
| PUT             | `/api/task/:id`               | Update a task         | Yes           |
| DELETE          | `/api/task/:id`               | Delete a task         | Yes           |

## 🤝 How to Contribute

1. Fork the repository.
2. Clone your forked repository:
   ```sh
   git clone <your_forked_repo_url>
   ```
3. Create a new branch for your feature or bug fix:
   ```sh
   git checkout -b feature-name
   ```
4. Make your changes and commit them:
   ```sh
   git commit -m "Added new feature"
   ```
5. Push the changes to your forked repository:
   ```sh
   git push origin feature-name
   ```
6. Create a Pull Request to the main repository.

## 🔍 Review

This project task is to be reviewed and assessed by **Axia Africa Tech**.

---

💡 **For any issues or inquiries, feel free to open an issue or reach out!**