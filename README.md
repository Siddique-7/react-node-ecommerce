# 🛒 MERN Ecommerce App
Full-featured ecommerce platform built with MERN stack, supporting user authentication, product management, orders, and image uploads — fully functional backend and frontend deployed.

# 🚀 Live Demo

Check out the live demo of our project here:

👉 [https://react-node-ecommerce-nine.vercel.app/](https://react-node-ecommerce-nine.vercel.app/)

# 📷 Screenshots

![Homepage](https://res.cloudinary.com/dauvdrmb7/image/upload/v1754827337/Screenshot_2025-08-10_172623_djw6ik.png)

![Product Page](https://res.cloudinary.com/dauvdrmb7/image/upload/v1754827327/Screenshot_2025-08-10_172736_ckqdpf.png)


## 🔧 Features
- Secure user registration & login (JWT)
- Role-based protected routes (User/Admin)
- Product CRUD with Cloudinary image uploads
- Order creation & management
- Responsive SPA with client-side routing and SPA fallback (Vercel rewrites)
- Modular MVC backend architecture
  

## 🛠️ Tech Stack
- **Frontend:** React.js, TailwindCSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Image Upload:** Cloudinary + Multer (memory storage)
- **Auth:** JWT-based authentication & role-based access
- **Dev Tools:** Nodemon, Postman


## 📁 Folder Structure

```
ecommerce-app/
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/               # cloudinary.js config
│   │   ├── controllers/          # auth, order, product controllers
│   │   ├── db/                   # MongoDB connection
│   │   ├── middlewares/          # auth & upload middlewares
│   │   ├── models/               # Mongoose schemas
│   │   ├── routes/               # API routes
│   │   ├── app.js                # Express app
│   │   └── index.js              # Server entry point
│   ├── .env                     # Env variables (gitignored)
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/           # UI components (Navbar, Footer, etc.)
│   │   ├── context/              # React contexts (Auth, Cart)
│   │   ├── pages/                # Route pages (Login, Home, ProductDetails, etc.)
│   │   ├── routes/               # Route guards (AdminRoute, PrivateRoute)
│   │   ├── services/             # API call abstractions
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── index.html
│   ├── .env                     # Frontend env vars (gitignored)
│   ├── vercel.json              # SPA rewrite for Vercel deployment
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
└── README.md

```

## ⚙️ Setup & Run Locally

### 1. Clone the Repository
```
 git clone https://github.com/your-username/ecommerce-app.git
 ```
 
### 2. Backend
```
 cd backend
 npm install
 npm run dev
```
- **Create .env with PORT, MONGO_URI, JWT_SECRET, CLOUDINARY creds**

  
### 3. Frontend
```
 cd frontend
 npm install
 npm run dev
  ```
- **Create .env with any frontend configs if needed**
  
## 📡 API Endpoints (via backend server)

- POST /api/auth/register — Register new user
- POST /api/auth/login — Authenticate user
- GET /api/auth/profile — Get user profile
- GET /api/products — List all products
- GET /api/products/:id — Get product details using product ID
- POST /api/products — Create product (Admin + image upload)
- POST /api/orders — Place new order
- GET /api/orders — Get orders
- **Protected routes require Bearer JWT token**


## 🤝 Contributing
- Contributions are welcome! Feel free to fork and submit PRs.

## 🪪 License
- This project is licensed under the MIT License.

## 👤 Author
- Muhammad Siddique Shaikh

