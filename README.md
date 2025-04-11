# Backend Mini Project - 1

## 💠 Project Overview
This project is a **User Authentication System** built using **Node.js, Express, MongoDB, and EJS**. It allows users to register, log in, and access a profile page with authentication managed via JSON Web Tokens (JWT).  
🔗 Users can also **create**, **edit posts**, and **set profile pictures** through Multer from their profile.

## ✨ Features
- **User Registration** (Username, Email, Password, Age, Name)
- **User Login** (Email & Password Authentication)
- **JWT-Based Authentication** for Secure Login
- **User Session Management** with Cookies
- **Protected Profile Page** (Only accessible to logged-in users)
- **Password Hashing** using `bcrypt`
- **Logout Functionality**
- **Create & Edit Posts** ✍️
- **Upload Profile Picture** using `multer`

## 🖼 Screenshots
### 🔹 Register Page
![Register](https://github.com/user-attachments/assets/2ab41c01-6f51-43ad-9df6-fca60305e9bb)

### 🔹 Login Page
![Login](https://github.com/user-attachments/assets/86cda256-9683-46a4-a594-247991bde137)

### 🔹 Profile Page
![Profile](https://github.com/user-attachments/assets/d10ed891-2d2f-4da6-92f1-65c531db1147)

### 🔹 Upload Page
![Upload](https://github.com/user-attachments/assets/358d2e96-95a7-45c3-b995-1e17f37753ec)



## 🏗 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Templating Engine:** EJS
- **Authentication:** JWT (JSON Web Token)
- **Security:** bcrypt for password hashing
- **Middleware:** cookie-parser, express.json, express.urlencoded, multer

## ⚖ Installation & Setup
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
- `POST /post` → Create a New Post
- `POST /edit/:id` → Edit an Existing Post
- `POST /upload` → Upload Profile Picture (Requires Authentication)
- `GET /logout` → Logout User & Clear Cookies

## 🏆 Contributing
Feel free to contribute by forking the repo and submitting a pull request!

## 📜 License
This project is **open-source** and available under the **MIT License**.

---
**🌟 Star the repository if you like this project!** 🚀

