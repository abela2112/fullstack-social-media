# Social Media App
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://socal-media-754802.netlify.app/)


## 📌 Overview

A modern social media application built with the MERN stack that allows users to create posts, interact with others, and manage their connections.

## 🚀 Features

- **User Authentication** (Sign Up, Login, JWT-based authentication)
- **Posts** (Create, Edit, Delete posts with images)
- **Likes & Comments** (Engage with posts through likes and comments)
- **Friends System** (Add and remove friends)
- **Real-time Chat** 
- **Profile Customization** (User bio, profile picture, links)
- **Dark Theme Support** (Toggle between light and dark modes)
- **Real-time Notifications** (Get alerts for likes, comments, and friend requests)

## 🛠️ Tech Stack

### **Frontend:**

- React.js
- Redux Toolkit
- Material UI

### **Backend:**

- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary 
## 📥 Installation

### **1. Clone the Repository**

```sh
git clone https://github.com/your-username/social-media-app.git
cd social-media-app
```

### **2. Install Dependencies**

```sh
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the `server` directory and add the following:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name (if used)
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### **4. Start the Application**

```sh
# Run backend
cd server
npm start

# Run frontend
cd ../client
npm start
```

## 🔥 API Endpoints (Example)

- **`POST /auth/register`** - Register a new user
- **`POST /auth/login`** - Login user
- **`GET /posts`** - Fetch all posts
- **`PATCH /users/:id/friends/:friendId`** - Add/remove friend

## 🌍 Deployment

- **Frontend:**  Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/28edda10-a70c-4b9f-b5c0-dbc92e0a4408)
![image](https://github.com/user-attachments/assets/3b970e92-7820-488d-8e5f-5344272f4765)

![image](https://github.com/user-attachments/assets/94952062-7efb-4844-8e69-2fea3f588b2f)
![image](https://github.com/user-attachments/assets/617d5a01-2a63-4ff3-a845-6a6659c1ea21)
[c6c8dc36-59b1-4913-8477-048c42cfbf70.webm](https://github.com/user-attachments/assets/ab97a9e8-0060-4408-aa68-1f6014ea8887)



## 🤝 Contributing

Pull requests are welcome! If you have suggestions for improvements, feel free to open an issue.

## 📜 License

This project is licensed under the **MIT License**.

