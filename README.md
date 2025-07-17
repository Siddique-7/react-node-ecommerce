# 🛒 Ecommerce App

A full-stack MERN-based Ecommerce application that allows users to register, authenticate, browse products, place orders, and upload product images. Backend is fully implemented; frontend development is in progress.

---

## ✅ Features

- User Registration & Login (JWT Auth)
- Protected Routes for Users
- Product CRUD (Create, Read, Update, Delete)
- Order Placement 
- Cloudinary-based Image Upload
- RESTful API with MVC structure
- MongoDB Database Integration

---

## 🛠️ Tech Stack

**Frontend** (Coming Soon):
- React.js
- TailwindCSS

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (for image upload)
- Multer
- JWT Authentication
- Dotenv

**Tools**:
- Postman (API Testing)
- Nodemon (Dev Server)

---

## 📁 Folder Structure

```
ecommerce-app/
│
├── frontend/ # React frontend (in progress)
├── backend/
│ ├── src/
│ │ ├── config/
│ │ ├── controllers/
│ │ │ ├── auth.controller.js
│ │ │ ├── order.controller.js
│ │ │ └── product.controller.js
│ │ ├── db/
│ │ │ └── connectDB.js
│ │ ├── middlewares/
│ │ │ ├── auth.middleware.js
│ │ │ └── upload.middleware.js
│ │ ├── models/
│ │ │ ├── order.model.js
│ │ │ ├── product.model.js
│ │ │ └── user.model.js
│ │ ├── routes/
│ │ │ ├── auth.routes.js
│ │ │ ├── order.routes.js
│ │ │ └── product.routes.js
│ │ ├── utils/
│ │ │ └── cloudinary.js
│ │ ├── app.js
│ │ └── index.js
│ ├── uploads/ # Uploaded images
│ ├── .env # Env variables (not committed)
│ ├── .gitignore
│ ├── package.json
│ └── package-lock.json

```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
- git clone https://github.com/your-username/ecommerce-app.git
- cd ecommerce-app/backend
  
### 2. Install Dependencies
- npm install
  
### 3. Create .env File
- Create a .env file in backend/ with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
### 4. Start Backend Server
- npm run dev
  
## 🔍 API Testing

### Use Postman to test:

- POST /api/auth/register – Register user

- POST /api/auth/login – Login user

- GET /api/products/ – Get all products

- POST /api/products/ – Add product (admin)

- POST /api/orders/ – Place order

- Authenticated routes require JWT token in headers.

## 📷 Screenshots / Demo
- (Frontend in progress. Add here once UI is ready.)

## 🚀 Deployment
-  (Coming Soon)

## 🤝 Contributing
- Contributions are welcome! Feel free to fork and submit PRs.

## 🪪 License
- This project is licensed under the MIT License.

## 👤 Author
- Muhammad Siddique Shaikh

