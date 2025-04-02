# Backend Mini Project - 1

## 🛠 Project Overview
This project is a **User Authentication System** built using **Node.js, Express, MongoDB, and EJS**. It allows users to register, log in, and access a profile page with authentication managed via JSON Web Tokens (JWT).

## 🚀 Features
- **User Registration** (Username, Email, Password, Age, Name)
- **User Login** (Email & Password Authentication)
- **JWT-Based Authentication** for Secure Login
- **User Session Management** with Cookies
- **Protected Profile Page** (Only accessible to logged-in users)
- **Password Hashing** using `bcrypt`
- **Logout Functionality**

## 🖼 Screenshots
### 🔹 Register Page
![Register](https://github.com/user-attachments/assets/5171e5fe-f5a6-4338-a55d-6fb1a8537215)

### 🔹 Login Page
![Login](https://github.com/user-attachments/assets/e4ac33ba-1788-437b-9779-7416f2b39d0d)

## 🏗 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Templating Engine:** EJS
- **Authentication:** JWT (JSON Web Token)
- **Security:** bcrypt for password hashing
- **Middleware:** cookie-parser, express.json, express.urlencoded

## 🔧 Installation & Setup
1. **Clone the Repository**
```bash
git clone https://github.com/your-username/Backend_Mini_Project-1.git
cd Backend_Mini_Project-1
```
2. **Install Dependencies**
```bash
npm install
```
3. **Setup Environment Variables**
Create a `.env` file and add:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
4. **Run the Server**
```bash
node app.js
```
The server will start at `http://localhost:3000/`

## 🔑 API Routes
### **Public Routes:**
- `GET /` → Render Homepage
- `GET /register` → Show Registration Form
- `POST /register` → Register a New User
- `GET /login` → Show Login Form
- `POST /login` → Authenticate User

### **Protected Routes:**
- `GET /profile` → Show Profile Page (Requires Authentication)
- `GET /logout` → Logout User & Clear Cookies

## 🏆 Contributing
Feel free to contribute by forking the repo and submitting a pull request!

## 📜 License
This project is **open-source** and available under the **MIT License**.

---
**🌟 Star the repository if you like this project!** 🚀

