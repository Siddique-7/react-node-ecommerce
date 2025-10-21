# 🛒 MERN Ecommerce Platform

<div align="center">

![MERN Stack](https://img.shields.io/badge/MERN-Stack-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**A production-ready full-stack ecommerce platform with advanced features**

[🚀 Live Demo](https://react-node-ecommerce-nine.vercel.app/) • [Features](#-features) • [Installation](#-installation) • [API Docs](#-api-endpoints)

</div>

---

## 📋 Overview

A complete ecommerce solution built from scratch with the MERN stack, featuring secure authentication, role-based access control, seamless image uploads via Cloudinary, order management, and a modern responsive UI. Deployed and production-ready with both frontend and backend fully integrated.

## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based user authentication
- Password hashing with bcrypt
- Role-based access control (User/Admin)
- Protected routes with auth middleware
- Persistent login with Context API
- Profile management

### 🛍️ Product Management
- Complete CRUD operations for products
- Image upload integration with Cloudinary
- Multer memory storage for efficient uploads
- Product categories and descriptions
- Real-time product search and filtering
- Product detail pages with full information

### 📦 Order Management
- Seamless order creation and tracking
- Order history for users
- Admin order management dashboard
- Order status updates
- Customer order details view

### 🎨 Modern UI/UX
- Fully responsive design with Tailwind CSS
- Loading states and spinners
- Clean and intuitive interface
- Mobile-first approach
- Smooth navigation with React Router
- SEO optimized with meta tags

### 🚀 Performance & Deployment
- Vite for ultra-fast development
- SPA routing with Vercel rewrites
- Backend keep-alive mechanism to prevent server sleep
- Environment-based configuration
- Production-ready deployment on Vercel and Render

### 🏗️ Architecture
- Modular MVC backend structure
- Centralized API service layer
- Context-based state management
- Reusable React components
- Clean separation of concerns

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Context API** - State management for auth and cart
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcrypt** - Password hashing

### Cloud Services
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload middleware (memory storage)
- **Vercel** - Frontend deployment
- **Render** - Backend deployment

### Dev Tools
- **Nodemon** - Development auto-restart
- **Postman** - API testing
- **ESLint** - Code quality

---

## 📁 Project Structure

```
ecommerce-app/
├── backend/
│   ├── src/
│   │   ├── config/                 # Cloudinary configuration
│   │   ├── controllers/            # Business logic
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── db/                     # MongoDB connection
│   │   ├── middlewares/            # Auth & upload middlewares
│   │   │   ├── authMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/                 # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/                 # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── app.js                  # Express app setup
│   │   └── index.js                # Server entry point
│   ├── .env                       # Environment variables
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   ├── context/                # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/                  # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── Admin/
│   │   ├── routes/                 # Route guards
│   │   │   ├── AdminRoute.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── services/               # API abstractions
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vercel.json                # SPA routing config
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Siddique-7/react-node-ecommerce.git
cd ecommerce-app
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with the following variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Start backend development server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env file (if needed):
VITE_API_URL=http://localhost:5000

# Start frontend development server
npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
```http
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # Login user
GET    /api/auth/profile       # Get user profile (Protected)
```

### Products
```http
GET    /api/products           # Get all products
GET    /api/products/:id       # Get single product by ID
POST   /api/products           # Create product (Admin + Image Upload)
PUT    /api/products/:id       # Update product (Admin)
DELETE /api/products/:id       # Delete product (Admin)
```

### Orders
```http
POST   /api/orders             # Create new order (Protected)
GET    /api/orders             # Get user orders (Protected)
GET    /api/orders/:id         # Get order details (Protected)
PUT    /api/orders/:id         # Update order status (Admin)
```

**Note:** Protected routes require Bearer JWT token in Authorization header.

---

## 🎯 Key Features Implementation

### Cloudinary Image Upload
- Multer with **memory storage** for efficient file handling
- Direct upload to Cloudinary using `upload_stream`
- Automatic image optimization and transformation
- Secure URL generation for product images

```javascript
// Cloudinary integration with memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });
```

### JWT Authentication Flow
1. User registers/logs in
2. Server generates JWT token
3. Token stored in Context API
4. Protected routes verify token via middleware
5. Role-based access for Admin features

### SPA Routing on Vercel
```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
Ensures client-side routing works on page refresh.

### Backend Keep-Alive
Periodic ping mechanism to prevent serverless backend from sleeping, ensuring consistent performance.

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```
- Includes `vercel.json` for SPA routing
- Environment variables set in Vercel dashboard
- Auto-deploys on push to main branch

### Backend (Render/Railway/Heroku)
1. Create new web service
2. Connect GitHub repository
3. Set environment variables
4. Deploy from `backend` directory
5. Update frontend API URL

---

## 📸 Screenshots

*Add your application screenshots here showing:*
- ![Home](https://res.cloudinary.com/dauvdrmb7/image/upload/v1754827337/Screenshot_2025-08-10_172623_djw6ik.png)
- ![Product](https://res.cloudinary.com/dauvdrmb7/image/upload/v1754827327/Screenshot_2025-08-10_172736_ckqdpf.png)
- ![Full Product Details](https://res.cloudinary.com/dauvdrmb7/image/upload/v1761065276/Screenshot_2025-10-21_220514_jydmp7.png)
- ![Register](https://res.cloudinary.com/dauvdrmb7/image/upload/v1761065263/Screenshot_2025-10-21_220411_gpkv0m.png)
- ![Admin panel](https://res.cloudinary.com/dauvdrmb7/image/upload/v1761065284/Screenshot_2025-10-21_220611_t6yvdj.png)
  
---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Muhammad Siddique Shaikh**

- GitHub: [@Siddique-7](https://github.com/Siddique-7)
- LinkedIn: [@mdsiddique07](https://www.linkedin.com/in/mdsiddique07/)
- Portfolio: [siddique-tau.vercel.app](https://siddique-tau.vercel.app/)

---

## 🙏 Acknowledgments

- MERN Stack Community
- Cloudinary Documentation
- Tailwind CSS Team
- React.js Community
- All contributors and supporters

---

## 📞 Support

For support, email muhammadsiddik687@gmail.com or create an issue in the repository.

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

**Built with ❤️ by Muhammad Siddique Shaikh**

</div>
